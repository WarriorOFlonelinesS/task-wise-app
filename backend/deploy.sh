#!/bin/bash

# Script di deploy per Render.com
echo "🚀 Starting deployment..."

# Installa le dipendenze
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

# Genera la chiave dell'applicazione
echo "🔑 Generating application key..."
php artisan key:generate

# Esegui le migrazioni
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Pulisci e ricrea le cache
echo "🧹 Clearing and rebuilding caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Ricrea le cache per la produzione
echo "⚡ Building production caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Imposta i permessi
echo "🔒 Setting permissions..."
chmod -R 755 storage
chmod -R 755 bootstrap/cache

echo "✅ Deployment completed successfully!" 