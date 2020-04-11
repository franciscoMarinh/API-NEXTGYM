FROM node:alpine

WORKDIR /usr/app/
COPY package.json .
RUN npm prune
COPY . .
CMD [ "npm", "start" ]