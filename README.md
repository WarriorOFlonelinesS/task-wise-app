# 🚀 TaskWise AI - Smart Task Management System

<div align="center">

![TaskWise Logo](https://img.shields.io/badge/TaskWise-AI%20Powered-blue?style=for-the-badge&logo=openai)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)

**Bringing your tasks to the next level with AI**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Security](#-security) • [API](#-api)

</div>

---

## ✨ Features

### 🎯 Core Features
- **User Authentication & Authorization** - Secure login/register with Laravel Sanctum
- **Task Management** - Create, edit, delete, and organize tasks
- **AI-Powered Subtask Generation** - Automatically break down tasks using Google Gemini AI
- **Real-time Animations** - Smooth UI transitions and loading states
- **Responsive Design** - Works perfectly on desktop and mobile

### 🤖 AI Features
- **Smart Task Analysis** - AI analyzes your tasks and generates relevant subtasks
- **Intelligent Task Breakdown** - Complex tasks automatically split into manageable steps
- **Context-Aware Suggestions** - AI understands task context and provides relevant subtasks

### 🎨 UI/UX Features
- **Modern Design** - Beautiful gradient backgrounds and glass-morphism effects
- **Smooth Animations** - Staggered animations for subtasks and interactive elements
- **Loading States** - Elegant loading animations during AI processing
- **Hover Effects** - Interactive feedback on all clickable elements

### 🔒 Security Features
- **Rate Limiting** - Protection against brute force attacks
- **CORS Protection** - Secure cross-origin requests
- **Security Headers** - Comprehensive HTTP security headers
- **Input Validation** - Robust validation for all user inputs
- **Password Policy** - Strong password requirements with special characters

## 🏗️ Architecture

```
task-wise-app/
├── backend/                 # Laravel 12.x API
│   ├── app/
│   │   ├── Http/Controllers/  # API Controllers
│   │   ├── Services/          # Business Logic
│   │   ├── Models/            # Eloquent Models
│   │   └── DTO/              # Data Transfer Objects
│   ├── database/             # Migrations & Seeders
│   └── tests/               # PHPUnit Tests
├── frontend/                # React 19.x SPA
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── features/        # Redux Toolkit Slices
│   │   └── store/           # Redux Store
│   └── public/              # Static Assets
├── nginx/                   # Web Server Configuration
└── docker-compose.yaml      # Multi-container Setup
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### 1. Clone & Setup
    ```bash
    git clone <your-repository-url>
cd task-wise-app
    ```

### 2. Environment Configuration
    ```bash
# Copy environment file
cp docker.env.example .env

# Edit .env with your settings
nano .env
    ```

### 3. Start with Docker
    ```bash
# Start all services
docker compose up -d

# Check services
docker compose ps
    ```

### 4. Database Setup
      ```bash
# Run migrations
docker compose exec app php artisan migrate

# Generate application key
docker compose exec app php artisan key:generate
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432
- **Redis**: localhost:6379

## 🛠️ Development

### Local Development Setup

#### Backend (Laravel)
    ```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
    php artisan migrate
php artisan serve
    ```

#### Frontend (React)
    ```bash
cd frontend
npm install
npm run dev
    ```

### Available Scripts

#### Backend
    ```bash
# Development server with all services
composer run dev

# Run tests
composer run test

# Code formatting
composer run format
```

#### Frontend
      ```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
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

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## 🔒 Security

### Implemented Security Measures
- ✅ **Rate Limiting** - 5 requests per minute on auth endpoints
- ✅ **CORS Protection** - Configured for specific origins
- ✅ **Security Headers** - X-Frame-Options, CSP, XSS Protection
- ✅ **Input Validation** - Comprehensive validation rules
- ✅ **Password Policy** - Minimum 8 chars, uppercase, lowercase, number, special char
- ✅ **Token Expiration** - 24-hour token lifetime
- ✅ **File Access Protection** - Denied access to sensitive files

### Security Checklist
See [SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md) for detailed security analysis.

## 📡 API Documentation

### Authentication Endpoints
```http
POST /api/register
POST /api/login
POST /api/logout
```

### Task Endpoints
```http
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{id}
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
GET    /api/tasks/filter
```

### AI Analysis Endpoint
```http
POST /api/analyze-task
```

## 🧪 Testing

### Backend Tests
  ```bash
  cd backend
  php artisan test
  ```

### Frontend Tests
  ```bash
cd frontend
  npm test
```

## 🐳 Deployment Options

### Option 1: Laravel Forge
See [FORGE_DEPLOYMENT.md](FORGE_DEPLOYMENT.md) for detailed Forge deployment guide.

### Option 2: Render.com (Recommended for Hobby Projects)
See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed Render deployment guide.

**Quick Render Setup:**
```bash
# 1. Connect GitHub repository to Render
# 2. Use render.yaml for automatic setup
# 3. Deploy with one click
  ```

### Option 3: Docker Production
```bash
# Use production compose file
docker compose -f docker-compose.prod.yml up -d
```

### Docker Services
- **app**: Laravel API (PHP 8.2)
- **web**: Nginx web server
- **db**: PostgreSQL 15 database
- **redis**: Redis cache/session store
- **frontend**: React SPA

## 📊 Monitoring

### Laravel Telescope
Access Laravel Telescope for debugging and monitoring:
```
http://localhost:8000/telescope
```

### Logs
  ```bash
# View application logs
docker compose logs app

# View real-time logs
docker compose exec app php artisan pail
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [Wiki](../../wiki) for detailed guides
- **Issues**: Report bugs via [GitHub Issues](../../issues)
- **Security**: Report security issues to security@taskwise.com

---

<div align="center">

**Made with ❤️ by the TaskWise Team**

[![GitHub stars](https://img.shields.io/github/stars/your-username/task-wise-app?style=social)](https://github.com/your-username/task-wise-app)
[![GitHub forks](https://img.shields.io/github/forks/your-username/task-wise-app?style=social)](https://github.com/your-username/task-wise-app)

</div>
