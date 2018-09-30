# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build-stage
WORKDIR /graph-analytica
ADD frontend/package.json frontend/package-lock.json* ./
RUN npm install

ADD frontend/ ./
RUN npm run build-prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM python:3.6-alpine

# RUN apk update
# RUN apk add openrc nginx supervisor
FROM python:3.6-slim-stretch

RUN python -V
RUN pip -V
RUN apt-get update
RUN apt-get install nginx supervisor -y
ADD requirements.txt ./
#RUN conda config --add channels conda-forge
#RUN conda install --yes --file requirements.txt
# RUN python -V
# RUN pip -V
RUN pip install -r requirements.txt

ADD core/ /var/www/graphanalytica/core
ADD graphanalytica/ /var/www/graphanalytica/graphanalytica
# COPY --from=build-stage /graph-analytica/dist/ /var/www/graphanalytica/

# COPY gunicorn.conf /etc/supervisor/conf.d/
# RUN mkdir -p /run/nginx
# ADD nginx.conf /etc/
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]  
#RUN service supervisord restart
#RUN service ngnix restart
# RUN rc-service nginx start
# RUN rc-service supervisord start
