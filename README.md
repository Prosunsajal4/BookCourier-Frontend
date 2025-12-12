# BookCourier — Library-to-Home Delivery (Frontend)

BookCourier is a production-ready React frontend for browsing books, placing orders, and managing customer/seller/admin workflows. It features a responsive UI, fast data fetching, and robust dark/light theme support.

**Live URL:** https://assignement11-8c757.web.app/

**Project Purpose:** Deliver a smooth library-to-home experience with clear navigation, performant lists, and role-based dashboards.

## Features

- **Theme Support:** Persistent dark/light mode using DaisyUI/Tailwind tokens (`bg-base-*`, `text-base-content`, `border-base-*`).
- **Catalog & Discovery:** Search, price-based sorting, latest-books grid, and a full catalog view.
- **Role-Based Dashboards:** Admin, Seller, and Customer views for management and operations.
- **Modern UI Components:** Cards, modals, tables, forms, and a responsive layout.
- **Firebase Hosting:** Optimized production builds deployed to Firebase.

## Tech & Packages

- **Core:** React, React DOM, Vite
- **Styling:** Tailwind CSS v4, DaisyUI, @tailwindcss/vite
- **UI/UX:** react-icons, react-spinners, react-hot-toast, @headlessui/react
- **Data & Routing:** Axios, React Router, @tanstack/react-query (+ Devtools)
- **Platform:** firebase
- **Tooling:** ESLint, @vitejs/plugin-react

## Getting Started

Prerequisites: Node.js 18+, npm 9+, and a `.env.local` for API/Firebase configuration.

1. Install dependencies
   ```powershell
   npm install
   ```
2. Run locally
   ```powershell
   npm run dev
   ```
3. Build for production
   ```powershell
   npm run build
   ```

## Environment

Create `.env.local` with your configuration, for example:

```
VITE_API_URL=https://api.example.com
# Firebase keys if applicable
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Theming Notes

- Theme is controlled via `data-theme` on `<html>` and persisted in `localStorage`.
- Early theme application is injected in `index.html` to avoid initial flash.
- Toggle is implemented in `src/components/Shared/Navbar/Navbar.jsx`.
- Prefer semantic, theme-aware classes (`bg-base-*`, `text-base-content`, `border-base-*`, `btn`, `card`).

## Project Structure Highlights

- Entry: [src/main.jsx](src/main.jsx)
- Styles: [src/index.css](src/index.css)
- Tailwind/DaisyUI config: [tailwind.config.js](tailwind.config.js)
- Layout: [src/layouts/MainLayout.jsx](src/layouts/MainLayout.jsx)
- Catalog: [src/pages/Books/Books.jsx](src/pages/Books/Books.jsx), [src/components/Home/LatestBooks.jsx](src/components/Home/LatestBooks.jsx)

## Deployment

- Firebase Hosting configured via [firebase.json](firebase.json).
- Deploy:
  ```powershell
  npm run build
  firebase deploy
  ```

## Conventions

- Use DaisyUI components where possible (`btn`, `card`, `input`, `select`).
- Avoid hardcoded non-theme colors (e.g., `bg-white`, `text-black`).
- Keep PRs focused and consistent with existing patterns.
# BookCourier-Frontend
