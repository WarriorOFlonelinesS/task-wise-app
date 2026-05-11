FROM node:18-alpine

WORKDIR /app

# Копируем файлы манифестов
COPY package*.json ./

# Используем обычный install вместо ci, если lock-файл капризничает,
# и УБИРАЕМ --only=production, иначе не сможем запустить 'npm run build'
RUN npm install

# Копируем остальной код
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем легкий сервер
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]