FROM node:18.15.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY . .

USER node

CMD ["yarn", "start:prod"]
