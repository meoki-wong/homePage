import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import analyze from 'rollup-plugin-analyzer';
import {createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
// import commonjs from '@rollup/plugin-commonjs'
// import vitePluginImp from 'vite-plugin-imp'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // commonjs(),
    react(),
    createStyleImportPlugin({
      resolves: [AntdResolve()]
  }),
  analyze({   // 用户分析包的大小 和 数量
    summaryOnly: true,
    limit: 10, //
}),
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
    minify: 'esbuild', // boolean | 'terser' | 'esbuild'
    cssCodeSplit: true // 拆分css
},
server: {
    port: 8000
}
})
