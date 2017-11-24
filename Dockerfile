FROM node:8.9-alpine AS build

RUN apk update && \
    apk add git

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install --cache-folder /app/yarn-cache
ENV NODE_ENV production

# Everything above should be cached by docker. The below should run on every build

COPY . /app/
RUN git log -n1 --pretty="Commit Date: %aD%nBuild Date: `date --rfc-2822`%n%h %an%n%s%n" > public/round-table.txt && \
    yarn run compile && \
    rm -rf node-modules && \
    yarn install --ignore-optionals --production --cache-folder /app/yarn-cache && \
    rm -rf /app/yarn-cache /app/.git

FROM node:8.9-alpine
MAINTAINER Quintype Developers <dev-core@quintype.com>

RUN apk update && \
    apk add curl tini && \
    addgroup -S app && \
    adduser -S -g app app

ENV NODE_ENV production
WORKDIR /app

# Everything above should be cached by docker. The below should run on every build
COPY --from=build /app /app
RUN chown -R app:app /app
USER app

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "start.js"]
