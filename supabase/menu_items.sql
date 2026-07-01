-- Dynamic navigation menus (header + footer), editable from the admin Menu page.
-- Run this in the Supabase SQL editor.

create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  location    text not null check (location in ('header', 'footer')),
  label       text not null,
  href        text not null,
  order_index int  not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists menu_items_location_idx
  on public.menu_items (location, order_index);

-- Public may READ the menus (needed to render the navbar/footer). Writes are
-- done server-side with the service-role key, so no anon write policy exists.
alter table public.menu_items enable row level security;

drop policy if exists "Allow read menu" on public.menu_items;
create policy "Allow read menu"
  on public.menu_items for select
  using (true);

-- Seed the current menus once (re-run safe: only seeds when the table is empty).
do $$
begin
  if not exists (select 1 from public.menu_items) then
    insert into public.menu_items (location, label, href, order_index) values
      ('header', 'Home',          '/',              0),
      ('header', 'About',         '/about',         1),
      ('header', 'Services',      '/services',      2),
      ('header', 'Projects',      '/projects',      3),
      ('header', 'Contact',       '/contact',       4),
      ('footer', 'Home',          '/',              0),
      ('footer', 'About',         '/about',         1),
      ('footer', 'Case Studies',  '/case-studies',  2),
      ('footer', 'Projects',      '/projects',      3),
      ('footer', 'Blog',          '/blog',          4),
      ('footer', 'Contact',       '/contact',       5),
      ('footer', 'Privacy Policy','/privacy',       6);
  end if;
end $$;
