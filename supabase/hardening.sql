-- ─────────────────────────────────────────────────────────────────────────
-- PRODUCTION SECURITY HARDENING
-- Run this LAST, in the Supabase SQL editor, AFTER:
--   1) all other table SQL files have been run, and
--   2) SUPABASE_SERVICE_ROLE_KEY is set in your app environment.
--
-- Why: the app ships the anon key to the browser. The original policies allowed
-- the anon key to SELECT/UPDATE/DELETE private data. This script removes that
-- access. Privileged operations now run server-side with the service-role key,
-- which BYPASSES RLS — so the admin dashboard keeps working while the public
-- anon key can no longer touch private tables.
--
-- Safe to re-run: every drop uses "if exists".
-- ─────────────────────────────────────────────────────────────────────────

-- ── admin_users: lock out the anon key entirely ────────────────────────────
-- (password_hash must never be readable via the public key.)
drop policy if exists "Allow read admin users"   on public.admin_users;
drop policy if exists "Allow insert admin users"  on public.admin_users;
drop policy if exists "Allow update admin users"  on public.admin_users;
drop policy if exists "Allow delete admin users"  on public.admin_users;
-- No policies remain → anon/authenticated get nothing; service-role bypasses RLS.

-- ── contact_messages: public may only INSERT (submit the form) ──────────────
drop policy if exists "Allow read messages"   on public.contact_messages;
drop policy if exists "Allow update messages" on public.contact_messages;
drop policy if exists "Allow delete messages" on public.contact_messages;
-- Keep "Allow public submit" (insert). Admin reads/updates/deletes use service-role.

-- ── subscribers: public may only INSERT (subscribe) ────────────────────────
-- Drop EVERY existing policy by name (handles UI-created duplicates), make sure
-- RLS is on, then recreate a single insert-only policy.
alter table public.subscribers enable row level security;
do $$
declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'public' and tablename = 'subscribers'
  loop
    execute format('drop policy if exists %I on public.subscribers', p.policyname);
  end loop;
end $$;
create policy "Allow public subscribe"
  on public.subscribers for insert
  with check (true);

-- ── blog_comments: public may INSERT + read approved; no anon edits/deletes ─
drop policy if exists "Allow update comments" on public.blog_comments;
drop policy if exists "Allow delete comments" on public.blog_comments;
-- Keeps "Allow public comment" (insert) and "Allow read approved comments" (select).

-- ── site_settings: public may only SELECT; writes via service-role ─────────
drop policy if exists "Allow insert site settings" on public.site_settings;
drop policy if exists "Allow update site settings" on public.site_settings;
-- Keeps "Allow read site settings" (footer/contact read these publicly).

-- ── Public content (projects / blogs / case_studies): read-only for anon ───
-- These are public by design, so SELECT stays open. Remove any anon write
-- policies so content can only be changed via the service-role key.
-- Adjust the policy names below if yours differ (check: Supabase → Auth → Policies).
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname, cmd
    from pg_policies
    where schemaname = 'public'
      and tablename in ('projects','blogs','case_studies')
      and cmd in ('INSERT','UPDATE','DELETE')
  loop
    execute format('drop policy if exists %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

-- Verify afterward:  select tablename, policyname, cmd from pg_policies
--                    where schemaname='public' order by tablename, cmd;
