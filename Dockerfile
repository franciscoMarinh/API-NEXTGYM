FROM node:alpine

WORKDIR /usr/app/
RUN npm install pm2 -g
COPY package.json .
RUN npm install --production
COPY ./dist ./src
COPY ormconfig.js .
COPY ecosystem.config.js .
EXPOSE 3000 9229 5432 ${PORT}

CMD ["npm", "start"]