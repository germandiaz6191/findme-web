FROM nginx:1.19.6-alpine as RUN
COPY _#{Build.Repository.Name}#/Artifact-#{Build.Repository.Name}#  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY security-headers.conf /etc/nginx/security-headers.conf\
