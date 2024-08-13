FROM node:20-alpine
WORKDIR /app
COPY src /src/
COPY package.json /
RUN yarn
EXPOSE 1998
ENTRYPOINT yarn start