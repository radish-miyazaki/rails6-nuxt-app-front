FROM node:14.4.0-alpine

ARG WORKDIR
ARG CONTAINER_PORT
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL} \
    NPM_CONFIG_PRODUCTION=false

# ENV check
RUN echo ${HOME}
RUN echo ${CONTAINER_PORT}
RUN echo ${API_URL}

WORKDIR ${HOME}

COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    apk add --no-cache make gcc g++ python && \
    yarn install

COPY . .

RUN yarn run generate

EXPOSE ${CONTAINER_PORT}
