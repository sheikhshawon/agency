-- Newsletter subscribers captured from the website footer.
-- Run this in the Supabase SQL editor.

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- The app talks to Supabase with the anon key (same as projects/blog),
-- so enable RLS with policies that allow it to work.
alter table public.subscribers enable row level security;

-- Anyone can subscribe (insert) from the public footer form.
create policy "Allow public subscribe"
  on public.subscribers for insert
  with check (true);

-- Read / delete used by the admin dashboard.
-- NOTE: this allows reads via the anon key, matching the existing
-- projects/blog setup. For production, move admin reads/deletes behind
-- the service-role key or authenticated policies.
create policy "Allow read subscribers"
  on public.subscribers for select
  using (true);

create policy "Allow delete subscribers"
  on public.subscribers for delete
  using (true);
