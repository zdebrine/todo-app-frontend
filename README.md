# Nooro Frontend

A Next.js 15 (App Router) + TypeScript + Tailwind CSS frontend for the **Nooro** task app.  
This project connects to an [Express.js backend](https://github.com/zdebrine/todo-app-backend) for managing tasks.

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/nooro-frontend.git
cd nooro-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the backend
This frontend depends on the Express.js backend.  
Clone and run the backend first — by default it runs at:

```
http://localhost:4000
```

### 4. Run the frontend in dev mode
```bash
npm run dev
```

This will start Next.js with Turbopack at:

```
http://localhost:3000
```

---

## 🔧 Scripts

- `npm run dev` — Start development server with Turbopack  
- `npm run build` — Build production app  
- `npm start` — Run built app  
- `npm run lint` — Lint with ESLint  

---

## ⚙️ Configuration

- API base URL is currently hardcoded to `http://localhost:4000`.  
  If you deploy the backend elsewhere, update `lib/api.ts` accordingly or set up an environment variable.
- Tailwind config lives in `tailwind.config.ts`.

---

## 🗂 Project Structure

```
app/              # Next.js App Router pages & layouts
components/       # Reusable UI components (TaskCard, TaskList, TaskForm, etc.)
lib/              # API client (axios instance, fetchers)
types/            # Shared TypeScript types
public/           # Static assets
```

---

## ✅ Features

- View all tasks  
- Add new tasks with color tags  
- Edit existing tasks  
- Mark tasks as complete  
- Delete tasks (with inline confirmation)  

---

## 🛠 Development Notes

- Uses **SWR global mutate** for refreshing task data after updates/deletes (no prop drilling).  
- Optimistic UI updates for smooth UX.  
- Styled with **Tailwind CSS v4**.  

---
