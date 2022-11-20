FROM node:lts-alpine as build

RUN apk add --no-cache bash

# USER node

WORKDIR /home/node/app

# CMD [ "/home/node/app/.docker/entrypoint.sh" ]
# CMD [ "tail", "-f", "/dev/null" ]


