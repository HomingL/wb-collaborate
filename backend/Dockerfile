FROM node:14
WORKDIR /var/opt
COPY . .
COPY ./ormconfig.production.json ./ormconfig.json
RUN npm install
RUN npm run build
