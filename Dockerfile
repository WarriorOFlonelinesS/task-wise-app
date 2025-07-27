FROM php:8.2-fpm-alpine

# Use a faster Alpine mirror for faster package downloads
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# Install dependencies for PHP extensions
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

# Configure GD and install PHP extensions
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

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files and install dependencies
COPY ./backend/composer.* ./
RUN composer install --prefer-dist --no-dev --no-scripts --no-interaction

# Copy the rest of the application code
COPY ./backend ./

# Optimize autoload
RUN composer dump-autoload --optimize

CMD ["php-fpm"]
