# MyTax Malaysia — Claude Code Instructions

## Project Overview
MyTax Malaysia is a mobile-first personal income tax management app for Malaysian Muslim salaried taxpayers. It is a React single-page application built with Vite.

## Tech Stack
- React 18 (JSX, hooks only — no external state management)
- Vite 5 (build tool)
- Firebase 10 (Auth + Firestore — see firebase-setup/ folder)
- Anthropic Claude API (AI receipt OCR, tax optimiser — see src/MyTaxFull.jsx)
- Pure inline styles (no Tailwind, no CSS files)

## Key Files
- `src/MyTaxFull.jsx` — entire app in one file (1,450 lines)
- `src/firebase.js` — Firebase initialisation (fill .env first)
- `firebase-setup/FIREBASE_GUIDE.md` — step-by-step Firebase wiring guide
- `firebase-setup/firestore.rules` — paste into Firebase Console
- `firebase-setup/api/claude.js` — Vercel API proxy for Anthropic

## Getting Started
1. Copy `.env.template` to `.env` and fill in Firebase + Anthropic keys
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5173

## Auth Wiring
The app currently uses mock auth. To wire real Firebase Auth:
- See `firebase-setup/FIREBASE_GUIDE.md` Steps 6–8
- Replace `handleGoogleAuth()`, `handleAuthSubmit()`, `handleSignOut()` in MyTaxFull.jsx
- Add `onAuthStateChanged` useEffect

## Annual Updates (after October Budget)
Update these constants in src/MyTaxFull.jsx:
- `INCOME_BANDS` — tax rates and thresholds
- `TAX_RELIEF_CATEGORIES` — relief caps
- `NISAB_SILVER_RM` — update twice yearly from state zakat bodies
- Assessment year labels in `T.en` and `T.ms` string tables

## Notes
- All UI strings are in the `T = { en:{}, ms:{} }` object at the top of MyTaxFull.jsx
- The app is fully bilingual EN/BM — toggle via the header button
- Target screen width: 390px (iPhone 14 Pro size)
- AI calls use `https://api.anthropic.com/v1/messages` — in production, proxy through `/api/claude`
