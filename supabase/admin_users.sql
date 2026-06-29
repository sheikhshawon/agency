-- Admin users who can manage the dashboard.
-- Run this in the Supabase SQL editor.

create table if not exists public.admin_users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null unique,
  password_hash text not null,
  role          text not null default 'admin',
  created_at    timestamptz not null default now()
);

-- The app talks to Supabase with the anon key (same as projects/blog).
-- IMPORTANT: password_hash is never selected by the app or sent to the client.
-- For production you should move this table behind the service-role key or
-- Supabase Auth so the anon key cannot read password hashes at all.
alter table public.admin_users enable row level security;

create policy "Allow read admin users"  
  on public.admin_users for select
  using (true);

create policy "Allow insert admin users"
  on public.admin_users for insert
  with check (true);

create policy "Allow update admin users"
  on public.admin_users for update
  using (true);

create policy "Allow delete admin users"
  on public.admin_users for delete
  using (true);
