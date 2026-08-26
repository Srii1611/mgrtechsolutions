import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: { environment: 'node', unstubEnvs: true },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // `server-only` throws by default so a client bundle fails loudly;
      // under Next.js's build it resolves to a no-op via the
      // "react-server" export condition. Point tests at that same no-op
      // directly so server-only modules (e.g. src/lib/blog.ts) can be
      // unit tested outside a full Next.js build.
      'server-only': path.resolve(__dirname, './node_modules/server-only/empty.js'),
    },
  },
});
