FROM node:lts-alpine as build

WORKDIR /app

COPY tsconfig.json .

COPY package.json .

RUN npm install

COPY src ./src

COPY prisma ./prisma

RUN npx prisma generate

RUN npm run build


FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/build ./build

COPY package.json .

CMD ["npm", "run", "start"]


