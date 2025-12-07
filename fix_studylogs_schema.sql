-- Add 'verified' column to study_logs for Anti-Cheat tracking
alter table study_logs 
add column verified boolean default false;
