# MAXOPS / Maxy

React frontend + Node.js/Express + PostgreSQL backend.

## Stack
- Frontend: React 19 + Vite + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT
- File uploads: Multer + PostgreSQL BYTEA
- Local development: no Docker required

## Structure
- Backend/src: Express API
- Backend/db/schema.sql: PostgreSQL schema
- vite-project/src: React frontend and Student Portal
- .env.example: local environment template

The existing Student Portal under vite-project/src/pages/StudentPortal is preserved.

## Local setup
1. Create a PostgreSQL database named maxy.
2. Create the project-root .env using .env.example and set your PostgreSQL password.
3. Install dependencies:
   npm install
   npm install --prefix Backend
   npm install --prefix vite-project
4. Start both services from the repository root:
   npm run dev

Backend: http://localhost:8000
Frontend: http://localhost:5173

The backend automatically creates the required PostgreSQL tables from Backend/db/schema.sql when it starts.

## Health check
curl http://localhost:8000/health

Expected JSON: {"status":"ok","database":"postgres"}

## Site APIs
- POST /login
- POST /register
- POST /blog
- POST /contact
- GET /blogs
- GET /blogs/titles
- GET /contacts
- GET /blogs/search

Student Portal APIs are available under /api.