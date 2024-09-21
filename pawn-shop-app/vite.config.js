import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pawn-shop-app/', // Set the base path
  plugins: [react()],
});