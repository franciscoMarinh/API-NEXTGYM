FROM node:alpine

WORKDIR /usr/app/
COPY package.json .
RUN npm install --production
COPY ./dist ./dist
COPY .env .
COPY ormconfig.js .
EXPOSE 3000 9229 5432 ${PORT}
CMD [ "npm", "start" ]