# InterviewVerse AI — AI-Powered Interview Preparation Platform

An end-to-end, AI-powered interview preparation platform engineered for engineering students and fresh graduates. Practice role-based technical and behavioral interviews, solve coding challenges in an integrated editor, analyze your resume against industry ATS standards, and track your performance growth over time.

---

## 🚀 Key Modules
1. **User Authentication & Profile Management:** Secure sign-in, registration, candidate target role selection, and session management.
2. **AI Mock Interviews:** Dynamic, role-specific technical and behavioral questions generated in real-time.
3. **AI Answer Evaluation:** STAR-methodology feedback, granular scoring (0–100), identifying strengths and areas of improvement.
4. **Coding Practice Workspace:** In-browser coding challenges by difficulty with AI-assisted review.
5. **Smart Resume Analyzer:** PDF resume parsing, ATS scoring, skill matching, and keyword gap recommendations.
6. **Performance Analytics:** Comprehensive dashboards tracking skill progress, accuracy rates, and preparation history.
7. **Admin Management Hub:** Oversight over user metrics, question pools, and platform utilization.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, React Router DOM, Lucide React, Token-based CSS Design System
- **Backend:** Node.js, Express 5, Mongoose ODM, JWT, bcryptjs
- **Database:** MongoDB
- **AI Microservice:** Python, FastAPI, Groq API (Llama 3 / Mixtral)

---

## 📂 Repository Structure
```
Interview_Verse_AI/
├── frontend/             # React + Vite frontend application
│   ├── src/
│   │   ├── components/   # Common, landing, and layout components
│   │   ├── pages/        # Public, auth, student, and admin views
│   │   ├── styles/       # CSS tokens, reset, and global styles
│   │   ├── App.jsx       # Root router
│   │   └── main.jsx      # React entry point
├── backend/              # Node.js + Express backend service
├── ai-services/          # Python + FastAPI AI microservice (Groq API)
└── docs/                 # System architecture, database schemas, and API documentation
```

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📚 Documentation
- [System Architecture](docs/architecture/SYSTEM_ARCHITECTURE.md)
- [Database Schema Design](docs/database/SCHEMA_DESIGN.md)
- [Application Pages & Routes](docs/api/ROUTES_AND_PAGES.md)
