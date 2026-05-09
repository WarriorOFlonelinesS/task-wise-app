#!/bin/bash

echo "🚀 Starting simple deployment..."

# Installa dipendenze
composer install --no-dev --optimize-autoloader

# Genera chiave
php artisan key:generate

# Esegui migrazioni
echo "🗄️ Running migrations..."
php artisan migrate --force

# Cache per produzione
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Simple deployment completed!" 