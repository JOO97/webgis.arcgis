import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { viteStaticCopy } from 'vite-plugin-static-copy'; //NOTE: dest is relative to build.outDir.
import copy from 'rollup-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		copy({
			targets: [
				{
					src: '../../node_modules/@esri/calcite-components/dist/calcite/assets/*',
					dest: normalizePath(resolve(__dirname, 'public/assets')),
				},
			],
			copyOnce: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		port: 1222,
	},
});
