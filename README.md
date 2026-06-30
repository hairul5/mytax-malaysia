# MyTax Malaysia — Technical Handover Document

**Version:** 1.0  
**Assessment Year:** YA 2026 / Tahun Taksiran 2026  
**File:** `MyTaxFull.jsx` (1,450 lines, single-file React component)  
**Built with:** React (JSX), Tailwind-free inline styles, Anthropic Claude API  
**Prepared by:** Mamat (AI Assistant to Prof Hairul Azhar Abdul-Rashid)

---

## 1. Overview

MyTax Malaysia is a mobile-first personal income tax management app for Malaysian individual taxpayers (Borang BE filers). It is built as a single React JSX artifact, runnable directly in the Claude.ai artifact renderer or embeddable in any React project.

The app covers the full personal tax workflow — income entry, LHDN relief tracking via AI-powered receipt scanning, Zakat Pendapatan calculation with s.6A rebate, tax estimation, tax planning simulation, document storage, and PDF export — all in official bilingual EN/BM terminology sourced from LHDN Borang BE, Nota Penerangan BE, and the Income Tax Act 1967 (Act 53).

---

## 2. Feature List

| # | Feature | Tab / Access |
|---|---|---|
| 1 | Login / Sign-Up screen | App entry gate |
| 2 | Google Sign-In button (UI) | Login screen |
| 3 | Email + password sign-up | Login screen |
| 4 | Income slider + live tax dashboard | Home (tab 0) |
| 5 | Expense tracker with manual entry | Expenses (tab 1) |
| 6 | AI OCR receipt scanning | Expenses / Docs |
| 7 | LHDN relief category progress bars | Reliefs (tab 2) |
| 8 | Full Borang BE-style tax estimate | Estimate (tab 3) |
| 9 | PDF Tax Summary export | Estimate tab |
| 10 | Tax Planning Mode with what-if sliders | Estimate tab |
| 11 | AI Optimiser for relief suggestions | Tax Planning Mode |
| 12 | Zakat Pendapatan calculator | Zakat (tab 4) |
| 13 | s.6A(3) Zakat rebate applied to tax | Estimate tab |
| 14 | Document vault (Peti Besi) | Docs (tab 5) |
| 15 | AI document reading + auto-categorisation | Docs tab |
| 16 | Settings & Profile | Settings (tab 6) |
| 17 | Full bilingual EN/BM toggle | Header (all tabs) |

---

## 3. File Structure

The entire app is one file: `MyTaxFull.jsx`. Internal sections:

```
MyTaxFull.jsx
│
├── T = { en:{...}, ms:{...} }          Bilingual string table (~300 lines)
├── TAX_RELIEF_CATEGORIES[]             8 LHDN relief categories with caps
├── INCOME_BANDS[]                      YA 2026 progressive tax bands
├── SAMPLE_EXPENSES[]                   Pre-loaded demo expense data
├── DOC_CATS[]                          Document vault filter categories
├── FILE_TYPES{}                        File type icons and colours
├── Constants                           NISAB_SILVER_RM, ZAKAT_RATE
├── Helper functions                    calcTax(), fmt(), catFor(), etc.
├── Sub-components                      ScanLine, CornerMarkers, ZInput
├── SCAN state enum                     IDLE | SCANNING | REVIEW | SAVING | SAVED
│
└── export default MyTaxApp()
    ├── Auth state                      authUser, authForm, authMode
    ├── Core state                      tab, expenses, annualIncome
    ├── Expense add state               showAdd, newExp, expAttach, expAiState
    ├── Scanner state                   scanState, previewUrl, imgB64, extracted
    ├── Zakat state                     zakatIncome, zakatDeduc, zakatSaved
    ├── Document vault state            docs, docFilter, docSearch, pendingDoc
    ├── Profile/Settings state          profile{marital, children, epfRate...}
    ├── Tax Planning state              showPlan, planAmounts, planSuggestions
    │
    ├── Derived tax calculations        personalReliefTotal, cappedReliefs,
    │                                   chargeable, estTax, zakatRebate,
    │                                   rebate400, taxAfterRebate
    │
    ├── Auth functions                  handleAuthSubmit(), handleGoogleAuth()
    ├── Expense functions               handleExpAttach(), addManual()
    ├── Scanner functions               processFile(), scanReceipt(), saveScan()
    ├── Document functions              handleDocFile(), saveDoc(), deleteDoc()
    ├── Zakat function                  saveZakat()
    ├── Profile function                saveProfile()
    ├── Plan functions                  fetchPlanSuggestions(), applyPlan()
    ├── Export function                 exportPDF()
    │
    └── JSX render
        ├── {!authUser&&(...)}          Login / Sign-Up screen
        └── {authUser&&(...)}           Main app (phone shell)
            ├── Header                  Gradient, stats, lang toggle, user avatar
            ├── Nav bar                 7-tab scrollable nav
            ├── Content area            Tabs 0–3 (Home, Expenses, Reliefs, Estimate)
            ├── Footer
            ├── {tab===4}               Zakat overlay
            ├── {tab===5}               Docs overlay + scan panel + doc modal
            ├── {tab===6}               Settings overlay
            └── {showPlan&&(...)}       Tax Planning Mode overlay
```

