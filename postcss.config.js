import { defineConfig } from 'postcss'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    tailwind(),
    autoprefixer(),
  ],
})
