import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const vitePort = Number(env.VITE_PORT || 3000);
  const apiPort = Number(env.VITE_API_PORT || 5173);
  // const rawApiUrl = env.VITE_API_URL || `http://localhost:${apiPort}`;
  const rawApiUrl = env.VITE_API_URL ||`http://localhost:${apiPort}`;

  const apiTarget = rawApiUrl.replace(/\/api\/?$/, '');

  return {
    plugins: [react()],
    server: {
      port: vitePort,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
