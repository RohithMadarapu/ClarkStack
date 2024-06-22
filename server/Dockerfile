FROM node:21 as backend-builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=backend-builder /app .

COPY .env .env.local

EXPOSE 8000:8000

CMD ["npm","run","dev"]