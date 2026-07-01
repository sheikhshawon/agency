-- Visitor comments on public blog posts.
-- Run this in the Supabase SQL editor.

create table if not exists public.blog_comments (
  id          uuid primary key default gen_random_uuid(),
  blog_id     uuid not null references public.blogs (id) on delete cascade,
  author_name text not null,
  email       text,
  body        text not null,
  is_approved boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Fetch a post's approved comments newest-first.
create index if not exists blog_comments_post_idx
  on public.blog_comments (blog_id, created_at desc);

-- The app talks to Supabase with the anon key (same as projects/blog),
-- so enable RLS with policies that allow it to work.
-- NOTE: comments are shown immediately (is_approved defaults to true). To
-- moderate, set is_approved = false on a row and it disappears from the site.
alter table public.blog_comments enable row level security;

-- Anyone can post a comment from the public blog page.
create policy "Allow public comment"
  on public.blog_comments for insert
  with check (true);

-- The public site only reads approved comments.
create policy "Allow read approved comments"
  on public.blog_comments for select
  using (is_approved = true);

-- Admin moderation (hide / delete) via the anon key, matching the existing setup.
create policy "Allow update comments"
  on public.blog_comments for update
  using (true);

create policy "Allow delete comments"
  on public.blog_comments for delete
  using (true);
