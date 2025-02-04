FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV GOOGLE_APPLICATION_CREDENTIALS=~/.config/gcloud.json

CMD ["npm", "start"]
