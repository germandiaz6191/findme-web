FROM nginx:1.19.6-alpine as RUN
RUN ls
COPY src/dist  /usr/share/nginx/html
RUN ls
COPY nginx.conf /etc/nginx/nginx.conf
RUN ls
COPY security-headers.conf /etc/nginx/security-headers.conf\
