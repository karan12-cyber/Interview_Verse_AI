# InterviewVerse AI — Database Schema Design

## 1. Overview
InterviewVerse AI uses MongoDB as its primary datastore with Mongoose as the Object Data Modeling (ODM) layer.

---

## 2. Entity Relationship Model

```mermaid
erDiagram
    USERS ||--o{ INTERVIEWS : conducts
    USERS ||--o{ RESUMES : uploads
    USERS ||--o{ SUBMISSIONS : submits
    USERS ||--o{ ANALYTICS : tracks
    INTERVIEWS ||--o{ QUESTIONS : contains
    QUESTIONS ||--o{ EVALUATIONS : evaluated_by
    CODING_PROBLEMS ||--o{ SUBMISSIONS : tested_against

    USERS {
        ObjectId _id PK
        string name
        string email UK
        string passwordHash
        string role "student | admin"
        string avatarUrl
        string googleId
        boolean isVerified
        string otpCode
        date otpExpires
        date createdAt
    }

    INTERVIEWS {
        ObjectId _id PK
        ObjectId userId FK
        string targetRole
        string domain "frontend | backend | dsa | hr"
        string experienceLevel "entry | mid | senior"
        string status "in_progress | completed"
        number overallScore
        date completedAt
    }

    QUESTIONS {
        ObjectId _id PK
        ObjectId interviewId FK
        string questionText
        string questionType "technical | behavioral | hr"
        string difficulty "easy | medium | hard"
        int orderIndex
    }

    EVALUATIONS {
        ObjectId _id PK
        ObjectId questionId FK
        string studentAnswer
        number score "0 - 100"
        string feedback
        string strengths
        string improvements
    }

    RESUMES {
        ObjectId _id PK
        ObjectId userId FK
        string fileUrl
        string fileName
        number atsScore
        string[] extractedSkills
        string[] missingKeywords
        string recommendations
        date analyzedAt
    }

    CODING_PROBLEMS {
        ObjectId _id PK
        string title
        string description
        string difficulty "easy | medium | hard"
        string category
        string starterCode
        json testCases
    }

    SUBMISSIONS {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId problemId FK
        string code
        string language
        string status "accepted | failed | error"
        string aiReview
        date submittedAt
    }

    ANALYTICS {
        ObjectId _id PK
        ObjectId userId FK
        number totalInterviews
        number averageScore
        number totalPracticeTimeMinutes
        json weeklyScores
    }
```
