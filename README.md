# 🚀 TaskWise AI - Smart Task Management System

<div align="center">

**Take your task management to the next level with AI automation.**

🔗 **Live Demo:** [https://task-wise-ai-app.netlify.app](https://task-wise-ai-app.netlify.app)

![TaskWise Logo](https://img.shields.io/badge/TaskWise-AI%20Powered-blue?style=for-the-badge&logo=openai)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)

**Bringing your tasks to the next level with AI**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Security](#-security) • [API](#-api)

</div>


## ✨ Features

### 🎯 Core

- ✅ User Authentication (Laravel Sanctum)
- ✅ Task CRUD operations
- ✅ Responsive UI (desktop & mobile)
- ✅ Smooth animations & transitions

### 🤖 AI-Powered

- ✅ AI task analysis with Google Gemini
- ✅ Automatic subtask generation
- ✅ Context-aware suggestions

### 🎨 UI/UX

- ✅ Modern design (glassmorphism & gradients)
- ✅ Loading states for AI actions
- ✅ Animated subtask transitions

### 🔒 Security

- ✅ Rate limiting
- ✅ CORS protection
- ✅ Security headers
- ✅ Strong password policy
- ✅ Input validation

---

## 🏟️ Architecture

```
task-wise-app/
├── backend/                 # Laravel 12.x API
│   ├── app/Http/Controllers/
│   ├── app/Services/
│   ├── app/Models/
│   └── app/DTO/
│
├── frontend/                # React 19.x SPA
│   ├── src/components/
│   ├── src/features/
│   └── src/store/
│
├── nginx/                   # Nginx configuration
├── docker-compose.yaml      # Docker multi-service config
```

---

## 🚀 Quick Start

### 🔧 Prerequisites

- Docker & Docker Compose
- Node.js 18+
- Git

### 1. Clone & Setup

```bash
git clone <your-repository-url>
cd task-wise-app
```

### 2. Environment Configuration

```bash
cp docker.env.example .env
nano .env
```

### 3. Start with Docker

```bash
docker compose up -d
docker compose ps
```

### 4. Database Setup

```bash
docker exec -it laravel_app bash
php artisan migrate --seed
docker compose exec app php artisan key:generate
```

### 5. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Database**: localhost:5432
- **Redis**: localhost:6379

---

## 🛠️ Development

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔧 Scripts

### Backend

```bash
# Development server
composer run dev

# Run tests
composer run test

# Format code
composer run format
```

### Frontend

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

---

## 🔧 Configuration

### Backend (.env)

```env
APP_NAME=TaskWise
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=taskwise
DB_USERNAME=taskwise_user
DB_PASSWORD=your_secure_password

REDIS_HOST=redis
REDIS_PORT=6379

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🔐 Security

### Implemented Security Measures

- ✅ **Rate Limiting** – 5 requests/min on auth endpoints
- ✅ **CORS Protection** – Restricted origins only
- ✅ **Security Headers** – X-Frame-Options, CSP, XSS Protection
- ✅ **Input Validation** – Enforced at backend
- ✅ **Password Policy** – Min 8 chars, mixed types
- ✅ **Token Expiry** – 24h token lifetime
- ✅ **Sensitive File Access Denied**

For more details, refer to `SECURITY_CHECKLIST.md`.

---

## 📡 API

### Authentication

```http
POST /api/register
POST /api/login
POST /api/logout
```

### Tasks

```http
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
GET    /api/tasks/filter
```

### AI Endpoint

```http
POST /api/analyze-task
```

---

## 🧪 Testing

### Backend

```bash
cd backend
php artisan test
```

### Frontend

```bash
cd frontend
npm test
```

---

## 🚢 Deployment

### Render.com (Recommended for Hobby Projects)

1. Connect GitHub repository
2. Use `render.yaml`
3. Deploy via UI

See `RENDER_DEPLOYMENT.md` for full guide.

### Docker Production

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Services

- **app** – Laravel API (PHP 8.2)
- **web** – Nginx
- **db** – PostgreSQL 15
- **redis** – Caching & sessions
- **frontend** – React SPA

---

## 📊 Monitoring

### Telescope

Laravel Telescope for debugging:

```
http://localhost:8000/telescope
```

### Logs

```bash
docker compose logs app
docker compose exec app php artisan pail
```

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/your-feature`)
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📝 License

MIT License – see `LICENSE`

---

**Made with ❤️ by the TaskWise Team**

[![GitHub stars](https://img.shields.io/github/stars/your-username/task-wise-app?style=social)](https://github.com/your-username/task-wise-app)
[![GitHub forks](https://img.shields.io/github/forks/your-username/task-wise-app?style=social)](https://github.com/your-username/task-wise-app)

</div>
