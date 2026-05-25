<h1 align="center">🚀 TaskWise AI - Smart Task Management System</h1>
<div align="center">
  
**Take your task management to the next level with AI automation.**

🔗 **Live Demo:** [https://task-wise-ai-app.netlify.app](https://task-wise-ai-app.netlify.app)

- User Registration / Authentication
- Creating, Editing, and Deleting Tasks
- Task Grouping by Projects / Categories
- Task States: In Progress, Completed, Postponed
- Due Dates and Notifications
![TaskWise Logo](https://img.shields.io/badge/TaskWise-AI%20Powered-blue?style=for-the-badge&logo=openai)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)


**Bringing your tasks to the next level with AI**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Security](#-security) • [API](#-api)

</div>

- **Redis:** For caching, session storage, and background job queues.
- **Apache Kafka:** For event-driven task processing, especially if evolving towards a microservice architecture.
- **Docker:** For containerization, ensuring consistent development and deployment environments.
- **TailwindCSS:** For modern and utility-first frontend styling.
- **Laravel Horizon:** For robust monitoring and management of Redis queues.
- **Laravel Passport or Sanctum:** For API authentication, depending on the type of clients (e.g., first-party SPA, mobile apps, third-party consumers).


## ✨ Features

### 🎯 Core


- PHP >= 8.2 (with extensions like pdo_pgsql, redis, etc., as needed)
- Composer
- Node.js and npm (or yarn)
- A database server (e.g., PostgreSQL)
- Redis server
- ✅ User Authentication (Laravel Sanctum)
- ✅ Task CRUD operations
- ✅ Responsive UI (desktop & mobile)
- ✅ Smooth animations & transitions


### 🤖 AI-Powered

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd task-wise
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
3.  **Install PHP dependencies:**
    ```bash
    composer install
    ```
4.  **Create your environment file:**
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - **Important:** If `.env.example` doesn't exist yet in the `backend` directory, you'll need to create it first, or create `.env` directly. It should contain placeholders for all necessary environment variables (APP_NAME, DB_CONNECTION, DB_HOST, REDIS_HOST, etc.).
5.  **Configure your `.env` file:**
    - Set `APP_KEY` (generate one if empty: `php artisan key:generate`)
    - Configure `DB_CONNECTION` to `pgsql` and fill in `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` for your PostgreSQL instance.
    - Configure `REDIS_HOST`, `REDIS_PASSWORD`, and `REDIS_PORT`.
    - Set `CACHE_DRIVER=redis`.
    - Set `SESSION_DRIVER=redis` (optional, for Redis-backed sessions).
    - Set `QUEUE_CONNECTION=redis` (optional, for Redis-backed queues).
    - Configure any other necessary variables (e.g., for Mail, Pusher/Socket.io, OpenAI API, Google Calendar API).
6.  **Run database migrations:**
    ```bash
    php artisan migrate
    ```
7.  **Run database seeders (if any):**
    ```bash
    php artisan db:seed
    ```
8.  **Link storage (if you're using local file uploads):**
    ```bash
    php artisan storage:link
    ```
9.  **Start the development server (and other services):**
    - The `composer.json` includes a `dev` script:
      ```bash
      composer run dev
      ```
    - This typically starts the PHP development server, queue listener, Pail for logs, and the Vite development server for the frontend (if configured in `package.json`).
    - Alternatively, serve with: `php artisan serve`
    - Run queue worker (if using queues): `php artisan queue:work`

- ✅ AI task analysis with Google Gemini
- ✅ Automatic subtask generation
- ✅ Context-aware suggestions


### 🎨 UI/UX

_If the frontend is part of the Laravel project (e.g., using Vite with Blade), these steps would be run from the `backend` directory or project root._

1.  **Navigate to the frontend directory (e.g., `cd ../frontend` or stay in project root if integrated):**
    _(Adjust this path based on your project structure)_
2.  **Install JavaScript dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

- ✅ Modern design (glassmorphism & gradients)
- ✅ Loading states for AI actions
- ✅ Animated subtask transitions

### 🔒 Security
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Security headers
- ✅ Strong password policy
- ✅ Input validation

- **Backend Tests (PHPUnit):**
  ```bash
  cd backend
  php artisan test
  ```
- **Frontend Tests (e.g., Jest, Vitest):**
  _(Commands will vary based on the testing framework used)_
  ```bash
  cd frontend # or project root
  npm test
  # or
  yarn test
  ```
---

## 🏟️ Architecture

- **Backend (PHP):** Adhere to PSR-12. Use Laravel Pint for automatic formatting:
  ```bash
  cd backend
  ./vendor/bin/pint
  ```
- **Frontend (JavaScript/TypeScript):** Follow project-configured ESLint/Prettier rules.

---

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

</div>
