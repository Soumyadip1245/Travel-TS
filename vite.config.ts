import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy": {
        target: 'https://localhost:7259', // Ensure this is the correct backend URL
        changeOrigin: true,
        secure: false, // Use false if the target uses a self-signed SSL certificate
        rewrite: (path) => path.replace(/^\/proxy/, ''), // Remove /proxy prefix from the path
      },
    },
  },
});
