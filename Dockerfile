# ------------------------------
# Develop stage
# ------------------------------
FROM node:alpine as develop-stage

RUN apk update

# Create app directory
USER root
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install && npm audit fix --force

# Copy project files into the docker image
COPY . .

# ------------------------------
# Build stage
# ------------------------------
FROM develop-stage as build-stage
ARG configuration=production
ARG server_name=172.17.0.1

# server_name (docker ip) is not the same in linux and windows env (if you are using project recommendations)
RUN sh -c 'sed -i "s/172.17.0.1/$(echo ${server_name})/g" /app/src/environments/environment.local.ts'

RUN npm run build -- --output-path=./dist/out --configuration=$configuration

# ------------------------------
# Prod stage
# ------------------------------
FROM nginx:1.18-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=develop-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/out/ /app/

RUN chmod -R 777 /app/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
