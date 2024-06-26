# Stage 1: Backend Builder
FROM node:21 as backend-builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

# Add --trace-deprecation to node command
CMD ["node", "--trace-deprecation", "index.js"]

# Stage 2: Final Node Alpine Image
FROM node:alpine

WORKDIR /app

COPY --from=backend-builder /app .

COPY .env .env.local

EXPOSE 8000

CMD ["npm", "run", "dev"]