FROM alpine:latest

RUN apk add --no-cache bash

WORKDIR /app

COPY ./first.sh .

RUN chmod +x first.sh

CMD ["bash", "./first.sh"]

