# AI Resume Builder - Free Online Resume & CV Builder with AI

> Build professional, ATS-friendly resumes in minutes using AI. Free, open-source, no signup required.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## Overview

AI Resume Builder is a **production-ready, open-source resume and CV generator** designed for job seekers, students, and professionals who want polished, ATS-optimized resumes without signup or cost.

### Key Differentiators

| Feature | AI Resume Builder | Other Builders |
|---------|-------------------|----------------|
| **Authentication** | None required | Signup mandatory |
| **Cost** | Completely free | Freemium / subscription |
| **Data Privacy** | Stored locally (H2) | Cloud storage |
| **AI Features** | Summary, skills, ATS | Limited / premium only |
| **Export** | PDF, JSON, print | Usually PDF only |
| **Templates** | 4 professional designs | 1-2 free, rest paid |

---

## Features

### Resume Builder
- **Personal details** - Full name, contact, location, job title
- **Professional summary** - AI-generated or custom
- **Work experience** - Company, position, dates, achievements
- **Education** - Institution, degree, dates, GPA
- **Skills** - With proficiency levels and categories
- **Projects** - Portfolio projects with technologies
- **Certifications** - Professional credentials
- **Languages** - With proficiency levels
- **Social links** - LinkedIn, GitHub, website

### Resume Templates
| Template | Style | Best For |
|----------|-------|----------|
| **Modern** | Dark header, structured | Tech, corporate |
| **Minimal** | Clean typography | Creative, freelance |
| **Corporate** | Blue accents, formal | Finance, consulting |
| **Creative** | Vibrant gradients | Design, marketing |

### AI-Powered Tools
- **Summary Generator** - Creates professional summaries from role + experience
- **Skill Suggestions** - Recommends skills based on job title
- **ATS Optimizer** - Analyzes content for missing keywords
- **Bullet Enhancer** - Rewrites bullet points for impact

### Export Options
- **PDF Export** - Print-ready documents
- **JSON Export** - Machine-readable data for integrations
- **Print Layout** - Optimized for physical printing

---

## Screenshots

### Dashboard
*Coming soon - add screenshots to `docs/screenshots/`*

### Resume Builder
*Coming soon - add screenshots to `docs/screenshots/`*

### Live Preview
*Coming soon - add screenshots to `docs/screenshots/`*

---

## Live Demo

**Coming soon!** The application will be deployed to a public URL.

### Local Demo

```bash
# Start in under 5 minutes
docker compose up --build

# Open in browser
http://localhost
```

---

## Technology Stack

### Backend (Spring Boot 3)
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 LTS | Programming language |
| Spring Boot | 3.4.x | Application framework |
| Spring Data JPA | 3.4.x | Data persistence |
| Spring Validation | 3.4.x | Request validation |
| H2 Database | Latest | Embedded database |
| Flyway | 10.x | Database migrations |
| Lombok | 1.18.x | Boilerplate reduction |
| MapStruct | 1.5.x | Entity/DTO mapping |
| Swagger / OpenAPI | 2.3.x | API documentation |
| JUnit 5 | 5.10.x | Unit testing |
| Mockito | 5.x | Mocking framework |

### Frontend (React 18)
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI library |
| TypeScript | 5.6.x | Type safety |
| Vite | 5.4.x | Build tool |
| Tailwind CSS | 3.4.x | Styling framework |
| React Query | 5.x | Server state management |
| Zustand | 5.x | Client state management |
| Framer Motion | 11.x | Animations |
| Axios | 1.7.x | HTTP client |
| Lucide React | 0.460.x | Icons |

### DevOps & Infrastructure
| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | 27.x | Containerization |
| Docker Compose | 2.x | Multi-container orchestration |
| Nginx | 1.27.x | Reverse proxy, static serving |
| Maven | 3.9.x | Build tool |
| Node.js | 20.x | Runtime environment |

---

## System Architecture

### High-Level Diagram

```mermaid
graph TB
    subgraph Client["Client Browser"]
        React[React + Vite + TS]
    end
    
    subgraph Docker["Docker Network"]
        Nginx[Nginx Reverse Proxy :80]
        
        subgraph Backend["Backend Container"]
            SpringBoot[Spring Boot 3 :8080]
            Actuator[Spring Actuator]
        end
        
        subgraph Database["Data Layer"]
            H2[H2 Database<br/>File-Based]
            Flyway[Flyway Migrations]
            Volume[Docker Volume<br/>persistence]
        end
    end
    
    React -->|HTTP| Nginx
    Nginx -->|/api/*| SpringBoot
    Nginx -->|/* (static)| React
    SpringBoot -->|JDBC| H2
    Flyway -->|Schema & Seed| H2
    Volume --> H2
    
    Actuator -->|Health checks| SpringBoot
```

