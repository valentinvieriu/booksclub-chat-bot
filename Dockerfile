FROM node:alpine

WORKDIR /src
ADD package.json package.json
# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag
RUN npm install

ADD server.js server.js

CMD ["node", "server.js"]