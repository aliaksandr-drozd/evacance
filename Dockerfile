FROM node:17

ENV PORT=3000
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "serve.js"]