### Request Flow

```
User Request
    ↓
Nginx (:80)
    ↓ (Routes /api/*)
Spring Boot (:8080)
    ↓ (Controller)
Service Layer
    ↓ (Validation, Business Logic)
Repository Layer
    ↓ (JPA)
H2 Database (file-based)
```

### Data Flow

```
Create Resume
    ↓
Validation (JSR-303)
    ↓
Controller (REST API)
    ↓
Service (Business Logic)
    ↓
Repository (JPA/Hibernate)
    ↓
H2 Database (Flyway migrations)
```

---

## Quick Start

### Prerequisites

- Docker 27.x or later
- Docker Compose 2.x or later
- (Optional) Git

### Using Docker Compose (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder

# 2. Start all services
docker compose up --build

# 3. Open in browser
# Frontend:    http://localhost
# Backend API: http://localhost:8080
# Swagger:     http://localhost:8080/swagger-ui.html
# H2 Console:  http://localhost:8080/h2-console
```

### Stopping the Application

```bash
# Stop containers
docker compose down

# Stop and remove volumes (deletes data!)
docker compose down -v

# Stop and remove everything including images
docker compose down --rmi all -v
```

---

## Installation

### Backend (Local Development)

```bash
cd backend

# Install dependencies & compile
./mvnw clean install -DskipTests

# Run with development profile (H2 in-memory, no Flyway)
./mvnw spring-boot:run -Dspring.profiles.active=dev

# Or run with production profile (H2 file, Flyway enabled)
./mvnw spring-boot:run -Dspring.profiles.active=prod
```

**Backend URL:** `http://localhost:8080`

### Frontend (Local Development)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend URL:** `http://localhost:5173`

### Full Local Setup

```bash
# Terminal 1 - Backend
cd backend
./mvnw spring-boot:run -Dspring.profiles.active=dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Access application at http://localhost:5173
```

---

## API Documentation

### Interactive API Docs

Once the application is running, access **Swagger UI** at:

```
http://localhost:8080/swagger-ui.html
```

### Resume Endpoints

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| `POST` | `/api/v1/resumes` | Create resume | `ResumeCreateRequest` | `ResumeResponse` |
| `GET` | `/api/v1/resumes` | List all resumes | - | `List<ResumeResponse>` |
| `GET` | `/api/v1/resumes/{id}` | Get resume | - | `ResumeResponse` |
| `PUT` | `/api/v1/resumes/{id}` | Update resume | `ResumeUpdateRequest` | `ResumeResponse` |
| `DELETE` | `/api/v1/resumes/{id}` | Delete resume | - | 204 No Content |
| `POST` | `/api/v1/resumes/{id}/duplicate` | Duplicate resume | - | `ResumeResponse` |
| `PUT` | `/api/v1/resumes/{id}/template` | Change template | `templateType` param | `ResumeResponse` |
| `PUT` | `/api/v1/resumes/{id}/publish` | Publish resume | - | `ResumeResponse` |
| `PUT` | `/api/v1/resumes/{id}/draft` | Set as draft | - | `ResumeResponse` |
| `GET` | `/api/v1/resumes/search` | Search by title | `query` param | `List<ResumeResponse>` |

### Section Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/sections/resumes/{id}/personal-details` | Add personal details |
| `PUT` | `/api/v1/sections/personal-details/{id}` | Update personal details |
| `POST` | `/api/v1/sections/resumes/{id}/work-experiences` | Add work experience |
| `PUT` | `/api/v1/sections/work-experiences/{id}` | Update work experience |
| `DELETE` | `/api/v1/sections/work-experiences/{id}` | Delete work experience |
| `POST` | `/api/v1/sections/resumes/{id}/educations` | Add education |
| `PUT` | `/api/v1/sections/educations/{id}` | Update education |
| `DELETE` | `/api/v1/sections/educations/{id}` | Delete education |
| `POST` | `/api/v1/sections/resumes/{id}/skills` | Add skill |
| `PUT` | `/api/v1/sections/skills/{id}` | Update skill |
| `DELETE` | `/api/v1/sections/skills/{id}` | Delete skill |
| `POST` | `/api/v1/sections/resumes/{id}/projects` | Add project |
| `PUT` | `/api/v1/sections/projects/{id}` | Update project |
| `DELETE` | `/api/v1/sections/projects/{id}` | Delete project |
| `POST` | `/api/v1/sections/resumes/{id}/certifications` | Add certification |
| `POST` | `/api/v1/sections/resumes/{id}/languages` | Add language |
| `POST` | `/api/v1/sections/resumes/{id}/social-links` | Add social link |

