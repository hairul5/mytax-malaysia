# MyTax Malaysia — Firebase Backend Integration Guide

Complete step-by-step guide to wire Firebase Auth + Firestore into MyTax Malaysia.

---

## Step 1 — Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `mytax-malaysia`
3. Disable Google Analytics (not needed) → **Create project**
4. Once created, click the **Web icon** (`</>`) to register a web app
5. Name it `mytax-web` → click **Register app**
6. Copy the `firebaseConfig` object shown — you'll need it in Step 3

---

## Step 2 — Enable Firebase Services

In the Firebase console sidebar:

### Authentication
- **Build → Authentication → Get started**
- Enable **Google** (Sign-in providers → Google → Enable → Save)
- Enable **Email/Password** (Sign-in providers → Email/Password → Enable → Save)

### Firestore Database
- **Build → Firestore Database → Create database**
- Choose **Start in production mode** → select your region (e.g. `asia-southeast1` for Malaysia)
- Click **Enable**

---

## Step 3 — Project Setup

```bash
npm create vite@latest mytax-malaysia -- --template react
cd mytax-malaysia
npm install firebase
npm install
```

Copy `MyTaxFull.jsx` into `src/MyTaxFull.jsx`.  
Replace `src/App.jsx` with:

```jsx
import MyTaxApp from './MyTaxFull'
export default function App() { return <MyTaxApp /> }
```

Create `.env` in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ANTHROPIC_API_KEY=sk-ant-your_key
```

> ⚠️ Add `.env` to `.gitignore` — never commit API keys.

---

## Step 4 — Firebase Config File

Create `src/firebase.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
```

---

## Step 5 — Firestore Data Schema

```
firestore/
└── users/
    └── {uid}/                          ← one doc per user
        ├── profile/
        │   └── settings                ← doc: marital, children, epfRate, etc.
        ├── expenses/
        │   └── {expenseId}             ← doc per expense
        ├── documents/
        │   └── {docId}                 ← doc per vault document (no binary — use Storage)
        └── zakat/
            └── {zakatId}               ← doc per zakat payment
```

### Expense document shape
```javascript
{
  id:        "auto",
  desc:      "Medical Check-up",
  amount:    780,
  category:  "medical",
  date:      "2026-03-22",
  thumb:     null,           // base64 thumbnail (small) or null
  zakatSubtype: "pendapatan" // optional
  createdAt: serverTimestamp()
}
```

### Profile document shape
```javascript
{
  marital:             "married",
  spouseHasIncome:     false,
  numChildren:         2,
  numDisabledChildren: 0,
  selfDisabled:        false,
  epfRate:             11,
  annualIncome:        84000,
  updatedAt:           serverTimestamp()
}
```

---

## Step 6 — Firestore Security Rules

In Firebase console → **Firestore → Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

---

## Step 7 — Replace Auth Functions in MyTaxFull.jsx

Add these imports at the very top of `MyTaxFull.jsx`:

```javascript
import { useState, useRef, useCallback, useEffect } from "react";
import {
  signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import {
  doc, collection, getDocs, setDoc, addDoc,
  deleteDoc, onSnapshot, serverTimestamp
} from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";
```

### Replace `handleGoogleAuth()`

```javascript
async function handleGoogleAuth() {
  setAuthGoogleLoading(true);
  setAuthError("");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    setAuthUser({
      name:     user.displayName || "Google User",
      email:    user.email,
      uid:      user.uid,
      avatar:   "G",
      provider: "google"
    });
  } catch (e) {
    setAuthError(e.message);
  } finally {
    setAuthGoogleLoading(false);
  }
}
```

### Replace `handleAuthSubmit()`

```javascript
async function handleAuthSubmit() {
  setAuthError("");
  if (authMode === "signup" && (!authForm.name || !authForm.email || !authForm.password)) {
    setAuthError(s.authErrorSignup); return;
  }
  if (!authForm.email || !authForm.password) {
    setAuthError(s.authErrorSignup); return;
  }
  setAuthLoading(true);
  try {
    if (authMode === "signup") {
      const cred = await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
      await updateProfile(cred.user, { displayName: authForm.name });
      setAuthUser({ name: authForm.name, email: authForm.email, uid: cred.user.uid });
    } else {
      const cred = await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
      setAuthUser({
        name:  cred.user.displayName || authForm.email.split("@")[0],
        email: cred.user.email,
        uid:   cred.user.uid
      });
    }
  } catch (e) {
    setAuthError(lang === "ms" ? "E-mel atau kata laluan tidak sah." : "Invalid email or password.");
  } finally {
    setAuthLoading(false);
  }
}
```

### Replace `handleSignOut()`

```javascript
async function handleSignOut() {
  await signOut(auth);
  setAuthUser(null);
  setAuthForm({ name: "", email: "", password: "" });
  setExpenses(SAMPLE_EXPENSES);
  setDocs([]);
  setProfile({ marital:"single", spouseHasIncome:false, numChildren:0, numDisabledChildren:0, selfDisabled:false, epfRate:11 });
}
```

### Add session persistence with `useEffect`

Add this after the auth state declarations:

```javascript
// Restore session on page load
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthUser({
        name:  user.displayName || user.email.split("@")[0],
        email: user.email,
        uid:   user.uid,
        provider: user.providerData[0]?.providerId === "google.com" ? "google" : "email"
      });
    }
  });
  return () => unsubscribe();
}, []);
```

---

## Step 8 — Firestore Sync Functions

Add these functions after `handleSignOut()`:

```javascript
// ── Load user data from Firestore ─────────────────────────────────────────────
async function loadUserData(uid) {
  // Expenses
  const expSnap = await getDocs(collection(db, "users", uid, "expenses"));
  const loaded = expSnap.docs.map(d => ({ ...d.data(), id: d.id }));
  if (loaded.length > 0) setExpenses(loaded);

  // Profile
  const profRef = doc(db, "users", uid, "profile", "settings");
  const profSnap = await getDocs(collection(db, "users", uid, "profile"));
  if (!profSnap.empty) {
    const profData = profSnap.docs.find(d => d.id === "settings")?.data();
    if (profData) {
      setProfile(profData);
      if (profData.annualIncome) setIncome(profData.annualIncome);
    }
  }
}

