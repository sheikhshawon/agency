-- Partner / client logos shown in the homepage "Trusted by" marquee.
-- Run this in the Supabase SQL editor. Logos are stored in the "media" bucket;
-- only the public image URL is kept here.

create table if not exists public.partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text not null,
  link_url    text,
  order_index int  not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists partners_order_idx
  on public.partners (order_index);

-- Public may READ partners (to render the marquee). Writes are done server-side
-- with the service-role key, so there is no anon write policy.
alter table public.partners enable row level security;

drop policy if exists "Allow read partners" on public.partners;
create policy "Allow read partners"
  on public.partners for select
  using (true);
