FROM node:21 as frontend-builder

WORKDIR /app

COPY packag*.json ./

RUN npm install --force

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=frontend-builder /app .

COPY .env .env.local

EXPOSE 5173:5173

CMD ["npm","run","dev","--","--host"]