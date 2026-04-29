# PrepPortal — Team Contribution Report

**Project Name:** PrepPortal — Interview Preparation Platform  
**Team Members:** Abhivansh, Advitiya, Akshit, Ankita  
**Technology Stack:** React (Vite) | Node.js | Express.js | MongoDB | Mongoose  

---

## 1. Frontend Contributions

### 1.1 Abhivansh — Authentication Pages & App Architecture

**Pages:** Login.jsx, Signup.jsx, App.jsx, main.jsx  
**Styling:** Auth page styles, form input styles, divider component (~95 lines of index.css)

- Built the Login page with email/password form and Google OAuth sign-in button
- Built the Signup page with name, email, password fields and Google sign-up button
- Implemented the entire app routing system with protected routes
- Managed authentication state across the app (login, logout, guest mode)
- Handled Google OAuth token extraction from URL callback
- Created the app footer with quick links and contact section
- Styled the auth card with glassmorphism, form inputs with focus effects, and the floating animation on page load

### 1.2 Advitiya — Assessment Hub, Test Engine & Dashboard

**Pages:** Questions.jsx, Dashboard.jsx  
**Styling:** Test grid, category cards, question options, badges, stat cards, progress bar, result summary and review styles (~175 lines of index.css)

- Built the category selection grid showing all available subjects
- Built the test listing page showing tests per subject with difficulty badges
- Implemented the live test-taking interface with countdown timer
- Implemented option selection, previous/next navigation between questions
- Added auto-submit when timer reaches zero
- Built score calculation logic and weak topic detection from wrong answers
- Built the result view with percentage display, correct/wrong summary, and full question review
- Built the Dashboard page showing overall completion percentage with progress bar
- Displayed Easy, Medium, and Hard solved counts as stat cards
- Styled difficulty badges, interactive question options, test grid layout, stat cards with gradient hover, and the animated progress bar

### 1.3 Akshit — Home Page, Tips & Question Bank Data

**Pages:** Home.jsx, Tips.jsx, questionBank.js  
**Styling:** Home page hero section, stat tiles, info cards, feature list, CTA section (~110 lines of index.css)

- Built the Home landing page with hero section, stat tiles, how-it-works cards, feature list, and 30-day momentum plan
- Built the Interview Tips page that fetches and displays tips from the backend
- Handled loading and error states for the Tips page
- Created the entire question bank data file containing all subjects, tests, questions, options, correct answers, topics, difficulty levels, and time limits
- Styled the home hero layout with responsive grid, stat tiles with gradient backgrounds, and the 3-column info card grid

### 1.4 Ankita — UI Design System, Navbar & Profile

**Pages:** Navbar.jsx, Profile.jsx  
**Styling:** Base design system, CSS variables, navbar, cards, buttons, layout utilities, footer, avatar picker, responsive media queries, animations (~256 lines of index.css)

- Built the sticky glassmorphic navbar with navigation links and active test guard
- Implemented the profile chip with avatar display in the navbar
- Built the Profile page with view and edit modes
- Implemented avatar picker using DiceBear avatars and custom file upload for profile picture
- Designed the complete CSS design system including CSS custom properties, color palette, typography with Google Fonts, glassmorphism navbar, card hover effects, gradient buttons, responsive column layout, footer design, avatar picker grid, and the fade-in animation system

---

## 2. Backend Contributions

### 2.1 Abhivansh — Server Setup, Authentication & Database

**Functionalities:**

- **Server Setup & Configuration** (server.js, Lines 1–22)  
  Express app initialization, CORS middleware, JSON body parsing, static file serving for the uploads directory

- **File Upload Configuration** (server.js, Lines 24–32)  
  Multer disk storage setup that saves uploaded profile pictures with a timestamp-based filename

- **Google OAuth 2.0 Strategy** (server.js, Lines 34–60)  
  Passport.js Google strategy that authenticates users via Google, finds existing users by email or creates new ones with Google profile data

- **User Registration API** (server.js, Lines 125–151)  
  POST /api/signup — validates required fields, normalizes email, checks for existing users, links password to Google-only accounts, creates new users in MongoDB

- **User Login API** (server.js, Lines 153–179)  
  POST /api/login — authenticates user by email and password, detects Google-only accounts, compares bcrypt-hashed passwords, returns JWT token and user profile

- **Google Auth Routes** (server.js, Lines 181–190)  
  GET /api/auth/google initiates the OAuth flow, GET /api/auth/google/callback processes the response, generates a JWT, and redirects to the frontend with the token

**Other Files:**

- **Database Connection** (db.js, 11 lines) — Connects to MongoDB using Mongoose with error handling
- **Auth Middleware** (auth.js, 19 lines) — JWT token verification middleware and generateToken helper function
- **User Model** (User.js, 33 lines) — Mongoose schema with bcrypt password hashing on save, comparePassword method, and toProfile method for safe data exposure

### 2.2 Advitiya — Test Results & Progress Tracking

**Functionalities:**

- **Progress Tracking API** (server.js, Lines 220–264)  
  GET /api/progress — works with or without authentication, reads JWT token if present, fetches all test results for the user, picks the latest attempt per test using a Map, computes totalSolved, easySolved, mediumSolved, and hardSolved counts grouped by difficulty level

- **Fetch Test Results API** (server.js, Lines 290–297)  
  GET /api/results — retrieves all test results for the authenticated user, sorted by most recent first

- **Save Test Result API** (server.js, Lines 299–311)  
  POST /api/results — saves a new test attempt including score, total questions, percentage, individual answer details, weak topics, and time taken, linked to the authenticated user

- **Server Startup** (server.js, Lines 313–315)  
  Starts the Express server on the configured PORT

**Other Files:**

- **TestResult Model** (TestResult.js, 23 lines) — Mongoose schema storing test results with userId reference, answers array, weak topics, difficulty, and a compound index on userId and testId

### 2.3 Akshit — Interview Tips API

**Functionalities:**

- **Interview Tips Data** (server.js, Lines 62–123)  
  Static array of 12 curated interview tips, each with an id, title, and descriptive content

- **Tips API** (server.js, Lines 216–218)  
  GET /api/tips — serves the complete interview tips array to the frontend

### 2.4 Ankita — User Profile Management

**Functionalities:**

- **Get User Profile API** (server.js, Lines 192–202)  
  GET /api/user/:id — fetches and returns a user's profile data by their ID, requires authentication

- **Get Current User API** (server.js, Lines 204–214)  
  GET /api/me — fetches the profile of the currently logged-in user using the userId from the JWT token

- **Update User Profile API** (server.js, Lines 266–288)  
  PUT /api/user/:id — updates profile fields including age, bio, and university, handles profile picture through either Multer file upload or avatar URL, removes undefined fields before updating in the database

---

## 3. Line Count Summary

| Member | Frontend Lines | CSS Lines | Backend Lines | Total Lines |
|--------|:-:|:-:|:-:|:-:|
| Abhivansh | 349 | 95 | 189 | 633 |
| Advitiya | 370 | 175 | 90 | 635 |
| Akshit | 427 | 110 | 65 | 602 |
| Ankita | 315 | 256 | 46 | 617 |
| **Project Total** | **1,461** | **636** | **385** | **2,482** |
