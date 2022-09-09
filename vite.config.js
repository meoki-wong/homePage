import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
// import vitePluginImp from 'vite-plugin-imp'
import analyze from 'rollup-plugin-analyzer';
import {createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';
// import commonjs from '@rollup/plugin-commonjs'
// import vitePluginImp from 'vite-plugin-imp'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // commonjs(),
    react(),
    splitVendorChunkPlugin(),
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
    // sourcemap: "inline",
    outDir: 'build',
    assetsDir: 'static/img/', // 指定生成静态资源的存放路径
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    cssCodeSplit: true, // 拆分css
    rollupOptions: {
      output: {
        manualChunks(id) {
          if(id.includes('node_modules')){
            // return id.toString().split('node_modules/')[1].split('/')[0].toString();
            const arr = id.toString().split('node_modules/')[1].split('/')
            // console.log('-----arr', arr[0])
            switch(arr[0]){
              case "dexie": 
              return arr[0]
              break

            }
          };
        },
          chunkFileNames: 'static/js1/[name]-[hash].js',
          entryFileNames: 'static/js2/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
},
server: {
    port: 8000
}
})