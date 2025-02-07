import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "lib/index.ts"),
            name: "pubsub",
            fileName: (format) => `index.${format}.js`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [],
        },
        sourcemap: false,
        emptyOutDir: true,
    },
    plugins: [
        dts({
            rollupTypes: true,
            insertTypesEntry: true,
        }),
    ],
});
