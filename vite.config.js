import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "react-precinct-search-number",
  // server: {
  //   historyApiFallback: true,
  // },
  // build: {
  //   outDir: 'dist',
  // },
});
