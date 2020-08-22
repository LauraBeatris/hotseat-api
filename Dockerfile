FROM node:12.16.0

WORKDIR /home/node/app/

COPY package.json yarn.* ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
