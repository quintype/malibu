FROM node:10.15-alpine

RUN apk update && \
    apk add bash tini && \
    addgroup -S app && \
    adduser -S -g app app

RUN mkdir -p /app/node_modules && chown app:app /app/node_modules

WORKDIR /app
USER app

VOLUME ["/app/node_modules"]

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["bash"]
