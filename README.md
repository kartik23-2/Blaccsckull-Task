# Feedants Competition Details Module (Full-Stack Implementation)

A production-grade, functional full-stack implementation of the **Feedants Competition Details Screen** built for the Feedants Full Stack Development Internship Technical Assignment.

---

## 🌟 Overview & Architecture

This application consists of a mobile-first **React Native (Expo)** frontend paired with a robust **Node.js + Express + MongoDB** backend API. It strictly faithfully matches the provided Feedants design reference while delivering dynamic state handling, concurrency control, multi-language support (English / Hindi), and real-time interactive user states.

```
                  ┌────────────────────────────────────────┐
                  │          React Native (Expo)           │
                  │   Mobile-First Screen & UI Layout    │
                  └──────────────────┬─────────────────────┘
                                     │ HTTP REST Requests
                                     ▼
                  ┌────────────────────────────────────────┐
                  │          Node.js + Express API         │
                  │  (Atomic Validation & Concurrency Engine)│
                  └──────────────────┬─────────────────────┘
                                     │
                                     ▼
                  ┌────────────────────────────────────────┐
                  │       MongoDB (Mongoose Schema)        │
                  │   Auto-fallback to MongoMemoryServer   │
                  └────────────────────────────────────────┘
```

---

## ✨ Key Features & Technical Highlights

### 📱 1. Pixel-Perfect Design Implementation
- **Header & Navigation**: Status bar, dynamic back button, language selector toggle (`ENG` / `हिंदी`), title badge, category pills (`Dance`, `Multi-Win`, `🏆 Winners get certificate`).
- **Key Stats Card**: Prize pool (`₹ 1,500`), entry fee (`₹ 99`), and interactive progress bar (`1 / 20 Booked`, `Only 19 spots left`).
- **Judge Card**: Avatar, designation (`Manju Dubey`), experience badge, and an interactive **Intro Video Modal**.
- **Live Countdown Timer**: Real-time ticker counting down to registration deadline (`01d : 06h : 28m : 32s`).
- **Important Dates 2x2 Grid**: Clean card layout displaying *Register Before*, *Submission Starts*, *Submission Ends*, and *Result Date*.
- **Previous Winners Carousel**: Horizontal scrollable avatar cards with rank badges.
- **Interactive Tabs**: Animated tab switching between *About Competition*, *Judging Parameters*, and *Rules & Eligibility*.
- **Rewards Breakdown Table**: Structured rank-wise distribution (`1st Winner` to `6th Winner`).
- **Trust & Guarantee Banners**: Disclaimer notice, prize money payout video trigger, refund policy, and Razorpay security badge.
- **Referral Section**: Referral code input with single-click "Copy Link" and "Refer Now" actions.
- **Sticky Bottom Action Bar**: Dynamic state-aware CTA (`Register Now - ₹99`, `Upload Submission`, or `Spots Full`).
- **Bottom Navigation**: Home, Explore, (+) Central Action, Competitions (Active), Profile.

### ⚡ 2. Concurrency & Data Consistency
- **Atomic Registrations**: Built with MongoDB atomic operations (`$inc`) and condition checking (`bookedSpots < totalSpots`) to guarantee zero overbooking when hundreds of users register simultaneously.
- **Concurrency Test Suite Included**: Includes an automated load script (`npm run test:concurrency`) that fires 50 simultaneous parallel registration requests against 19 remaining spots.

### 🌐 3. Multi-Language Support (i18n)
- Seamless real-time switching between **English (ENG)** and **Hindi (हिंदी)** for all labels, dates, headers, button texts, and rank descriptions.

### 🛠 4. Built-In Live Tester & Demo Control Panel
- Top drawer panel allowing reviewers to:
  1. Switch between test users (`User 1`, `User 2`, `User 3`) to observe non-registered vs registered vs submitted states.
  2. Simulate competition lifecycle states (`REGISTRATION_OPEN`, `SUBMISSION_OPEN`, `COMPLETED`).
  3. Simulate spot capacity (`19 Left` vs `Spots Full`).
  4. Instant database reset & re-seed button.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

---

### 1️⃣ Backend Setup & Running

```bash
cd backend

# Install dependencies
npm install

# Option A: Start backend server (Auto-connects to MongoDB or auto-spawns In-Memory MongoDB)
npm start

# Option B: Run Concurrency Load Test (50 simultaneous parallel requests)
npm run test:concurrency
```

The backend server will run at: `http://localhost:5000`

---

### 2️⃣ Frontend Setup & Running

```bash
cd frontend

# Install dependencies
npm install

# Start Expo Web App
npm run web
```

The frontend web app will open at: `http://localhost:8081`

---

## 📋 Technical Decisions & Design Rationale

1. **Zero External DB Requirement**: `db.js` automatically detects if a local MongoDB service is available; if not, it automatically boots up `mongodb-memory-server` in-memory. This guarantees the application runs out of the box without requiring manual DB setup.
2. **Race-Condition Safety**: Used atomic query constraints `Competition.findOneAndUpdate({ _id: competitionId, bookedSpots: { $lt: totalSpots } })` to ensure database-level concurrency protection.
3. **Responsive Mobile Frame Shell**: Web view wraps the mobile app UI inside a simulated device container (`maxWidth: 480px`) with realistic status and navigation bars.

---

## 📄 License
MIT License
