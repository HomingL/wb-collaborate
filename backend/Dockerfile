FROM node:14
WORKDIR /var/opt
COPY . .
# replace with configs in docker
COPY ./ormconfig.docker.json ./ormconfig.json
RUN npm install
RUN npm run build
