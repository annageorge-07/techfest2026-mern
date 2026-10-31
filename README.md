# INSIGNIA 2026 — MERN Stack

A MERN conversion starter for the existing `annageorge-07/techfest2026` website.

## Stack
- React + Vite + React Router
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication and bcrypt password hashing
- Render (API) + Netlify (frontend)

## Project structure
```text
techfest2026-mern/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── .gitignore
```

## 1. Requirements
Install Node.js 20.19+ or 22.12+ and Git. Verify:
```bash
node -v
npm -v
```

## 2. Configure the backend
```bash
cd server
npm install
cp .env.example .env
```
Edit `server/.env` and provide:
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: a long random secret (at least 32 characters)
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: initial organizer account
- `CLIENT_ORIGIN=http://localhost:5173`

Create the first organizer account:
```bash
npm run seed:admin
```
Then start the API:
```bash
npm run dev
```
Health check: http://localhost:5000/api/health

## 3. Configure the React frontend
Open a second terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Open the Vite URL, normally http://localhost:5173.

## 4. Features included
- React pages: Home, About, Schedule, Tickets, Gallery, Contact, Registration and Organizer dashboard
- Registration stored in MongoDB, with duplicate-email validation
- Contact messages stored in MongoDB
- Public events API and organizer-only event management API
- Organizer login using bcrypt + JWT
- Protected organizer dashboard with participant list and task CRUD
- Environment-variable configuration for local and production deployments

## 5. Push to your existing GitHub repository
Do this from the extracted project root. Keep a backup of the original repository first.
```bash
git init
git add .
git commit -m "Convert TechFest website to MERN stack"
git branch -M main
git remote add origin https://github.com/annageorge-07/techfest2026.git
git push -u origin main
```
If `origin` already exists, use:
```bash
git remote set-url origin https://github.com/annageorge-07/techfest2026.git
```
If GitHub rejects the push because the remote contains commits not in this folder, do not force-push. Clone the repository, copy these `client/` and `server/` folders into it, then commit and push.

## 6. Deploy
### Render backend
- New Web Service → connect the GitHub repository
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables from `server/.env.example`
- Set `NODE_ENV=production`
- Set `CLIENT_ORIGIN` to your Netlify site URL

### Netlify frontend
- Import the same GitHub repository
- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api`
- Add a `client/public/_redirects` file (already included) for React Router.

After deployment, update Render's `CLIENT_ORIGIN` to the exact Netlify origin and redeploy.

## Important
- Never commit `.env` files, passwords, MongoDB credentials or JWT secrets.
- The organizer account is created from environment variables by `npm run seed:admin`.
- This is a working MERN foundation, but test all flows with your own Atlas database before submitting.
- The existing repository's original image assets are not copied into this starter archive. Copy your existing `Image/` directory (or whichever image folder is in your repo) into `client/public/images/`, then update image paths as needed.
