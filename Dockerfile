FROM node:18.20.2-alpine

RUN apk add --no-cache openssl

EXPOSE 3000

WORKDIR /aveonline_connect_shopify

ENV NODE_ENV=production

COPY package.json package-lock.json* ./

RUN mkdir -p prisma && : > prisma/dev.sqlite

RUN npm install
# Remove CLI packages since we don't need them in production by default.
# Remove this line if you want to run CLI commands in your container.
# RUN npm remove @shopify/cli

COPY . .

RUN npm run build

CMD ["npm", "run", "docker-start"]
