# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build-stage
WORKDIR /graph-analytica
ADD frontend/package.json frontend/package-lock.json* ./
RUN npm install

ADD frontend/ ./
RUN npm run build -- --prod --no-progress

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM python:3.6-alpine

# RUN apk update
# RUN apk add openrc nginx supervisor


FROM continuumio/miniconda3
RUN mkdir /graph-analytica
WORKDIR /graph-analytica
ADD environment.yml ./
RUN conda env create -f environment.yml
#RUN conda create -n env python=3.6
RUN echo "source activate graphanalytica" > ~/.bashrc
##RUN conda config --add channels conda-forge
# RUN conda install python=3.6 --yes
# RUN conda install --yes --file environment.yml


ENV PATH /opt/conda/envs/graphanalytica/bin:$PATH
ENV PYTHONUNBUFFERED 1

RUN python -V
RUN pip -V

#RUN pip install -r requirements.txt

ADD core/ ./core
ADD graphanalytica/ ./graphanalytica
ADD manage.py ./
COPY --from=build-stage /graph-analytica/dist/ ./static

# COPY gunicorn.conf /etc/supervisor/conf.d/
# RUN mkdir -p /run/nginx
# ADD nginx.conf /etc/
EXPOSE 80
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:80"]
# CMD ["nginx", "-g", "daemon off;"]
#RUN service supervisord restart
#RUN service ngnix restart
# RUN rc-service nginx start
# RUN rc-service supervisord start
