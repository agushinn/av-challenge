# Usar una imagen base de PHP 8.1 con Apache
FROM php:8.1-apache

# Instalar dependencias del sistema y extensiones de PHP
RUN apt-get update && apt-get install -y \
    curl \
    libcurl4-openssl-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install \
    pdo_mysql \
    curl \
    mbstring \
    xml \
    zip

# Habilitar el módulo de reescritura de Apache
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar los archivos del proyecto al contenedor
COPY . /var/www/html/

# Cambiar al directorio de trabajo
WORKDIR /var/www/html

# Instalar dependencias de Composer (ignorando el entorno de desarrollo)
RUN composer install --no-dev --optimize-autoloader

# Configurar permisos para Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Apache en primer plano
CMD ["apache2-foreground"]