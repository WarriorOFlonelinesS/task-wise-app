# 🔒 TaskWise Security Setup Guide

## 🚨 IMMEDIATE SECURITY ACTIONS REQUIRED

### 1. Create Secure Environment File

Create a `.env` file in the `backend` directory with the following secure configuration:

```bash
# Application Configuration
APP_NAME="TaskWise"
APP_ENV=production
APP_KEY=base64:your_generated_key_here
APP_DEBUG=false
APP_URL=https://yourdomain.com
APP_TIMEZONE=UTC

# Database Configuration
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=taskwise
DB_USERNAME=secure_user_here
DB_PASSWORD=strong_password_here

# Redis Configuration
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

# Cache and Session Configuration
CACHE_DRIVER=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
SESSION_EXPIRE_ON_CLOSE=true

# Queue Configuration
QUEUE_CONNECTION=redis

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:3000,127.0.0.1:5173
SANCTUM_TOKEN_PREFIX=

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173

# Security Configuration
LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=warning

# Broadcasting Configuration
BROADCAST_DRIVER=log
CACHE_PREFIX=taskwise_

# Telescope Configuration (Development Only)
TELESCOPE_ENABLED=false
```

### 2. Update Database Credentials

Update `docker-compose.yaml` with secure credentials:

```yaml
db:
  image: postgres:15
  container_name: postgres_db
  environment:
    POSTGRES_DB: taskwise
    POSTGRES_USER: secure_user_here
    POSTGRES_PASSWORD: strong_password_here
  volumes:
    - pgdata:/var/lib/postgresql/data
  networks:
    - app-network
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U secure_user_here -d taskwise"]
    interval: 5s
    timeout: 5s
    retries: 5
  restart: unless-stopped
```

### 3. Generate Application Key

```bash
cd backend
php artisan key:generate
```

### 4. Configure HTTPS

Update nginx configuration for HTTPS:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self';" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Root directory
    root /var/www/public;
    index index.php index.html index.htm;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_read_timeout 600s;
    }

    # Deny access to sensitive files
    location ~ /\.ht {
        deny all;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    location ~* \.(env|log|sql|bak|old|tmp)$ {
        deny all;
    }

    location ~* \.(ini|conf|config)$ {
        deny all;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### 5. Security Commands to Run

```bash
# Navigate to backend directory
cd backend

# Generate application key
php artisan key:generate

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Run migrations
php artisan migrate

# Set proper permissions
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/

# Test security headers
curl -I https://yourdomain.com/api/ping
```

## 🔧 SECURITY MONITORING SETUP

### 1. Log Security Events

Add to your application logging:

```php
// In your controllers or middleware
Log::channel('security')->info('Failed login attempt', [
    'email' => $email,
    'ip' => request()->ip(),
    'user_agent' => request()->userAgent(),
]);
```

### 2. Monitor Failed Login Attempts

Create a security monitoring service:

```php
// app/Services/SecurityMonitoringService.php
class SecurityMonitoringService
{
    public function logFailedLogin($email, $ip)
    {
        $attempts = Cache::get("failed_login_{$ip}", 0);
        Cache::put("failed_login_{$ip}", $attempts + 1, 300); // 5 minutes
        
        if ($attempts >= 5) {
            Log::channel('security')->warning('Multiple failed login attempts', [
                'ip' => $ip,
                'attempts' => $attempts
            ]);
        }
    }
}
```

### 3. Set Up Alerts

Configure your monitoring system to alert on:
- Multiple failed login attempts
- Unusual API usage patterns
- Server errors
- Database connection issues

## 📊 SECURITY CHECKLIST

### ✅ Completed Security Measures

- [x] CORS configuration secured
- [x] Password policy strengthened
- [x] Rate limiting implemented
- [x] Token expiration set
- [x] Security headers added
- [x] File access protection configured
- [x] Input validation improved

### 🔴 Critical Actions Required

- [ ] Create secure `.env` file
- [ ] Update database credentials
- [ ] Configure HTTPS
- [ ] Disable debug mode in production
- [ ] Set up security monitoring
- [ ] Implement additional input sanitization

### 🟡 Medium Priority

- [ ] Configure secure session settings
- [ ] Add API security measures
- [ ] Improve error handling
- [ ] Set up automated security testing

### 🟢 Low Priority

- [ ] Implement two-factor authentication
- [ ] Add account lockout features
- [ ] Implement password history
- [ ] Add security questions

## 🚨 EMERGENCY PROCEDURES

### If Security Breach is Detected:

1. **Immediate Actions**:
   - Disable affected features
   - Change all passwords
   - Rotate API keys
   - Check logs for suspicious activity

2. **Assessment**:
   - Determine scope of breach
   - Identify affected users
   - Assess data exposure

3. **Recovery**:
   - Fix vulnerabilities
   - Restore from secure backup
   - Notify affected users
   - Document incident

4. **Prevention**:
   - Implement additional security measures
   - Review security procedures
   - Update security policies

## 📞 SECURITY CONTACTS

- **Security Team**: security@yourdomain.com
- **Emergency Contact**: +1-XXX-XXX-XXXX
- **Incident Response**: incident@yourdomain.com

---

**Remember**: Security is an ongoing process, not a one-time setup. Regular reviews and updates are essential. 