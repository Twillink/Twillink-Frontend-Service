# Refference https://github.com/vercel/next.js/discussions/13427#discussioncomment-19129
# Build phase
FROM node:latest AS builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tailwind.config.ts .

# Will use cache unless any of the above files have changed
RUN yarn install

# Copy the source code to be built
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# executes `next build`
RUN yarn run build 

# Run phase
FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .

RUN yarn install --production

# Copy over the public folder
COPY --from=builder /app/public ./public


# Get the build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV=production

CMD ["node", "server.js"]