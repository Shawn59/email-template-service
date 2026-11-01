FROM node:20.12.2 as builder
WORKDIR /usr/src/app
#копируем файлы в директорию выше
COPY . .
RUN npm i

# ВНИМАНИЕ! при сборке докером необходимо указывать аргумент сборки "mode" (пример: docker-compose build --build-arg mode="production")
#mode="production"- собирается как прод =)
#mode="stage" - собирается как прод, но с тестовыми значениями для глобальных переменных.
ARG mode
ENV NODE_ENV $mode

RUN npm run build


FROM nginx:latest
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist .

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]