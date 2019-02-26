FROM node:8.10.0
MAINTAINER Jayagopal Govindaraj <jayagopal.govindaraj@heaerieglobalsolutions.com>
ADD . /app
WORKDIR /app
RUN mkdir /config/
RUN npm install
RUN apt-get update
RUN apt-get install -y vim
EXPOSE 5000
ENTRYPOINT ["node"]
CMD ["app.js", "5000"]
