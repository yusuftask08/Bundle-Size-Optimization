const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
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
    devtool: "eval-cheap-module-source-map",
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
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            chunks: 'all',
            name: 'vendors'
        }
    }
};