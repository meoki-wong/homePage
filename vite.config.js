import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import antdDayjs from 'antd-dayjs-vite-plugin';
import analyze from 'rollup-plugin-analyzer';
import requireTransform from 'vite-plugin-require-transform';
import commonjs from '@rollup/plugin-commonjs'
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp'
const pkg = require('./package.json')
import antdViteImportPlugin from 'antd-vite-import-plugin';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // reactRefresh(),
        commonjs(),
        // react(),
        antdViteImportPlugin(),
        antdDayjs(),
        analyze({   // 用户分析包的大小 和 数量
            summaryOnly: true,
            limit: 10, //
        }),
        requireTransform({
            fileRegex: /.js$|.vue$|.jsx$|.ts$|.tsx$/
          }),
          vitePluginImp({
            libList: [
              {
                libName: 'antd',
                style: (name) => `antd/es/${name}/style/index.less`,
              },
            ],
          }),
          
        // createStyleImportPlugin({ resolves: [AntdResolve()] })
    ],
    // optimizeDeps: {
    //     include: Object.keys(pkg.dependencies) // 这里为了方便将所有 dependencies 的包都加上了
    //   },
    base: './',
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: [{ find: '@/', replacement: '/src/' }],
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
        port: 8000,
        // host: 'localhost',
        // open: '/',
        // proxy: {
        //     '/uniauth': {
        //         target: 'http://192.168.1.211:30114',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/uniauth/, ''),
        //     },
        // },
    },
});
