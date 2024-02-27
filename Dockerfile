#FROM nginx:1.19.6-alpine as RUN
FROM node:alpine
WORKDIR /usr/src/app
copy package*.json ./
RUN npm install -g npm@10.4.0
copy . .
CMD ["npm", "start"]
