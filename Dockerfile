FROM node:18-slim

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g next
EXPOSE 3000
CMD ["npm", "run", "dev"]