FROM node:erbium as builder

ARG configuration

WORKDIR /app

COPY . .

RUN npm ci
RUN npm rebuild node-sass
RUN npm run build -- -c $configuration

FROM nginx:alpine
WORKDIR /app
RUN apk add libxml2-utils
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build_env env.template.js .en? ./
EXPOSE 80

CMD ./build_env /usr/share/nginx/html && nginx -g 'daemon off;'