// ── Save expense to Firestore ─────────────────────────────────────────────────
async function saveExpenseToFirestore(expense) {
  if (!authUser?.uid) return;
  await addDoc(collection(db, "users", authUser.uid, "expenses"), {
    ...expense,
    createdAt: serverTimestamp()
  });
}

// ── Delete expense from Firestore ─────────────────────────────────────────────
async function deleteExpenseFromFirestore(expenseId) {
  if (!authUser?.uid) return;
  await deleteDoc(doc(db, "users", authUser.uid, "expenses", String(expenseId)));
}

// ── Save profile to Firestore ─────────────────────────────────────────────────
async function saveProfileToFirestore() {
  if (!authUser?.uid) return;
  await setDoc(
    doc(db, "users", authUser.uid, "profile", "settings"),
    { ...profile, annualIncome, updatedAt: serverTimestamp() }
  );
  setSettingsSaved(true);
  setTimeout(() => setSettingsSaved(false), 2500);
}
```

### Load data on login

Update the `onAuthStateChanged` useEffect:

```javascript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setAuthUser({
        name:  user.displayName || user.email.split("@")[0],
        email: user.email,
        uid:   user.uid,
        provider: user.providerData[0]?.providerId === "google.com" ? "google" : "email"
      });
      await loadUserData(user.uid);
    }
  });
  return () => unsubscribe();
}, []);
```

### Update `addManual()` to sync

```javascript
function addManual() {
  if (!newExp.desc || !newExp.amount) return;
  const eid = Date.now();
  const expense = {
    id: eid, desc: newExp.desc, amount: parseFloat(newExp.amount),
    category: newExp.category, date: newExp.date,
    thumb: expAttach?.previewUrl || null
  };
  setExpenses(prev => [...prev, expense]);
  saveExpenseToFirestore(expense);  // ← add this line
  if (expAttach) setDocs(prev => [...prev, { id: eid+1, name: newExp.desc || expAttach.name, category: newExp.category, note: `Expense: RM ${newExp.amount}`, type: expAttach.type, size: expAttach.size, dataUrl: expAttach.dataUrl, previewUrl: expAttach.previewUrl, date: newExp.date }]);
  resetExpForm();
}
```

### Update `saveProfile()` to sync

```javascript
function saveProfile() {
  saveProfileToFirestore();  // replaces the old mock save
}
```

---

## Step 9 — Anthropic API Proxy (Production Security)

Never expose the Anthropic API key client-side in production. Create a server-side proxy.

### Option A — Vercel API Route

Create `api/claude.js` in your project:

```javascript
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.status(response.status).json(data);
}
```

Then in `MyTaxFull.jsx`, replace all:
```javascript
fetch("https://api.anthropic.com/v1/messages", { ... })
```
with:
```javascript
fetch("/api/claude", { ... })
```

### Option B — Firebase Cloud Function

```javascript
// functions/index.js
const { onRequest } = require("firebase-functions/v2/https");
const fetch = require("node-fetch");

exports.claudeProxy = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.json(data);
});
```

Deploy: `firebase deploy --only functions`

---

## Step 10 — Deploy to Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
# Select: dist/ as public dir, single-page app: yes
firebase deploy --only hosting
```

Your app will be live at `https://mytax-malaysia.web.app`.

---

## Firestore Cost Estimate (Free Tier)

Firebase Spark (free) plan limits:

| Operation | Free limit | MyTax usage |
|---|---|---|
| Reads | 50,000/day | ~50 reads per user session |
| Writes | 20,000/day | ~10 writes per active session |
| Storage | 1 GB | ~1 KB per expense record |
| Auth | Unlimited | — |

For a small user base (< 500 daily active users), the free tier is sufficient. Upgrade to Blaze (pay-as-you-go) when scaling.

---

## Summary Checklist

- [ ] Firebase project created
- [ ] Google + Email/Password auth enabled
- [ ] Firestore database created (asia-southeast1)
- [ ] Security rules published
- [ ] `src/firebase.js` created with config
- [ ] `.env` filled with Firebase + Anthropic keys
- [ ] `handleGoogleAuth()` replaced
- [ ] `handleAuthSubmit()` replaced
- [ ] `handleSignOut()` replaced
- [ ] `onAuthStateChanged` useEffect added
- [ ] `loadUserData()` wired on login
- [ ] `saveExpenseToFirestore()` called on addManual()
- [ ] `saveProfileToFirestore()` called on saveProfile()
- [ ] Anthropic API proxied through server function
- [ ] Deployed to Firebase Hosting

---

*MyTax Malaysia · Firebase Integration Guide · v1.0 · May 2026*
