# Build stage
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare yarn@4.13.0 --activate
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable
COPY . .
RUN yarn build

# Production stage
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare yarn@4.13.0 --activate
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
# Install all dependencies required to run the waku production CLI
RUN yarn install --immutable
COPY --from=builder /app/dist ./dist

# Create storage directory for SQLite databases
RUN mkdir -p /data && chown -R node:node /data
VOLUME /data

EXPOSE 8080
ENV PORT=8080
ENV DATABASE_URL=/data/healthsync.db

USER node
CMD ["yarn", "start"]
