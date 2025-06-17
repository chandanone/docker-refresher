FROM node:22-alpine

WORKDIR /app

COPY ./package* ./

RUN npm install --omit=dev

COPY . .

CMD ["node", "index.js"]