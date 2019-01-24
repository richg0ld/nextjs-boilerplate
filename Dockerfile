FROM node:8

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["yarn", "prod"]
