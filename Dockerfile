ARG NODE_VERSION=18.15.0

# First step: build image
FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --only=dev

COPY . .

RUN yarn build

# First step: build image
FROM node:${NODE_VERSION} as runtime

WORKDIR /app 

COPY --from=build /app/dist /app

COPY package.json yarn.lock ./

RUN yarn install --production

CMD ["yarn", "start:prod"]
