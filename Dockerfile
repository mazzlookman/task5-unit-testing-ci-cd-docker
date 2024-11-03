FROM node:20-alpine

WORKDIR /books-management

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.example .env

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]