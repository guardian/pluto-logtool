FROM nginx:1.17-alpine

COPY startup.sh /
COPY nginx-server.conf /etc/nginx/conf.d/default.conf
COPY index.template.html /usr/share/nginx/html
COPY bundle.js /usr/share/nginx/html
COPY ../app/dark.css /usr/share/nginx/html
CMD /startup.sh
