#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; do
  echo "⏳ Waiting for PostgreSQL..."
  sleep 2
done

echo "✅ PostgreSQL is ready"

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan migrate --force

echo "🚀 Starting PHP-FPM..."
exec php-fpm
