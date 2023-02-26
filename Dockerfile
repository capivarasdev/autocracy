FROM node:19-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# -----------------------------------------------------------------------------

FROM node:19-alpine AS final

RUN mkdir -p /app/dist
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --prod
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config

EXPOSE 8080

ENTRYPOINT ["node", "./dist/index.js"]