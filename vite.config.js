import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import antdDayjs from 'antd-dayjs-vite-plugin';
import analyze from 'rollup-plugin-analyzer';
import requireTransform from 'vite-plugin-require-transform';
import commonjs from '@rollup/plugin-commonjs'
const react = require('@vitejs/plugin-react').default;
const pkg = require('./package.json')
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
        requireTransform({
            fileRegex: /.js$|.vue$|.jsx$|.ts$|.tsx$/
          }),
    ],
    optimizeDeps: {
        include: Object.keys(pkg.dependencies) // 这里为了方便将所有 dependencies 的包都加上了
      },
    base: './',
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: [{ find: '@/', replacement: '/src/' }],
    },
    build: {
        outDir: 'build',
        minify: 'false', // boolean | 'terser' | 'esbuild'
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
