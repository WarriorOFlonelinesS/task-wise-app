# 🚀 Render.com Deployment Guide

## 📋 Prerequisites

- Render.com account
- GitHub repository connected
- Domain (optional)

## 🏗️ Render Setup

### 1. Create New Web Service

1. **Login to Render Dashboard**
2. **Click "New +"**
3. **Select "Web Service"**
4. **Connect your GitHub repository**

### 2. Configure Backend Service

#### Service Configuration
```
Name: taskwise-backend
Environment: Docker
Region: Frankfurt (EU) or closest to your users
Branch: main
Root Directory: backend
```

#### Environment Variables
```env
APP_NAME=TaskWise
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-backend-service.onrender.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=pgsql
DB_HOST=your-postgres-service.internal
DB_PORT=5432
DB_DATABASE=taskwise_production
DB_USERNAME=taskwise_user
DB_PASSWORD=your_secure_password

REDIS_HOST=your-redis-service.internal
REDIS_PASSWORD=null
REDIS_PORT=6379

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

# Google Gemini AI
GEMINI_API_KEY=your_production_gemini_api_key

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"
```

#### Build Command
```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Start Command
```bash
php artisan serve --host 0.0.0.0 --port $PORT
```

## 🗄️ Database Setup

### 1. Create PostgreSQL Service

1. **Click "New +"**
2. **Select "PostgreSQL"**
3. **Configure:**
   ```
   Name: taskwise-database
   Database: taskwise_production
   User: taskwise_user
   Version: 15
   ```

### 2. Connect Database to Backend

1. **Go to your backend service**
2. **Click "Environment"**
3. **Add these variables:**
   ```env
   DB_HOST=your-postgres-service.internal
   DB_DATABASE=taskwise_production
   DB_USERNAME=taskwise_user
   DB_PASSWORD=your_postgres_password
   ```

## 🔄 Redis Setup

### 1. Create Redis Service

1. **Click "New +"**
2. **Select "Redis"**
3. **Configure:**
   ```
   Name: taskwise-redis
   Version: 7
   ```

### 2. Connect Redis to Backend

1. **Go to your backend service**
2. **Click "Environment"**
3. **Add these variables:**
   ```env
   REDIS_HOST=your-redis-service.internal
   REDIS_PORT=6379
   ```

## 🌐 Frontend Setup

### 1. Create Static Site

1. **Click "New +"**
2. **Select "Static Site"**
3. **Configure:**
   ```
   Name: taskwise-frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

### 2. Environment Variables
```env
VITE_API_URL=https://your-backend-service.onrender.com/api
VITE_APP_ENV=production
```

## 📁 Project Structure for Render

### 1. Backend Directory Structure
```
backend/
├── Dockerfile
├── composer.json
├── .env.example
├── artisan
├── app/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
└── vendor/
```

### 2. Frontend Directory Structure
```
frontend/
├── Dockerfile
├── package.json
├── vite.config.js
├── public/
├── src/
└── dist/
```

## 🐳 Docker Configuration

### 1. Backend Dockerfile
```dockerfile
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www/storage
RUN chmod -R 755 /var/www/bootstrap/cache

# Expose port
EXPOSE 8000

# Start server
CMD php artisan serve --host 0.0.0.0 --port 8000
```

### 2. Frontend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

## 🔧 Environment Configuration

### 1. Backend Environment (.env)
```env
APP_NAME=TaskWise
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-backend-service.onrender.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=pgsql
DB_HOST=your-postgres-service.internal
DB_PORT=5432
DB_DATABASE=taskwise_production
DB_USERNAME=taskwise_user
DB_PASSWORD=your_secure_password

REDIS_HOST=your-redis-service.internal
REDIS_PASSWORD=null
REDIS_PORT=6379

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

# Google Gemini AI
GEMINI_API_KEY=your_production_gemini_api_key

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"
```

### 2. Frontend Environment (.env)
```env
VITE_API_URL=https://your-backend-service.onrender.com/api
VITE_APP_ENV=production
```

## 🚀 Deployment Process

### 1. Initial Setup

