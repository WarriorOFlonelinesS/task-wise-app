FROM node:20-alpine

WORKDIR /app

# Копируем только файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]