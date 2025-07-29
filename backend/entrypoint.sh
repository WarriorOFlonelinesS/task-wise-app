#!/bin/bash
set -e

echo "📦 Running Laravel setup..."

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan migrate --force

echo "🚀 Starting Laravel server on port 8000..."
exec php -S 0.0.0.0:8000 -t public
