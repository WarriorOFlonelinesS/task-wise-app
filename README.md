# TaskWise — A Smart To-Do List for a Productive Life

## Core Requirements

- User Registration / Authentication
- Creating, Editing, and Deleting Tasks
- Task Grouping by Projects / Categories
- Task States: In Progress, Completed, Postponed
- Due Dates and Notifications

## What Makes TaskWise Stand Out (Top 5 Features)

1.  **AI Assistant (e.g., via OpenAI API):** Generate subtasks from a single task.
2.  **Smart Priorities:** Tasks are sorted using an intelligent algorithm (utilizing Redis for caching).
3.  **Real-time Notifications with WebSockets:** Via Laravel Echo + Pusher or a self-hosted Socket.io solution.
4.  **Calendar Synchronization:** Integration with Google Calendar API.
5.  **Productivity Analytics:** Visual charts and metrics (e.g., using React with Chart.js / Recharts on the frontend).

## Optional Technologies to Consider

- **Redis:** For caching, session storage, and background job queues.
- **Apache Kafka:** For event-driven task processing, especially if evolving towards a microservice architecture.
- **Docker:** For containerization, ensuring consistent development and deployment environments.
- **TailwindCSS:** For modern and utility-first frontend styling.
- **Laravel Horizon:** For robust monitoring and management of Redis queues.
- **Laravel Passport or Sanctum:** For API authentication, depending on the type of clients (e.g., first-party SPA, mobile apps, third-party consumers).

## Instructions for Developers

### Prerequisites

- PHP >= 8.2 (with extensions like pdo_pgsql, redis, etc., as needed)
- Composer
- Node.js and npm (or yarn)
- A database server (e.g., PostgreSQL)
- Redis server

### Backend Setup (Laravel)

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

### Frontend Setup (Assuming React/Vite in a separate `frontend` directory or integrated)

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

### Running Tests

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

### Code Style

- **Backend (PHP):** Adhere to PSR-12. Use Laravel Pint for automatic formatting:
  ```bash
  cd backend
  ./vendor/bin/pint
  ```
- **Frontend (JavaScript/TypeScript):** Follow project-configured ESLint/Prettier rules.

---
