<div align="center">

# Pial.Dev — Portfolio & Blog Frontend

**A Vue 3 single-page application for a personal portfolio and blog, with a full content-management admin panel.**

[![Live Demo](https://img.shields.io/badge/Live-portfolio--and--blog--app--fontend.vercel.app-000000?style=flat&logo=vercel&logoColor=white)](https://portfolio-and-blog-app-fontend.vercel.app/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-Beta-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Pinia](https://img.shields.io/badge/State-Pinia-FFD859?style=flat)](https://pinia.vuejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[🔗 Live Site](https://portfolio-and-blog-app-fontend.vercel.app/)**

</div>

---

## Overview

This is the frontend half of a two-repo project: a public-facing portfolio and blog for showcasing skills and projects, paired with a full admin dashboard for managing all of that content — without touching a database or an admin panel framework. It's a decoupled SPA that talks entirely to a separate Laravel REST API over JWT-authenticated HTTP calls.

Deployed on **Vercel**; the backend ([user-management-api](https://github.com/mahmudpial/user-management-api)) is deployed separately on **Render** with a **Supabase (PostgreSQL)** database.

## Screenshots

<!-- Add screenshots or a short demo GIF here, e.g.:
| Home | Blog | Admin Dashboard |
|---|---|---|
| ![home](docs/screenshots/home.png) | ![blog](docs/screenshots/blog.png) | ![admin](docs/screenshots/admin.png) |
-->
*Screenshots coming soon — or grab a few directly from the [live site](https://portfolio-and-blog-app-fontend.vercel.app/).*

## Key Features

### 🌐 Public Site
- **Home** — landing/introduction page
- **Skills** — skill list rendered from the API (with proficiency levels)
- **Portfolio** — project grid with individual project detail pages (by slug)
- **Blog** — post listing and individual post pages, with comments and a like toggle
- **Contact** — contact form that submits directly to the backend

### 🔐 Authentication
- Register, login, forgot-password, and reset-password flows
- JWT stored client-side; automatically attached to every API request
- Automatic redirect to login on token expiry (401 response)

### 🙋 User Area
- Profile view — update account details and change password

### 🛠️ Admin Dashboard (role-protected)
- **Skills Manager** — add/edit/delete skills
- **Projects Manager** — manage portfolio entries
- **Posts Manager** — create/edit/delete blog posts
- **Comments Manager** — approve or remove reader comments
- **Messages Manager** — view and manage contact-form submissions

### 🧭 Route Guarding
Three route metadata flags — `guestOnly`, `requiresAuth`, `requiresAdmin` — combined with a global navigation guard mean logged-in users are redirected away from auth pages, unauthenticated users are redirected to login, and non-admins can never reach `/admin/*` routes client-side.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite |
| Routing | Vue Router 5 (route-level auth guards) |
| State management | Pinia |
| HTTP client | Axios (with request/response interceptors) |
| Utilities | VueUse |
| Styling | Tailwind CSS v4 |
| Deployment | Vercel |

## Architecture

The app is a pure SPA with no server-side rendering — all data comes from the [Laravel API backend](https://github.com/mahmudpial/user-management-api). The Axios instance in `src/api/axios.js` is the single point of contact with the API:

- Reads the API base URL from `VITE_API_URL`
- Attaches the JWT from `localStorage` as a `Bearer` token on every request
- On a `401` response, clears the stored session and redirects to `/login`

Auth state itself lives in a Pinia store (`src/stores/auth.js`), which exposes `isLoggedIn` / `isAdmin` getters that the router guard reads on every navigation.

`vercel.json` rewrites all paths to `index.html`, which is required for client-side routing to work correctly on Vercel (otherwise a direct visit to e.g. `/blog/my-post` would 404).

## Getting Started

### Prerequisites
- Node.js `^20.19.0` or `>=22.12.0`
- npm
- A running instance of the [backend API](https://github.com/mahmudpial/user-management-api) (local or deployed)

### Installation

```bash
git clone https://github.com/mahmudpial/portfolio_and_blog_app_fontend.git
cd portfolio_and_blog_app_fontend

npm install
```

### Environment Variables

Create a `.env` file in the project root:

```dotenv
VITE_API_URL=http://localhost:8000/api
```

For production, this is set as an environment variable in the Vercel project settings, pointing at the deployed Render API instead:

```dotenv
VITE_API_URL=https://user-management-api-n936.onrender.com/api
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── api/            # Axios instance with JWT + 401 interceptors
├── stores/         # Pinia store — auth state (token, user, role getters)
├── router/         # Route definitions + navigation guards
├── views/
│   ├── public/     # Home, Skills, Portfolio, ProjectDetail, Blog, BlogPost, Contact
│   ├── auth/       # Login, Register, ForgotPassword, ResetPassword
│   ├── user/       # Profile
│   └── admin/      # DashboardView, SkillsManager, ProjectsManager,
│                   # PostsManager, CommentsManager, MessagesManager
└── components/     # AppNavbar, PublicNavbar, PublicFooter, FormattingGuide
```

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Set the `VITE_API_URL` environment variable to `https://user-management-api-n936.onrender.com/api`.
3. Vercel auto-detects the Vite build (`npm run build`, output in `dist/`). The included `vercel.json` handles SPA rewrites so client-side routes resolve correctly on refresh/direct visit.

## Related Repository

**Backend:** [user-management-api](https://github.com/mahmudpial/user-management-api) — Laravel 12 REST API with JWT auth, deployed on Render with a Supabase (PostgreSQL) database.

## Roadmap

- [ ] Add a `.env.example` for local onboarding
- [ ] Rich-text/markdown editor for the Posts Manager
- [ ] Image upload UI for project and post cover images
- [ ] Loading/skeleton states across public views

## License

No license file yet — add one (MIT is used on the companion backend repo) if you intend this to be reused by others.

## Author

**Pial Mahmud**
Full-Stack Developer (Laravel & Vue 3)
[GitHub](https://github.com/mahmudpial) · [pialmahmud80@gmail.com](mailto:pialmahmud80@gmail.com)
