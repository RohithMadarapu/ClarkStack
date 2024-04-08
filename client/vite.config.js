import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
import dotenv from 'dotenv';

dotenv.config(); 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  envCompatible()],
  server: {
    host: true,
    strictPort: true,
    port: 5173 // Specify your desired port number here
  }
})
