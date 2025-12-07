-- 1. Create a function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username, subscription_tier, level, exp_points, coins)
  values (
    new.id, 
    new.raw_user_meta_data->>'username', 
    'free',
    1,
    0,
    0
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create the trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Backfill missing profiles for existing users
-- This fixes the issue for the current user suffering from the bug
insert into public.profiles (id, subscription_tier, level, exp_points, coins)
select id, 'free', 1, 0, 0
from auth.users
where id not in (select id from public.profiles);
