import autoprefixer from "autoprefixer";
import path from "path";
import commonjs from "vite-plugin-commonjs";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from "vitest/config";
import { prependShebang } from "vite-plugin-shebang";

export default defineConfig({
    base: "./",
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },

    build: {
        sourcemap: true,
        minify: true,
        outDir: path.resolve(__dirname, "./dist/"),
        emptyOutDir: true,

        target: "modules",

        rollupOptions: {
            external: [
                // node builtins
                "child_process",
                "process",
                "fs",
                "module",
                "path",
                "os",
                "child_process",
                "crypto",
                // node modules
                "yargs/yargs",
                "yargs/helpers",
                "sass",
                "lru-cache",
            ],
        },

        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Mailtyphoon",
            fileName: "mailtyphoon",

            formats: ["cjs", "es"],
        },
    },

    test: {
        include: ["./test/*.test.ts"],

        coverage: {
            reporter: ["text", "json", "html"],
        },

        forceRerunTriggers: ["./data/email.html", "./data/email.scss"],

        cache: false,
        watch: true,
    },

    plugins: [
        commonjs(),
        dts(),
        nodePolyfills({
            protocolImports: true,
        }),
        prependShebang(),
    ],
});