### AI Assistant Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/ai/generate-summary` | Generate professional summary |
| `POST` | `/api/v1/ai/enhance-bullets` | Enhance bullet points |
| `POST` | `/api/v1/ai/suggest-skills` | Suggest skills for a role |
| `POST` | `/api/v1/ai/optimize-ats` | ATS optimization analysis |
| `POST` | `/api/v1/ai/keyword-recommendations` | Keyword recommendations |
| `POST` | `/api/v1/ai/role-specific-skills` | Role-specific skill suggestions |

### Export Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/resumes/{id}/export/pdf` | Export as PDF |
| `GET` | `/api/v1/resumes/{id}/export/json` | Export as JSON |
| `GET` | `/api/v1/resumes/{id}/export/print` | Get print-friendly data |

---

## Database Schema

### Entity-Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       RESUME                                │
├─────────────────────────────────────────────────────────────┤
│ id (PK)          │ BIGSERIAL                                │
│ title            │ VARCHAR(255)                             │
│ template_type    │ ENUM (MODERN, MINIMAL, CORPORATE,        │
│                  │          CREATIVE)                        │
│ status           │ ENUM (DRAFT, READY, ARCHIVED)             │
│ is_draft         │ BOOLEAN                                  │
│ created_at       │ TIMESTAMP                                │
│ updated_at       │ TIMESTAMP                                │
└────────┬────────────────────────────────────────────────────┘
         │ 1:1
         ▼
┌─────────────────────────────────────────────────────────────┐
│              PERSONAL_DETAILS                               │
├─────────────────────────────────────────────────────────────┤
│ id (PK)          │ BIGSERIAL                                │
│ resume_id (FK)   │ BIGINT                                   │
│ full_name        │ VARCHAR(255)                             │
│ email            │ VARCHAR(255)                             │
│ phone            │ VARCHAR(50)                              │
│ address          │ TEXT                                     │
│ website          │ VARCHAR(255)                             │
│ linked_in        │ VARCHAR(255)                             │
│ github           │ VARCHAR(255)                             │
│ photo_url        │ TEXT                                     │
│ job_title        │ VARCHAR(255)                             │
│ city             │ VARCHAR(100)                             │
│ state            │ VARCHAR(100)                             │
│ country          │ VARCHAR(100)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           PROFESSIONAL_SUMMARY                              │
├─────────────────────────────────────────────────────────────┤
│ id (PK)          │ BIGSERIAL                                │
│ resume_id (FK)   │ BIGINT                                   │
│ summary          │ TEXT                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐   ┌─────────────┐
│              WORK_EXPERIENCE                                │──│ BULLET_POINT│
├─────────────────────────────────────────────────────────────┤   ├─────────────┤
│ id (PK)          │ BIGSERIAL                                │   │ id (PK)     │
│ resume_id (FK)   │ BIGINT                                   │   │ parent_id   │
│ company          │ VARCHAR(255)                             │   │ type        │
│ position         │ VARCHAR(255)                             │   │ content     │
│ summary          │ TEXT                                     │   │ order       │
│ start_date       │ DATE                                     │   └─────────────┘
│ end_date         │ DATE                                     │
│ is_current       │ BOOLEAN                                  │
│ location         │ VARCHAR(255)                             │
│ display_order    │ INT                                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│     EDUCATION       │   │      PROJECT        │   │  CERTIFICATION      │
├─────────────────────┤   ├─────────────────────┤   ├─────────────────────┤
│ id (PK)             │   │ id (PK)             │   │ id (PK)             │
│ resume_id (FK)      │   │ resume_id (FK)      │   │ resume_id (FK)      │
│ institution         │   │ name                │   │ name                │
│ degree              │   │ description         │   │ issuer              │
│ field_of_study      │   │ technologies        │   │ issue_date          │
│ start_date          │   │ link                │   │ expiry_date         │
│ end_date            │   │ start_date          │   │ url                 │
│ gpa                 │   │ end_date            │   └─────────────────────┘
│ location            │   │ display_order       │
│ description         │   └─────────────────────┘
│ display_order       │
└─────────────────────┘

