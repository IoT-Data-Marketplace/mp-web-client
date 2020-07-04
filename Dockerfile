FROM node:lts-alpine3.11 as imageBuilder
LABEL author="danijel.fon@gmail.com"
WORKDIR '/app'
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.18.0-alpine
COPY --from=imageBuilder /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8040
ENTRYPOINT ["nginx","-g","daemon off;"]
