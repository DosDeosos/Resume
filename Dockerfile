FROM public.ecr.aws/docker/library/node:24-alpine AS base

ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.4.2 --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder

ARG NEXT_PUBLIC_SITE_ORIGIN=http://localhost:3000
ARG NEXT_PUBLIC_STORYBOOK_URL=/storybook/index.html

ENV NEXT_PUBLIC_SITE_ORIGIN=$NEXT_PUBLIC_SITE_ORIGIN
ENV NEXT_PUBLIC_STORYBOOK_URL=$NEXT_PUBLIC_STORYBOOK_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build && pnpm storybook:embed

FROM public.ecr.aws/docker/library/node:24-alpine AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
