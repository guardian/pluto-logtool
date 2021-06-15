var webpack = require('webpack');
var path = require('path');
var TerserPlugin = require('terser-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
    entry: APP_DIR + '/index.jsx',
    resolve: {
        extensions: [".js",".jsx"],
        fallback: {
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve("buffer/")
        },
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    optimization: {
        minimizer: [new TerserPlugin()]
    },
    module : {
        rules : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};

module.exports = config;