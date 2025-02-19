FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del frontend
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 5173
EXPOSE 5173

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]