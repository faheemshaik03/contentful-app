import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put react and react-dom in one chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Put @reduxjs/toolkit and react-redux in one chunk
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            // Put dnd-kit packages in one chunk
            if (id.includes('@dnd-kit')) {
              return 'vendor-dndkit';
            }
            // All other node_modules in a vendors chunk
            return 'vendor';
          }
        }
      }
    }
  }
});
