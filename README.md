# webprog-react-nest-supabase

This repository contains a simple guestbook application built with React (Vite) on the frontend and NestJS on the backend. The app uses Supabase for data storage and authentication.

## Structure

- `my-profile/frontend` – React client created with Vite
- `my-profile/backend` – NestJS API that proxies to Supabase
- `my-profile/supabase_schema.sql` – DDL for the `guestbook` table

## Getting started

1. **Create the table in Supabase**
   ```sh
   psql "$(grep SUPABASE_URL ../.env | cut -d= -f2)" -c "$(cat supabase_schema.sql)"
   ```
   or run the SQL from the Supabase dashboard.

2. **Backend**
   ```sh
   cd my-profile/backend
   npm install
   npm run dev       # starts NestJS on http://localhost:3000
   ```

3. **Frontend**
   ```sh
   cd ../frontend
   npm install
   npm run dev       # starts the Vite dev server on http://localhost:5173
   ```

The front-end proxies `/guestbook` requests to the backend during development.

---

Feel free to deploy each piece separately (backend to Vercel, frontend to Vercel, etc.).
