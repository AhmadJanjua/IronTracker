import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import fs from 'fs';

export default defineConfig({
	plugins: [preact()],
	server: {
		allowedHosts: ['zephyrus-2.local'],
		https: {
			key: fs.readFileSync("/app/.cert/localhost+2-key.pem"),
			cert: fs.readFileSync("/app/.cert/localhost+2.pem"),
		}
	},
});
