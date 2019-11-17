FROM mhart/alpine-node:10
WORKDIR /server
COPY ./ /server
RUN ls
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/app.js"]