┌─────────────────────┐   ┌─────────────────────┐
│       SKILL         │   │     LANGUAGE        │
├─────────────────────┤   ├─────────────────────┤
│ id (PK)             │   │ id (PK)             │
│ resume_id (FK)      │   │ resume_id (FK)      │
│ name                │   │ name                │
│ proficiency         │   │ proficiency         │
│ category            │   │ display_order       │
│ display_order       │   └─────────────────────┘
└─────────────────────┘

┌─────────────────────┐
│    SOCIAL_LINK      │
├─────────────────────┤
│ id (PK)             │
│ resume_id (FK)      │
│ platform            │
│ url                 │
│ display_order       │
└─────────────────────┘
```

### Database Migrations

| File | Version | Description |
|------|---------|-------------|
| `V1__Initial_Schema.sql` | 1 | Creates all tables with indexes and constraints |
| `V2__Seed_Data.sql` | 2 | Inserts sample resumes for testing |

### H2 Configuration

**Development** (in-memory)
```yml
spring:
  datasource:
    url: jdbc:h2:mem:ai-resume-dev
```

**Production** (file-based)
```yml
spring:
  datasource:
    url: jdbc:h2:file:./data/ai-resume-db
```

---

## Project Structure

```textnai-resume-builder/
│
│
├──  README.md                    # Project documentation
├──  docker-compose.yml           # Docker orchestration
├──  .dockerignore                # Docker ignore rules
│
├──  backend/                     # Spring Boot 3 Application
│    ├──  pom.xml                  # Maven configuration
│    ├──  Dockerfile               # Multi-stage build
│    ├──  .dockerignore            # Docker ignore rules
│    │
│    └──  src/
│         ├──  main/
│         │    ├──  java/
│         │    │    └──  com/ai/resume/
│         │    │
│         │    │         # ── Application Entry Point ──
│         │    │         AiResumeBuilderApplication.java
│         │    │
│         │    │         # ── Configuration Layer ──
│         │    │         config/
│         │    │         ├──  OpenAPIConfig.java        # Swagger/OpenAPI docs
│         │    │         ├──  WebConfig.java              # CORS configuration
│         │    │         └──  CORSConfig.java             # Additional CORS settings
│         │    │
│         │    │         # ── Controller Layer (REST API) ──
│         │    │         controller/
│         │    │         ├──  ResumeController.java       # Resume CRUD
│         │    │         ├──  ResumeSectionController.java # Section CRUD
│         │    │         ├──  AiAssistantController.java   # AI features
│         │    │         └──  ExportController.java        # PDF/JSON export
│         │    │
│         │    │         # ── DTO Layer (Data Transfer) ──
│         │    │         dto/
│         │    │         ├──  request/
│         │    │         │    ├──  ResumeCreateRequest.java
│         │    │         │    ├──  ResumeUpdateRequest.java
│         │    │         │    ├──  PersonalDetailsRequest.java
│         │    │         │    ├──  ProfessionalSummaryRequest.java
│         │    │         │    ├──  WorkExperienceRequest.java
│         │    │         │    ├──  EducationRequest.java
│         │    │         │    ├──  SkillRequest.java
│         │    │         │    ├──  ProjectRequest.java
│         │    │         │    ├──  CertificationRequest.java
│         │    │         │    ├──  LanguageRequest.java
│         │    │         │    ├──  SocialLinkRequest.java
│         │    │         │    └──  BulletPointRequest.java
│         │    │         │
│         │    │         └──  response/
│         │    │              ├──  ResumeResponse.java
│         │    │              ├──  PersonalDetailsResponse.java
│         │    │              ├──  ProfessionalSummaryResponse.java
│         │    │              ├──  WorkExperienceResponse.java
│         │    │              ├──  EducationResponse.java
│         │    │              ├──  SkillResponse.java
│         │    │              ├──  ProjectResponse.java
│         │    │              ├──  CertificationResponse.java
│         │    │              ├──  LanguageResponse.java
│         │    │              └──  SocialLinkResponse.java
│         │    │
│         │    │         # ── Entity Layer (JPA) ──
│         │    │         entity/
│         │    │         ├──  Resume.java                    # Main resume entity
│         │    │         ├──  PersonalDetails.java
│         │    │         ├──  ProfessionalSummary.java
│         │    │         ├──  WorkExperience.java
│         │    │         ├──  Education.java
│         │    │         ├──  Skill.java
│         │    │         ├──  Project.java
│         │    │         ├──  Certification.java
│         │    │         ├──  Language.java
│         │    │         ├──  SocialLink.java
│         │    │         └──  BulletPoint.java
│         │    │
│         │    │         # ── Repository Layer ──
│         │    │         repository/
│         │    │         ├──  ResumeRepository.java
│         │    │         ├──  PersonalDetailsRepository.java
│         │    │         ├──  ProfessionalSummaryRepository.java
│         │    │         ├──  WorkExperienceRepository.java
│         │    │         ├──  EducationRepository.java
│         │    │         ├──  SkillRepository.java
│         │    │         ├──  ProjectRepository.java
│         │    │         ├──  CertificationRepository.java
│         │    │         ├──  LanguageRepository.java
│         │    │         ├──  SocialLinkRepository.java
│         │    │         └──  BulletPointRepository.java
│         │    │
│         │    │         # ── Service Layer (Business Logic) ──
│         │    │         service/
│         │    │         ├──  ResumeService.java             # Core resume logic
│         │    │         ├──  ResumeSectionService.java       # Section management
│         │    │         ├──  AiAssistantService.java         # AI features
│         │    │         └──  ExportService.java              # Export logic
│         │    │
│         │    │         # ── Mapper Layer (MapStruct) ──
│         │    │         mapper/
│         │    │         └──  ResumeMapper.java               # Entity <> DTO mapping
│         │    │
│         │    │         # ── Exception Handling ──
│         │    │         exception/
│         │    │         ├──  GlobalExceptionHandler.java
│         │    │         ├──  ResourceNotFoundException.java
│         │    │         └──  ErrorResponse.java
│         │    │
│         │    │         # ── Enums ──
│         │    │         enums/
│         │    │         ├──  TemplateType.java    # MODERN, MINIMAL, CORPORATE, CREATIVE
│         │    │         ├──  ProficiencyLevel.java  # BEGINNER to EXPERT
│         │    │         └──  ResumeStatus.java     # DRAFT, READY, ARCHIVED
│         │    │
│         │    └──  resources/
│         │         ├──  application.yml              # Main configuration
│         │         ├──  application-dev.yml          # Development profile
│         │         ├──  application-prod.yml         # Production profile
│         │         └──  db/migration/
│         │              ├──  V1__Initial_Schema.sql  # Schema creation
│         │              └──  V2__Seed_Data.sql       # Sample data
│         │
│         └──  test/
│              └──  java/com/ai/resume/
│                   ├──  AiResumeBuilderApplicationTests.java
│                   └──  controller/
│                        └──  ResumeControllerTest.java
│
│
├──  frontend/                    # React + Vite Application
│    ├──  package.json              # NPM dependencies
│    ├──  package-lock.json         # Lock file
│    ├──  tsconfig.json             # TypeScript configuration
│    ├──  tsconfig.node.json        # Node-specific TS config
│    ├──  vite.config.ts            # Vite build configuration
│    ├──  tailwind.config.ts        # Tailwind CSS configuration
│    ├──  postcss.config.js         # PostCSS plugins
│    ├──  index.html               # HTML entry point
│    ├──  Dockerfile                # Multi-stage build
│    ├──  .dockerignore             # Docker ignore rules
│    │
│    └──  src/
│         ├──  main.tsx              # React entry (React Query, Router)
│         ├──  App.tsx               # Router configuration
│         ├──  index.css             # Global styles (Tailwind)
│         │
│         ├──  types/
│         │    └──  index.ts         # TypeScript interfaces & enums
│         │
│         ├──  services/
│         │    ├──  api.ts           # Axios instance & interceptors
│         │    └──  resumeService.ts # API service functions
│         │
│         ├──  store/
│         │    ├──  useResumeStore.ts  # Resume state (Zustand)
│         │    └──  useUiStore.ts      # UI state (Zustand)
│         │
│         ├──  pages/
│         │    ├──  Dashboard.tsx       # Resume list + statistics
│         │    ├──  ResumeBuilder.tsx   # Multi-step builder
│         │    ├──  ResumePreview.tsx  # Live preview + export
│         │    ├──  Templates.tsx       # Template selector
│         │    └──  AIAssistant.tsx     # AI tools page
│         │
│         ├──  components/
│         │    ├──  layout/
│         │    │    ├──  Layout.tsx     # Main app layout
│         │    │    └──  Sidebar.tsx    # Navigation sidebar
│         │    │
│         │    ├──  resume-builder/
│         │    │    ├──  PersonalDetailsForm.tsx
│         │    │    ├──  ProfessionalSummaryForm.tsx
│         │    │    ├──  ExperienceForm.tsx
│         │    │    ├──  EducationForm.tsx
│         │    │    └──  SkillsForm.tsx
│         │    │
│         │    ├──  resume-preview/
│         │    │    └──  (Preview components)
│         │    │
│         │    └──  templates/
│         │         ├──  ModernTemplate.tsx     # Modern resume template
│         │         ├──  MinimalTemplate.tsx     # Minimal resume template
│         │         ├──  CorporateTemplate.tsx   # Corporate resume template
│         │         └──  CreativeTemplate.tsx    # Creative resume template
│         │
│         └──  hooks/
│              └──  (Custom React hooks)
│
│
└──  nginx/                        # Nginx Reverse Proxy
     ├──  Dockerfile                # Nginx image
     └──  nginx.conf               # Proxy configuration
