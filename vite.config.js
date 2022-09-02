import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import antdDayjs from 'antd-dayjs-vite-plugin';
import analyze from 'rollup-plugin-analyzer';
import requireTransform from 'vite-plugin-require-transform';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        commonjs(),
        react(),
        reactRefresh(),
        antdDayjs(),
        analyze({   // 用户分析包的大小 和 数量
            summaryOnly: true,
            limit: 10, //
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        
        requireTransform({
            fileRegex:/.ts$|.tsx$|.vue$|.js$/
          //   fileRegex:/.js$|.jsx$|.vue$/
          }),
          
          
    ],
    optimizeDeps: {
          exclude: ['node_modules'],
          include: []
        // commonjsOptions: { exclude: ['shared-project'], include: [] }
   },
    base: './',
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: [{ find: '@/', replacement: '/src/' }],
    },
    build: {
        outDir: 'build',
        minify: 'terser', // boolean | 'terser' | 'esbuild'
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
