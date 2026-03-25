FROM node:20-alpine

WORKDIR /app
RUN corepack enable

COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY prisma ./prisma
COPY public ./public
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY next.config.ts ./next.config.ts
COPY next-env.d.ts ./next-env.d.ts
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.ts ./tailwind.config.ts

RUN pnpm install
RUN pnpm prisma generate
RUN pnpm prisma db push
RUN pnpm build

ENV PORT=3000
EXPOSE 3000

CMD ["pnpm", "start", "--hostname", "0.0.0.0", "--port", "3000"]
