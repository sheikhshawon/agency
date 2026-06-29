-- Global site settings (single row) edited from the admin Settings page.
-- Run this in the Supabase SQL editor.

create table if not exists public.site_settings (
  id            int primary key default 1,
  site_name     text not null default 'Enif IT Services Ltd.',
  tagline       text not null default '',
  description   text not null default '',
  contact_email text not null default '',
  phone         text not null default '',
  address       text not null default '',
  twitter_url   text not null default '',
  facebook_url  text not null default '',
  instagram_url text not null default '',
  linkedin_url  text not null default '',
  updated_at    timestamptz not null default now(),
  -- Enforce a single settings row.
  constraint site_settings_singleton check (id = 1)
);

-- The app talks to Supabase with the anon key (same as projects/blog),
-- so enable RLS with policies that allow it to work.
-- NOTE: this allows updates via the anon key, matching the existing
-- projects/blog/case-studies setup. For production, move admin writes
-- behind the service-role key or authenticated policies.
alter table public.site_settings enable row level security;

create policy "Allow read site settings"
  on public.site_settings for select
  using (true);

create policy "Allow insert site settings"
  on public.site_settings for insert
  with check (true);

create policy "Allow update site settings"
  on public.site_settings for update
  using (true);

-- Seed the single row with the current site defaults.
insert into public.site_settings (id, site_name, tagline, description)
values (
  1,
  'Enif IT Services Ltd.',
  'Accelerating Business Growth with Intelligent Technology',
  'Enif IT Services Ltd. delivers premium web & app development, AI automation, business management solutions, and brand design for forward-thinking companies.'
)
on conflict (id) do nothing;
