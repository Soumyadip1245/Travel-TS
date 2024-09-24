import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    },
    proxy: {

      "/proxy": {
        target: 'http://travelbackend:8080', // Ensure this is the correct backend URL
        changeOrigin: true,
        secure: false, // Use false if the target uses a self-signed SSL certificate
        rewrite: (path) => path.replace(/^\/proxy/, ''), // Remove /proxy prefix from the path
      },

    },
  },
});
