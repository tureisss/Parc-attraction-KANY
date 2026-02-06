FROM node:20-alpine

ARG MY_UID
ARG MY_GID

RUN apk add chromium gettext shadow

RUN deluser node
RUN if [ "$MY_GID" = "0" ] || [ "$MY_GID" = "1" ]; then export MY_GID=1001; fi; \
	if [ "$MY_UID" = "0" ] || [ "$MY_UID" = "1" ]; then export MY_UID=1001; fi; \
	groupadd -g $MY_GID customgroup && useradd -l -u "$MY_UID" -g "$MY_GID" node

RUN chown -R "$MY_UID:$MY_GID" /home/node

WORKDIR /home/node/app