---

## 4. Tax Engine

### 4.1 Progressive Tax Bands (YA 2026)

```javascript
const INCOME_BANDS = [
  { max: 5000,     rate: 0     },
  { max: 20000,    rate: 0.01  },
  { max: 35000,    rate: 0.03  },
  { max: 50000,    rate: 0.08  },
  { max: 70000,    rate: 0.13  },
  { max: 100000,   rate: 0.21  },
  { max: 250000,   rate: 0.24  },
  { max: 400000,   rate: 0.245 },
  { max: 600000,   rate: 0.25  },
  { max: Infinity, rate: 0.26  },
];
```

### 4.2 Relief Categories and Caps (YA 2026)

| Category | LHDN Label (BM) | Cap |
|---|---|---|
| medical | Perubatan & Kesihatan | RM10,000 |
| education | Pendidikan (Yuran) | RM7,000 |
| lifestyle | Gaya Hidup | RM2,500 |
| equipment | Komputer / Telefon Pintar | RM2,500 |
| epf | Insurans Nyawa & KWSP | RM7,000 |
| childcare | Anak & Yuran Taska/Tadika | RM3,000 |
| charity | Derma & Zakat | No cap |
| other | Lain-lain (Tidak Dituntut) | No cap |

### 4.3 Personal Reliefs from Profile

```
personalReliefTotal = 9,000 (Pelepasan Individu)
                    + 6,000 (if selfDisabled — OKU)
                    + 4,000 (if married && !spouseHasIncome — s.45(2) ITA)
                    + (numChildren × 2,000)
                    + (numDisabledChildren × 6,000)
```

### 4.4 Rebates (Subseksyen 6A ACP 1967)

```
zakatRebate    = min(zakatPendapatanPaid, estTax)        s.6A(3)
rebate400      = 400 if chargeable ≤ 35,000              s.6A(2)(b)
spouseRebate   = 400 if spouseRelief claimed && chargeable ≤ 35,000  s.6A(2)(c)

taxAfterRebate = max(0, estTax − zakatRebate − rebate400 − spouseRebate)
```

### 4.5 Zakat Pendapatan

```
NISAB_SILVER_RM = 595g × RM4.50 = RM2,677.50
net             = annualIncome − personalDeductions
zakatAmt        = net × 2.5%  (if net ≥ NISAB_SILVER_RM, else 0)
```

> **Note:** Nisab is updated twice yearly by state zakat bodies. Update `NISAB_SILVER_RM` each January and July from MAIWP or the relevant state authority.

---

## 5. AI Integration

All AI calls use the **Anthropic Claude API** via `https://api.anthropic.com/v1/messages`.

| Feature | Model | Max tokens | Purpose |
|---|---|---|---|
| Receipt OCR (scan) | claude-sonnet-4-20250514 | 1,000 | Extract merchant, date, amount, LHDN category |
| Expense attachment AI | claude-sonnet-4-20250514 | 600 | Quick read for manual expense entry |
| Document vault AI | claude-sonnet-4-20250514 | 1,000 | Full document classification |
| AI Optimiser | claude-sonnet-4-20250514 | 600 | Tax planning suggestions |

All AI calls return structured JSON. The system prompts instruct the model to return **ONLY JSON** with no markdown fences. Responses are parsed with `.replace(/```json|```/g, "").trim()` before `JSON.parse()`.

**No API key is passed** — the artifact infrastructure handles authentication. When deploying outside the artifact, add:
```javascript
headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
}
```

---

## 6. Authentication

The current auth is a **UI prototype** — no real backend. To wire real authentication:

### Option A — Firebase Auth (recommended)

```javascript
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,
         signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Replace handleGoogleAuth():
async function handleGoogleAuth() {
  const result = await signInWithPopup(auth, googleProvider);
  setAuthUser({ name: result.user.displayName, email: result.user.email, provider: "google" });
}

// Replace handleAuthSubmit() for login:
async function handleAuthSubmit() {
  const cred = await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
  setAuthUser({ name: cred.user.displayName || authForm.email.split("@")[0], email: cred.user.email });
}
```

### Option B — Supabase Auth

Similar pattern — replace the mock functions with Supabase `signInWithOAuth({ provider: "google" })` and `signInWithPassword()`.

### Session Persistence

Currently all data (expenses, docs, settings) lives in React state and is lost on refresh. To persist:
- **Firebase Firestore** — store expenses and profile under `users/{uid}/`
- **Supabase** — use the `postgres` tables with RLS per user
- **localStorage** — works outside the artifact for simple persistence

---

## 7. Annual Update Checklist

Every year after the October Budget, update the following before the March–April filing season:

