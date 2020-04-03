const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const server = {
    devtool: 'inline-source-map',
    // cache: false,
    entry: {
        server: 'src/server.ts'
    },
    output: {
        path: path.resolve('dist'),
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // modules: [
        //     path.resolve('node_modules'),
        //     path.resolve('.'),
        //     path.resolve('.'),
        // ],
        alias: {
            //common: path.resolve(__dirname, '../common'),
            'src': path.resolve('src'),
            'console-dto': path.resolve('../console-dto'),
        }
    },
    plugins: [

    ],
    
};

module.exports = server;