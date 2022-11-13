const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer-brotli').BundleAnalyzerPlugin;
const zlib = require("zlib");

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            Utilities: path.resolve(__dirname, 'src/utils/'),
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist')
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: "React Bundle Size Optimization",
            template: path.resolve(__dirname, './src/index.html')
        }),
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            filename: "[name].gz",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new CompressionPlugin({
            filename: "[name].br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
                params: {
                    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
            },
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            name: 'vendors'
        }
    },
    performance: {
        hints: false,
    },
    stats: {
        optimizationBailout: true,
    }
};