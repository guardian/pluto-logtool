FROM nginx:1.23.1-alpine

COPY startup.sh /
COPY nginx-server.conf /etc/nginx/conf.d/default.conf
COPY index.template.html /usr/share/nginx/html
ADD images/ /usr/share/nginx/html/images
COPY bundle.js /usr/share/nginx/html
CMD /startup.sh
