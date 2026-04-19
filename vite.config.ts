import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    host: true,
    allowHosts: ["*"],
    allowedHosts: ["monosymmetric-uneuphemistically-marvella.ngrok-free.dev"],

  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
