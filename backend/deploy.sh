#!/bin/bash

# TaskWise Deployment Script for Laravel Forge
# This script automates the deployment process

set -e

echo "🚀 Starting TaskWise deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "backend/artisan" ]; then
    print_error "Laravel artisan file not found. Are you in the project root?"
    exit 1
fi

print_status "Starting deployment process..."

# 1. Pull latest changes
print_status "Pulling latest changes from repository..."
git pull origin main

# 2. Install backend dependencies
print_status "Installing PHP dependencies..."
cd backend
composer install --no-dev --optimize-autoloader

# 3. Clear Laravel caches
print_status "Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# 4. Run database migrations
print_status "Running database migrations..."
php artisan migrate --force

# 5. Build frontend
print_status "Building frontend assets..."
cd ../frontend
npm install
npm run build
cd ..

# 6. Set proper permissions
print_status "Setting file permissions..."
chmod -R 755 .
chmod -R 775 backend/storage
chmod -R 775 backend/bootstrap/cache

# 7. Restart services
print_status "Restarting services..."
sudo systemctl restart php8.2-fpm
sudo systemctl reload nginx

# 8. Clear Redis cache
print_status "Clearing Redis cache..."
redis-cli flushall

print_status "Deployment completed successfully! 🎉"

# Optional: Check application health
print_status "Checking application health..."
if curl -f http://localhost > /dev/null 2>&1; then
    print_status "Application is responding correctly"
else
    print_warning "Application might not be responding. Check logs for details."
fi

echo ""
print_status "Deployment Summary:"
echo "  ✅ Code updated"
echo "  ✅ Dependencies installed"
echo "  ✅ Caches cleared"
echo "  ✅ Database migrated"
echo "  ✅ Frontend built"
echo "  ✅ Permissions set"
echo "  ✅ Services restarted"
echo ""
print_status "Your TaskWise application is now live! 🚀" 
