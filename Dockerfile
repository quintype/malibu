FROM node:8.2-alpine

MAINTAINER Quintype Developers <dev-core@quintype.com>

EXPOSE 3000

RUN apk update && \
    apk add htop git curl && \
    addgroup -S app && \
    adduser -S -g app app

ADD . /app
RUN chown -R app:app /app

USER app
WORKDIR /app

RUN git log -n1 --pretty="Commit Date: %aD%nBuild Date: `date --rfc-2822`%n%h %an%n%s%n" > public/round-table.txt && \
    npm install yarn && \
    ./node_modules/.bin/yarn

ENV NODE_ENV production
RUN npm run compile

ENTRYPOINT ["npm"]
CMD ["start"]
