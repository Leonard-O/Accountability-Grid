-- Cloud Anti-Cheat: Session Tracking

-- 1. Create Sessions Table
create table study_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  planned_duration int not null, -- in minutes
  start_time timestamp with time zone default now(),
  end_time timestamp with time zone,
  status text default 'active' check (status in ('active', 'completed', 'abandoned')),
  created_at timestamp with time zone default now()
);

-- RLS
alter table study_sessions enable row level security;
create policy "Users can view own sessions" on study_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on study_sessions for insert with check (auth.uid() = user_id);

-- 2. Function: Start Session
-- Called when user clicks "Start Focus"
create or replace function start_study_session(p_duration int)
returns uuid
language plpgsql
security definer
as $$
declare
  v_session_id uuid;
begin
  insert into study_sessions (user_id, planned_duration)
  values (auth.uid(), p_duration)
  returning id into v_session_id;

  return v_session_id;
end;
$$;

-- 3. Function: Complete Session (The Core Anti-Cheat Logic)
-- Called when timer hits 0. logic checks if ENOUGH REAL TIME has passed.
create or replace function complete_study_session(p_session_id uuid, p_day_index int)
returns boolean
language plpgsql
security definer
as $$
declare
  v_session record;
  v_elapsed_seconds int;
  v_min_seconds int;
begin
  -- Fetch session
  select * into v_session from study_sessions
  where id = p_session_id and user_id = auth.uid();

  if not found then
    raise exception 'Session not found.';
  end if;

  if v_session.status != 'active' then
     raise exception 'Session already finalized.';
  end if;

  -- Calculate elapsed time from Server Clock (prevent client clock manipulation)
  v_elapsed_seconds := extract(epoch from (now() - v_session.start_time));
  
  -- Allow a small buffer (e.g., if duration is 25 mins, verify at least 24.5 mins passed)
  -- For testing/dev ease, we might be lenient or strict.
  -- STRICT MODE: v_elapsed_seconds >= (v_session.planned_duration * 60) - 10;
  v_min_seconds := (v_session.planned_duration * 60) - 15; -- 15 seconds grace

  if v_elapsed_seconds < v_min_seconds then
    -- CHEAT DETECTED (or premature stop)
    update study_sessions 
    set status = 'abandoned', end_time = now() 
    where id = p_session_id;
    return false;
  else
    -- VALID SESSION
    update study_sessions 
    set status = 'completed', end_time = now() 
    where id = p_session_id;

    -- Update Study Logs (Day Cell)
    insert into study_logs (user_id, day_index, year, status)
    values (auth.uid(), p_day_index, extract(year from now()), 'studied')
    on conflict (id) do nothing; -- or handle duplicates logic if schema allows multiple/day

    -- Award XP (Logic moved from Client to Server for security)
    update profiles
    set exp_points = exp_points + v_session.planned_duration,
        coins = coins + floor(v_session.planned_duration / 5) -- 1 coin per 5 mins
    where id = auth.uid();

    return true;
  end if;
end;
$$;
