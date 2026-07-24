# Drive

A Google Drive clone with real per-account isolation. Sign in with Google
and everything you upload is yours alone — no shared folder, no other
account can see or touch your files.

**🔗 Live demo:** https://google-drive-clone-inky-iota.vercel.app

## Why this exists

Most "Google Drive clone" tutorial projects skip the part that actually
makes a drive personal: real per-account isolation. This one doesn't — every
file is scoped to the Google account that uploaded it, enforced by Firestore
security rules (not just hidden in the UI), so signing in with a different
account gets you an empty drive, not someone else's files.

## Features

- Google Sign-In — the only way in, no anonymous access
- Upload files straight to your own private space
- Live file list backed by Firestore (`onSnapshot`), updates in real time
  as uploads land
- Search your own files by name
- Download any file you've uploaded
- Running total of files and storage used

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, MUI icons |
| Auth + file metadata | Firebase (Authentication, Firestore) |
| File storage | Cloudinary (unsigned client-side uploads) |
| Hosting | Vercel |

There's no backend server in this project — the browser talks directly to
Firebase and Cloudinary.

Firebase Storage isn't used here: as of late 2024, Firebase requires the
paid Blaze plan to manage Storage, even for the free-tier quota. Cloudinary
has a genuinely free tier (25GB storage/bandwidth, no card required), so
that's where the actual file bytes live; Firestore still holds each file's
metadata (name, size, uploader, timestamp, and the Cloudinary URL).

## Data model & security

Every file's Firestore document carries a `uid` field (the uploader's
Firebase Auth UID) — enforced server-side by `firestore.rules`, not just
filtered client-side: a `myfiles` document can only be read or written by
the UID it belongs to.

**One honest caveat**: Cloudinary's unsigned free tier doesn't support
per-user access rules the way Firebase Storage did — an uploaded file's URL
is technically public if someone has (or guesses) it. In practice this is
fine for this app: the URL is only ever revealed to the uploader, through
their own Firestore-gated file list, and Cloudinary's auto-generated IDs
aren't guessable. But it's "private by not being discoverable," not
cryptographically enforced access control like the Firestore side is. Worth
knowing if you extend this into something handling actually sensitive files.

If you fork this and stand up your own Firebase project, deploy the
Firestore rules with the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

(or paste `firestore.rules`'s contents into Firebase Console → Firestore →
Rules directly).

## Running it locally

**Prerequisites:** Node.js ≥ 18, a Firebase project with Authentication
(Google provider enabled) and Firestore turned on, and a free Cloudinary
account.

```bash
git clone https://github.com/mkhalidh/Google_Drive.git
cd Google_Drive
npm install
```

Create `.env` from `.env.example` and fill in your Firebase project's web
config (Firebase Console → Project Settings → General → Your apps) plus
your Cloudinary cloud name and an unsigned upload preset (Cloudinary
dashboard → Settings → Upload → Upload presets → Signing Mode: Unsigned):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Then:

```bash
npm run dev       # http://localhost:5173
```

## Deployment

Deployed to Vercel, with the env vars above set as Vercel environment
variables (Project Settings → Environment Variables). Also add the deployed
domain under Firebase Console → Authentication → Settings → Authorized
domains, or Google Sign-In will reject it. CI/CD runs via GitHub Actions:

- `.github/workflows/ci.yml` — lint + build on every push/PR
- `.github/workflows/deploy.yml` — deploys to Vercel on every push to `main`
  (needs `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` repo secrets)

## Project structure

```
Google_Drive/
├── src/
│   ├── App.jsx           # Auth state machine (sign-in/out), top-level layout
│   ├── Header.jsx         # Search, account menu, sign-out
│   ├── Sidebar.jsx        # Upload flow (to Cloudinary), storage summary
│   ├── Data.jsx            # Per-user file list
│   ├── firebase.js         # Firebase init (reads VITE_FIREBASE_* env vars)
│   └── css/                 # Component styles
├── firestore.rules          # Per-user Firestore access rules
└── .github/workflows/         # CI/CD
```

## License

MIT
