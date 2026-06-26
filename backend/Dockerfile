FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

#workaround for dts cert issues
RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "npx", "tsx", "src/app.ts"]