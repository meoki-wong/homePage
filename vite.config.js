import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import commonjs from '@rollup/plugin-commonjs'
// import vitePluginImp from 'vite-plugin-imp'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // commonjs(),
    react(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/es/${name}/style/index.less`,
    //     },
    //   ],
    // }),
  ],
  base: "./",
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        javascriptEnabled: true,
      },
    },
  },   
  build: {
    outDir: 'build',
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    cssCodeSplit: true // 拆分css
},
server: {
    port: 8000
}
})
