FROM mhart/alpine-node:10
WORKDIR /usr/src/app

COPY ./ ./
RUN npm install
RUN npm run ci

EXPOSE 8080
CMD ["node", "."]
