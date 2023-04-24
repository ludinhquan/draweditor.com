# Base image
FROM node:18.16.0-alpine AS base

WORKDIR /app

# Install production dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true --silent && \
    yarn cache clean --force

# Build image
FROM base AS build

# Install dev dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent && \
    yarn cache clean --force

# Build application
COPY . .
RUN yarn build

# Runtime image
FROM base AS runtime

COPY --from=build /app/dist /app/dist

RUN yarn generate

CMD ["node", "dist/src/main"]
