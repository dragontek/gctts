FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV GOOGLE_APPLICATION_CREDENTIALS=/root/.config/gcloud.json

CMD ["npm", "start"]