#### Backend Service
1. **Connect GitHub repository**
2. **Set root directory to `backend`**
3. **Configure environment variables**
4. **Set build command:**
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```
5. **Set start command:**
   ```bash
   php artisan serve --host 0.0.0.0 --port $PORT
   ```

#### Frontend Service
1. **Connect GitHub repository**
2. **Set root directory to `frontend`**
3. **Configure environment variables**
4. **Set build command:**
   ```bash
   npm install && npm run build
   ```
5. **Set publish directory to `dist`**

### 2. Database Migration

#### Manual Migration
```bash
# SSH into your backend service
# Go to Render dashboard > Backend service > Shell
cd /opt/render/project/src
php artisan migrate --force
```

#### Auto Migration
Add to build command:
```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

## 🔒 Security Configuration

### 1. CORS Configuration
Update `backend/config/cors.php`:
```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowed_origins' => [
        'https://your-frontend-service.onrender.com',
        'https://yourdomain.com',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => [
        'Content-Type',
        'X-Requested-With',
        'Authorization',
        'Accept',
        'Origin',
        'X-CSRF-TOKEN',
    ],
    'exposed_headers' => [],
    'max_age' => 86400,
    'supports_credentials' => true,
];
```

### 2. Security Headers
Update `backend/app/Http/Middleware/SecurityHeaders.php`:
```php
public function handle(Request $request, Closure $next): Response
{
    $response = $next($request);
    
    $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
    $response->headers->set('X-Content-Type-Options', 'nosniff');
    $response->headers->set('X-XSS-Protection', '1; mode=block');
    $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
    $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    $csp = "default-src 'self'; " .
           "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " .
           "style-src 'self' 'unsafe-inline'; " .
           "img-src 'self' data: https:; " .
           "font-src 'self' data:; " .
           "connect-src 'self' https:; " .
           "frame-ancestors 'self';";
    $response->headers->set('Content-Security-Policy', $csp);
    
    return $response;
}
```

## 📊 Monitoring

### 1. Render Logs
- **Backend logs**: Render dashboard > Backend service > Logs
- **Frontend logs**: Render dashboard > Frontend service > Logs
- **Database logs**: Render dashboard > PostgreSQL service > Logs

### 2. Application Health
```bash
# Check backend health
curl https://your-backend-service.onrender.com/api

# Check frontend health
curl https://your-frontend-service.onrender.com
```

## 🔧 Maintenance

### 1. Database Backups
```bash
# Create backup script
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Application Updates
1. **Push changes to GitHub**
2. **Render automatically deploys**
3. **Monitor deployment logs**

### 3. Environment Variables
1. **Go to service dashboard**
2. **Click "Environment"**
3. **Add/update variables**
4. **Redeploy service**

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   # Common issues:
   # - Missing dependencies
   # - Environment variables not set
   # - Database connection issues
   ```

2. **Database Connection**
   ```bash
   # Test database connection
   php artisan tinker
   DB::connection()->getPdo();
   ```

3. **CORS Issues**
   ```bash
   # Check CORS configuration
   # Ensure frontend URL is in allowed origins
   ```

4. **Redis Connection**
   ```bash
   # Test Redis connection
   redis-cli -h your-redis-service.internal ping
   ```

## 📝 Deployment Checklist

- [ ] GitHub repository connected
- [ ] Backend service created
- [ ] Frontend service created
- [ ] PostgreSQL service created
- [ ] Redis service created
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Database migrations run
- [ ] SSL certificates active
- [ ] Health checks passing
- [ ] Monitoring configured

## 💰 Cost Optimization

### Hobby Plan Limits
- **Web Services**: $7/month per service
- **PostgreSQL**: $7/month
- **Redis**: $7/month
- **Static Sites**: Free

### Total Estimated Cost
- Backend: $7/month
- Frontend: Free (static site)
- Database: $7/month
- Redis: $7/month
- **Total: ~$21/month**

## 🎯 Next Steps

1. **Set up custom domain**
2. **Configure email service**
3. **Set up monitoring (UptimeRobot, etc.)**
4. **Configure backups**
5. **Set up CI/CD pipeline**

---

**Your TaskWise application is now deployed on Render! 🚀**

For more information, visit [Render.com](https://dashboard.render.com/select-plan?plan=hobby) 