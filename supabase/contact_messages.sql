-- Contact form submissions from the public /contact page.
-- Run this in the Supabase SQL editor.

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  full_name  text not null,
  email      text not null,
  phone      text,
  company    text,
  service    text,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index to fetch unread messages / notification counts quickly.
create index if not exists contact_messages_unread_idx
  on public.contact_messages (is_read, created_at desc);

-- The app talks to Supabase with the anon key (same as projects/blog),
-- so enable RLS with policies that allow it to work.
-- NOTE: this allows admin reads/updates via the anon key, matching the
-- existing setup. For production, move admin reads/writes behind the
-- service-role key or authenticated policies.
alter table public.contact_messages enable row level security;

-- Anyone can submit the contact form from the public website.
create policy "Allow public submit"
  on public.contact_messages for insert
  with check (true);

-- Read / update (mark read) / delete used by the admin dashboard.
create policy "Allow read messages"
  on public.contact_messages for select
  using (true);

create policy "Allow update messages"
  on public.contact_messages for update
  using (true);

create policy "Allow delete messages"
  on public.contact_messages for delete
  using (true);
