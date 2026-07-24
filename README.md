# Drive

A Google Drive clone with real per-account isolation. Sign in with Google
and everything you upload is yours alone — no shared folder, no other
account can see or touch your files.

**🔗 Live demo:** https://google-drive-clone-inky-iota.vercel.app

## Why this exists

Most "Google Drive clone" tutorial projects skip the part that actually
makes a drive personal: real per-account isolation. This one doesn't — every
file is scoped to the Google account that uploaded it, enforced by Firestore
and Storage security rules (not just hidden in the UI), so signing in with a
different account gets you an empty drive, not someone else's files.

## Features

- Google Sign-In — the only way in, no anonymous access
- Upload files straight to your own private space (Firebase Storage,
  path-scoped per user)
- Live file list backed by Firestore (`onSnapshot`), updates in real time
  as uploads land
- Search your own files by name
- Download any file you've uploaded
- Running total of files and storage used

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, MUI icons |
| Backend | Firebase (Authentication, Firestore, Storage) — no custom server |
| Hosting | Vercel |

There's no backend server in this project at all — the browser talks
directly to Firebase, with security enforced by Firestore/Storage rules
rather than an API layer.

## Data model & security rules

Every file's Firestore document carries a `uid` field (the uploader's
Firebase Auth UID), and every Storage object lives under `files/{uid}/...`.
Both are enforced server-side, not just filtered client-side:

- `firestore.rules` — a `myfiles` document can only be read/written by the
  UID it belongs to
- `storage.rules` — a `files/{uid}/...` path can only be read/written by
  that same UID

If you fork this and stand up your own Firebase project, deploy both with
the Firebase CLI:

```bash
firebase deploy --only firestore:rules,storage:rules
```

(or paste their contents into Firebase Console → Firestore/Storage → Rules
directly).

## Running it locally

**Prerequisites:** Node.js ≥ 18, a Firebase project with Authentication
(Google provider enabled), Firestore, and Storage turned on.

```bash
git clone https://github.com/mkhalidh/Google_Drive.git
cd Google_Drive
npm install
```

Create `.env` from `.env.example` and fill in your Firebase project's web
config (Firebase Console → Project Settings → General → Your apps):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Then:

```bash
npm run dev       # http://localhost:5173
```

## Deployment

Deployed to Vercel, with the Firebase config above set as Vercel
environment variables (Project Settings → Environment Variables). CI/CD
runs via GitHub Actions:

- `.github/workflows/ci.yml` — lint + build on every push/PR
- `.github/workflows/deploy.yml` — deploys to Vercel on every push to `main`
  (needs `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` repo secrets)

## Project structure

```
Google_Drive/
├── src/
│   ├── App.jsx           # Auth state machine (sign-in/out), top-level layout
│   ├── Header.jsx         # Search, account, sign-out
│   ├── Sidebar.jsx        # Upload flow, storage summary
│   ├── Data.jsx            # Per-user file list
│   ├── firebase.js         # Firebase init (reads VITE_FIREBASE_* env vars)
│   └── css/                 # Component styles
├── firestore.rules          # Per-user Firestore access rules
├── storage.rules             # Per-user Storage access rules
└── .github/workflows/         # CI/CD
```

## License

MIT
