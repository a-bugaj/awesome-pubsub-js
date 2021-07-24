import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";

const config: Configuration = {
    mode: "production",
    entry: "./lib/index.ts",
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "pubsub",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /.ts/,
                use: "ts-loader",
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
};

export default config;
