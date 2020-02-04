FROM node:12 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
#RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
RUN sed 's/80/8080/g' -i /etc/nginx/sites-available/*
EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;"]