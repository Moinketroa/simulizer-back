FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
