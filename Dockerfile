FROM nginx:1.19.6-alpine as RUN
COPY src/dist  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY security-headers.conf /etc/nginx/security-headers.conf\
