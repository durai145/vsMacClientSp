FROM node:v8.10.0
MAINTAINER Jayagopal Govindaraj <jayagopal.govindaraj@heaerieglobalsolutions.com>
ADD . /app
WORKDIR /app
RUN mkdir /config/
RUN npm install
RUN apt-get update
RUN apt-get install -y vim
RUN chmod 777 /app/start.sh
EXPOSE 5000
CMD ["/app/start.sh"]
