

// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
  
//   // 👇 importante para servir desde Express correctamente
//   base: './', // rutas relativas
  
//   build: {
//     outDir: 'dist', // carpeta donde se genera el build
//     emptyOutDir: true,
//   },

//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })










// // vite.config.js

// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'
// // import tailwindcss from '@tailwindcss/vite'

// // export default defineConfig({
// //   plugins: [react(), tailwindcss()],
// // })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // SOLUCIÓN: Usar la ruta absoluta del subdirectorio en producción.
  // Esto fuerza al navegador a buscar los assets SIEMPRE desde la raíz de /admin/.
  base: '/admin/', 
  
  build: {
    outDir: 'dist', 
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})