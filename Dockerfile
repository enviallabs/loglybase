FROM node:latest

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "start" ]