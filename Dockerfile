FROM php:8.2-fpm-alpine

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


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY ./backend/composer.json ./backend/composer.lock ./
RUN composer install --prefer-dist --no-dev --no-scripts --no-interaction

COPY ./backend/ .

RUN composer dump-autoload --optimize

CMD ["php-fpm"]
