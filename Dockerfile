FROM node:8.3.0-alpine

WORKDIR /src
COPY package.json package.json
# COPY package-lock.json package.json
# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag
RUN npm install

COPY . .

CMD ["node", "server.js"]