```

---

## Configuration

### Application Properties

#### Development (`application-dev.yml`)
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:ai-resume-dev;DB_CLOSE_DELAY=-1
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        web-allow-others: true
  flyway:
    enabled: false
```

#### Production (`application-prod.yml`)
```yaml
spring:
  datasource:
    url: jdbc:h2:file:./data/ai-resume-db;DB_CLOSE_ON_EXIT=FALSE;DB_CLOSE_DELAY=-1;AUTO_SERVER=TRUE
    username: sa
    password: password
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        web-allow-others: true
  flyway:
    enabled: true
```

---

## Development

### Prerequisites
- JDK 21 (Eclipse Temurin recommended)
- Node.js 20+ (NVM recommended)
- Maven 3.9+ or `./mvnw`
- Docker & Docker Compose

### Backend Development

```bash
cd backend

# Compile
./mvnw clean compile

# Run with dev profile
./mvnw spring-boot:run -Dspring.profiles.active=dev

# Build JAR
./mvnw clean package -DskipTests
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style
- **Backend**: Standard Java conventions, Lombok for boilerplate
- **Frontend**: Prettier + ESLint (optional setup)
- **Spacing**: 4-space indentation

---

## Testing

### Backend Testing

```bash
cd backend

# Run all tests
./mvnw test

