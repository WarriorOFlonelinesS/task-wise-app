FROM php:8.2-fpm-alpine

# Установка зависимостей для расширений
RUN apk add --no-cache \
    libzip-dev \
    zlib-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    libxslt-dev \
    postgresql-dev \
    build-base \
    bash \
    git \
    linux-headers

# Конфигурация GD и установка PHP-расширений
RUN docker-php-ext-configure gd \
    --with-freetype \
    --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_pgsql \
        mbstring \
        zip \
        bcmath \
        exif \
        pcntl \
        sockets \
        intl \
        gd \
        xml \
        xsl

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Рабочая директория
WORKDIR /var/www

# Копируем composer и устанавливаем зависимости
COPY ./app/composer.* ./
RUN composer install --prefer-dist --no-dev --no-scripts --no-interaction

# Копируем код приложения
COPY . .

# Оптимизация автозагрузки
RUN composer dump-autoload --optimize

CMD ["php-fpm"]
