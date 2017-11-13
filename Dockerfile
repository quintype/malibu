FROM node:8.9-alpine AS build

MAINTAINER Quintype Developers <dev-core@quintype.com>

RUN apk update && \
    apk add git

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN npm install -g yarn && \
    yarn install --cache-folder /app/yarn-cache

ENV NODE_ENV production
COPY . /app
RUN git log -n1 --pretty="Commit Date: %aD%nBuild Date: `date --rfc-2822`%n%h %an%n%s%n" > public/round-table.txt && \
    yarn run compile && \
    rm -rf .node-modules && \
    yarn install --production --cache-folder /app/yarn-cache && \
    rm -rf /app/yarn-cache

FROM node:8.9-alpine

MAINTAINER Quintype Developers <dev-core@quintype.com>

RUN apk update && \
    apk add curl tini && \
    addgroup -S app && \
    adduser -S -g app app

ENV NODE_ENV production
COPY --from=build /app /app
RUN chown -R app:app /app

USER app
WORKDIR /app

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "start.js"]
