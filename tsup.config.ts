import { defineConfig } from 'tsup';

export default defineConfig({
        entry: ['src/index.ts'],
        format: ['cjs', 'esm'],
        dts: true,
        external: ['react', 'react-dom'],
        splitting: false,
        sourcemap: true,
        clean: true,
        treeshake: true,
        minify: true,
        loader: {
             '.css': 'css',
        },
        esbuildOptions(options) {
                options.loader = {
                        ...options.loader,
                        '.css': 'css',
                };
                options.jsx = 'automatic';
                options.outdir = 'dist';
        },
});