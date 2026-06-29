-- Case studies shown on /case-studies and individual /case-studies/[slug] pages.
-- Run this in the Supabase SQL editor.

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  client text not null,
  title text not null,
  industry text,
  challenge text,
  solution text,
  outcome text,
  metric text,
  metric_label text,
  cover_url text,
  body text,
  featured boolean not null default false,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- The app talks to Supabase with the anon key (same as projects/blog),
-- so enable RLS with policies that allow it to work.
alter table public.case_studies enable row level security;

create policy "Allow read case studies"
  on public.case_studies for select
  using (true);

create policy "Allow insert case studies"
  on public.case_studies for insert
  with check (true);

create policy "Allow update case studies"
  on public.case_studies for update
  using (true);

create policy "Allow delete case studies"
  on public.case_studies for delete
  using (true);

-- Optional seed data (the two previously hard-coded case studies).
insert into public.case_studies (slug, client, title, industry, challenge, solution, outcome, metric, metric_label, order_index)
values
  (
    'apex-retail',
    'Apex Retail Group',
    'How We Scaled Apex''s Online Revenue by 340% in 6 Months',
    'E-Commerce',
    'Legacy platform couldn''t handle peak traffic. Conversions dropping. Team overwhelmed.',
    'Full platform rebuild with AI product recommendations and performance optimization.',
    'Revenue grew 340% within six months with a faster, more reliable storefront.',
    '340%',
    'Revenue Growth',
    0
  ),
  (
    'mediflow',
    'MediFlow Clinics',
    'Digitizing 12 Clinic Locations with a Unified Management System',
    'Healthcare',
    'Siloed data across 12 locations. Manual scheduling. No unified patient view.',
    'Custom clinic management system with real-time sync across all locations.',
    'Operational efficiency improved by 92% across all twelve locations.',
    '92%',
    'Process Efficiency',
    1
  )
on conflict (slug) do nothing;
