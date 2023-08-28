FROM node:20.5.1 as builder
WORKDIR /app
COPY package* .
RUN npm i
COPY . .
RUN rm .env*
RUN echo "VITE_API_URL=THIS_IS_THE_API_URL_WILL_BE_REPACED_HIRE" > .env
RUN npm run build

FROM nginx:1.25.2
WORKDIR /app
COPY docker-entry.sh .
COPY default.conf /etc/nginx/conf.d/
RUN chmod +x docker-entry.sh
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /app/dist/ /usr/share/nginx/html
CMD ["./docker-entry.sh"]
