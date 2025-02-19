FROM php:8.2-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install mysqli pdo pdo_mysql zip

# && docker-php-ext-install pdo_mysql zip

# Habilitar el módulo de Apache para reescribir URLs
RUN a2enmod rewrite

# Copiar el código del backend al contenedor
COPY . /var/www/html/

# Establecer permisos correctos
RUN chmod -R 755 /var/www/html/api

# Instalar dependencias de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-dev --optimize-autoloader

# Configurar Apache para servir desde /var/www/html/api
RUN echo "<VirtualHost *:80>\n\
    ServerName localhost\n\
    DocumentRoot /var/www/html\n\
    <Directory /var/www/html/api>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>\n\
    ErrorLog \${APACHE_LOG_DIR}/error.log\n\
    CustomLog \${APACHE_LOG_DIR}/access.log combined\n\
    </VirtualHost>" > /etc/apache2/sites-available/000-default.conf

# Exponer el puerto 80
EXPOSE 80