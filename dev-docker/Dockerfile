FROM node:10.15-alpine

RUN apk update && \
    apk add supervisor bash tini && \
    addgroup -S app && \
    adduser -S -g app app

WORKDIR /app
USER app

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bash", "run"]
