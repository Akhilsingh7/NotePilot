# 🧠 NotePilot — Notion-like Notes App

A full-stack notes application inspired by Notion, built with modern web technologies.
Users can create, edit, and share notes with a rich text editor, along with authentication, OTP verification, and public note exploration.

---

## 🚀 Features

- ✍️ Rich text editor (BlockNote)
- 🔐 Authentication with OTP (email-based)
- 🧾 Create, update, delete notes (CRUD)
- 🌍 Public notes (Explore page)
- 🔒 Private user dashboard
- ⚡ Auto-save ready architecture
- 📦 RESTful API design
- 🚫 Rate limiting for OTP using Redis

---

## 🛠️ Tech Stack

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- BlockNote Editor
- React Hot Toast

### Backend

- Next.js API Routes
- MongoDB (Mongoose)
- Redis (OTP + rate limiting)
- NextAuth (Authentication)

---

## 📂 Project Structure

/app
├── page.tsx → Homepage
├── dashboard → Private user notes
├── explore → Public notes
├── api
│ ├── notes → CRUD APIs
│ ├── public-notes → Public notes API
│ └── auth → OTP + authentication

/components → Reusable UI components
/models → MongoDB schemas
/lib → DB, Redis, Auth configs
/docs → Project documentation

---

## 🔐 Authentication Flow

1. User enters email
2. OTP is sent via email
3. OTP stored in Redis (5 min expiry)
4. User verifies OTP
5. Account created / logged in

---

## 📡 API Design

### Notes

- `POST /api/notes` → Create note
- `GET /api/notes` → Get user notes
- `GET /api/notes/:id` → Get single note
- `PUT /api/notes/:id` → Update note
- `DELETE /api/notes/:id` → Delete note

### Public Notes

- `GET /api/public-notes` → Fetch all public notes

---

## ⚠️ Status Codes Used

- `200` → Success
- `400` → Bad request (invalid input)
- `401` → Unauthorized
- `404` → Not found
- `429` → Too many requests (OTP cooldown)
- `500` → Server error

---

## 🧠 Key Decisions

- Stored editor content as JSON (flexible structure)
- Used Redis for OTP rate limiting
- Implemented RESTful API structure
- Used server-side session validation for security
- Dynamic import for BlockNote to fix SSR issues

---

## 🔥 Challenges Solved

- ❗ Handling "window is not defined" with BlockNote (SSR issue)
- 🔐 Secure OTP system with Redis expiration
- ⚡ Preventing OTP spam using rate limiting (429)
- 🧩 Managing session across frontend & backend
- 🧠 Designing scalable API structure

---

## 🧪 Running Locally

```bash
git clone <repo-url>
cd project
npm install
npm run dev
```

---

## 🌟 Future Improvements

- Auto-save with debounce (Notion-like)
- Note sharing via link
- Likes & comments system
- Folder / project organization
- Search functionality
- Infinite scroll on explore page

---

## 👨‍💻 Author

Akhil Singh
Frontend Developer → transitioning to Full Stack 🚀

---

## 📌 Note

This project is built as a portfolio-level full-stack application following industry standards in API design, authentication, and UI/UX.

---
