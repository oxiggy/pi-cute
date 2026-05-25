import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), svgr()],
});
