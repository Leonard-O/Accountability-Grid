-- Add Leveling Columns to Profiles
alter table profiles 
add column level int default 1,
add column exp_points int default 0;

-- Create Badges Table (User Achievements)
create table user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  badge_id text not null, -- e.g., 'streak_7', 'first_session'
  earned_at timestamp with time zone default now()
);

-- Enable RLS for Badges
alter table user_badges enable row level security;
create policy "Users can view own badges" on user_badges for select using (auth.uid() = user_id);