| Item | Location in code | Source |
|---|---|---|
| Tax band rates and thresholds | `INCOME_BANDS[]` | LHDN / Finance Act |
| Relief category caps | `TAX_RELIEF_CATEGORIES[]` | LHDN Pelepasan Cukai TT [year].pdf |
| Personal relief amount (currently RM9,000) | `personalReliefTotal` formula | Borang BE Nota Penerangan |
| Spouse relief (currently RM4,000) | `spouseReliefAmt` | Borang BE |
| Child relief (currently RM2,000) | `childReliefAmt` | Borang BE |
| Disabled child relief (RM6,000) | `disChildRelief` | Borang BE |
| Rebate threshold (currently RM35,000) | `rebate400` formula | s.6A(2) ITA 1967 |
| Nisab figure | `NISAB_SILVER_RM` | State zakat body (Jan + Jul) |
| Assessment Year labels | `T.en.ya`, `T.ms.ya`, footer strings | — |

**Primary reference document:** `hasil.gov.my/media/.../pelepasan-cukai-tt-[year].pdf`

---

## 8. Bilingual Terminology

All UI strings are stored in the `T` object at the top of the file:

```javascript
const T = {
  en: { nav: ["Home","Expenses",...], ... },
  ms: { nav: ["Utama","Perbelanjaan",...], ... }
};
const s = T[lang]; // active string set
```

All terminology follows official LHDN sources:
- **Borang BE** and **Nota Penerangan BE** (annual)
- **Income Tax Act 1967 (Act 53 / ACP 1967)**
- **DBP Kamus Dewan** for UI-specific terms
- **LHDN MyTax portal** for system labels

Key term decisions documented:

| English | Official Malay | Source |
|---|---|---|
| Tax Relief | Pelepasan Cukai | Borang BE |
| Tax Rebate | Rebat Cukai | s.6A ACP 1967 |
| Chargeable Income | Pendapatan Bercukai | Borang BE |
| Tax Payable | Cukai Kena Bayar | Borang BE |
| Monthly Tax Deduction | Potongan Cukai Bulanan (PCB) | LHDN operational |
| Assessment Year | Tahun Taksiran (TT) | Borang BE |
| Upload | Muat Naik | DBP |
| Scan | Imbas | DBP |
| Delete | Padam | DBP (preferred over hapus) |
| Add New | Tambah Baharu | DBP (baharu not baru) |
| Note | Catatan | LHDN |
| Amount (money) | Amaun | DBP (not Jumlah for single amounts) |
| Tax Implication | Implikasi Cukai | Plain Malay (not statutory) |

---

## 9. Known Limitations & Future Work

| Item | Status | Notes |
|---|---|---|
| Auth backend | Not wired | UI prototype only — see Section 6 |
| Data persistence | In-memory only | Resets on refresh — wire Firebase/Supabase |
| MyInvois API | Not integrated | Requires ERP-level OAuth — not suitable for client-side app |
| Nisab auto-update | Manual | Fetch from zakat body API or update hardcode twice yearly |
| Year-on-Year comparison | Not built | Manual YA 2026 input overlay — straightforward to add |
| Push notifications | Not built | PCB reminder in March, filing deadline in April |
| Multi-device sync | Not built | Requires backend |
| Camera-native OCR | Browser only | `capture="environment"` on mobile; no native SDK |

---

## 10. Running the App

### In Claude.ai artifact renderer
Paste `MyTaxFull.jsx` content into a new React artifact. No dependencies needed.

### In a React project

```bash
npm create vite@latest mytax -- --template react
cd mytax
# Replace src/App.jsx content with MyTaxFull.jsx content
npm run dev
```

No external packages required — the app uses only React hooks (`useState`, `useRef`, `useCallback`) and the browser's native `fetch` API.

### Environment variables (for production)

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Then replace the fetch headers in each AI call to include `"x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY`.

> **Security note:** Never expose the Anthropic API key client-side in production. Route AI calls through a server-side proxy (Next.js API route, Express, or Supabase Edge Function).

---

## 11. Legal & Compliance Notes

- All tax calculations are **estimates only** and should not be used as the basis for official tax filing without verification via LHDN MyTax or a licensed tax agent.
- Zakat rebate calculations reference **Subseksyen 6A(3) Akta Cukai Pendapatan 1967 (Act 53)**.
- Personal rebate references **Subseksyen 6A(2)(b) and 6A(2)(c) ACP 1967**.
- The app does not transmit user data to any server (all computation is client-side).
- AI document analysis uses the Anthropic API — document images are sent to Anthropic's servers for processing. Review Anthropic's data retention policy before deploying in a regulated environment.

---

## 12. Contact & Ownership

**Developed for:** Prof Hairul Azhar Abdul-Rashid  
**Institution:** UC TATI (University College Terengganu Advanced Technology Institute)  
**Purpose:** Personal tax management tool prototype — Malaysian individual taxpayers (Borang BE)  
**Built:** May 2026  

---

*MyTax Malaysia · AI-Powered · LHDN Compliant · YA 2026*
