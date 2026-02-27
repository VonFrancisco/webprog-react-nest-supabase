-- Supabase schema for guestbook messages

create table if not exists guestbook (
  id serial primary key,
  name text not null,
  message text not null,
  inserted_at timestamp with time zone default timezone('utc', now())
);
