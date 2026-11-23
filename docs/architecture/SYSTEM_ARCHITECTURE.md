# InterviewVerse AI — System Architecture

## 1. Executive Summary
InterviewVerse AI is an AI-powered interview preparation platform engineered for engineering students and fresh graduates. The platform bridges the gap between academic education and industry technical interviews through automated AI mock interviews, live coding problem solving, ATS resume analysis, and longitudinal performance tracking.

---

## 2. Architecture Diagram

```
+-------------------------------------------------------------+
|                     Client Tier (Frontend)                  |
|  React 19 + Vite + React Router + CSS Custom Token System   |
+------------------------------+------------------------------+
                               |
                               | REST API / JSON (HTTP)
                               v
+-------------------------------------------------------------+
|                     Application Tier (Backend)              |
|  Node.js + Express 5 + Mongoose + JWT + bcryptjs            |
+---------------+------------------------------+--------------+
                |                              |
                | Internal HTTP (Axios)        | Mongoose ODM
                v                              v
+-------------------------------+  +--------------------------+
|       AI Microservice         |  |      Database Tier       |
| Python + FastAPI + Pydantic   |  |     MongoDB Atlas        |
+---------------+---------------+  +--------------------------+
                |
                | Groq Cloud API
                v
+-------------------------------+
|      LLM Inference Layer      |
|  Groq API (Llama 3 / Mixtral) |
+-------------------------------+
```

---

## 3. Technology Stack & Responsibilities

### 3.1 Frontend (`/frontend`)
- **Framework:** React 19.3.1 with Vite 8.3.6
- **Routing:** React Router DOM 7.18.6
- **Styling:** Custom CSS Token System (`variables.css`, `reset.css`, `global.css`)
- **Icons:** Lucide React (`lucide-react`)
- **Planned Modules:** Monaco Editor (`@monaco-editor/react`), Recharts (`recharts`)

### 3.2 Backend (`/backend`)
- **Runtime:** Node.js (CommonJS)
- **Framework:** Express.js 5.3.0
- **Database ODM:** Mongoose 9.12.1
- **Security:** `bcryptjs` (password hashing), `jsonwebtoken` (stateless auth)
- **CORS & Environment:** `cors`, `dotenv`
- **Microservice Client:** `axios`

### 3.3 AI Microservice (`/ai-services`)
- **Framework:** Python 3.10+ / FastAPI
- **LLM Provider:** Groq Cloud API
- **Key Capabilities:**
  1. Role-specific Technical & Behavioral Question Generation
  2. Answer Evaluation (STAR method, score 0-100, strengths, weaknesses)
  3. Resume ATS Parsing & Keyword Analysis
  4. Code Analysis & Optimization Hints
