# Step 1: Build the app
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY scripts ./scripts
COPY hardhat.config.ts ./
COPY tsconfig.json ./

RUN npm install
ARG DATABASE_URL=""
ENV DATABASE_URL=$DATABASE_URL
RUN npm run prisma:migrate:prod


RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npx hardhat compile

# Copy the entire project
COPY . .

# Build the Next.js app (Next.js handles TypeScript including next.config.ts)
RUN npm run build

# Step 2: Run the app
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/artifacts ./artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# If your app relies on `next.config.ts`, Next.js has already transpiled it during the build.
# We don't need to run `ts-node` in production.

EXPOSE 3000

CMD ["npm", "start"]