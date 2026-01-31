-- Enable RLS
alter table auth.users enable row level security;

-- 1. Create Public Profiles Table
create table if not exists public.public_profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Emergency Contacts Table
create table if not exists public.emergency_contacts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  contact_name text,
  phone_number text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, phone_number) -- Prevent duplicate contacts for same user (optional constraint)
);

-- 3. Enable RLS
alter table public.public_profiles enable row level security;
alter table public.emergency_contacts enable row level security;

-- 4. Policies for Public Profiles
create policy "Public profiles are viewable by everyone."
  on public.public_profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.public_profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on public.public_profiles for update
  using ( auth.uid() = id );

-- 5. Policies for Emergency Contacts
create policy "Users can view their own emergency contacts."
  on public.emergency_contacts for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own emergency contacts."
  on public.emergency_contacts for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own emergency contacts."
  on public.emergency_contacts for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own emergency contacts."
  on public.emergency_contacts for delete
  using ( auth.uid() = user_id );

-- 6. Function to handle new user (Optional: Auto-create profile from metadata if exists)
-- You can run this if you want auto-creation on Signup, 
-- BUT since we handle it in frontend for Google Auth manually, this is a backup.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.public_profiles (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
-- drop trigger if exists on_auth_user_created on auth.users;
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();