# Code coverage (JaCoCo)
./mvnw jacoco:report
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm run test

# Run with UI
npm run test:ui
```

---

## Deployment

### Production with Docker

```bash
# Start in detached mode
docker compose up -d --build

# View logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
```

### Manual Deployment Steps

1. **Build Backend**
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/ai-resume-builder-1.0.0.jar --spring.profiles.active=prod
```

2. **Build Frontend**
```bash
cd frontend
npm install
npm run build
# Serve dist/ via Nginx
```

3. **Configure Nginx**
- Proxy `/api/*` to backend
- Serve static files from `frontend/dist`

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## FAQ

### Is my data safe?
Yes! All data is stored locally in an H2 file. No external servers, no cloud storage, no tracking.

### Can I use this for commercial purposes?
Yes, the project is licensed under MIT. Feel free to use it for personal or commercial projects.

### Does it work offline?
Not currently. The frontend requires the backend API. Offline-first architecture is on the roadmap.

### How do I backup my resumes?
The H2 database file is located at `backend/data/ai-resume-db.mv.db`. Copy this file to backup your resumes.

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Keywords for SEO

Resume builder, CV generator, AI resume builder, free resume builder, online resume maker,
ATS-friendly resume, professional resume templates, no-signup resume builder, open-source
resume builder, Java resume builder, React resume builder, Spring Boot resume application.

## Contact

For questions, issues, or contributions, please open an issue on GitHub.

---

**Built with love by the AI Resume Builder team.**
