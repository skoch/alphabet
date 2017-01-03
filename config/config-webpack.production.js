var webpack = require('webpack');
var path = require('path');
var devConfig = require('./config-webpack.js');

module.exports = Object.assign(devConfig, {

    // Turn off debugging
    debug: false,

    // Add souremaps to js; helps find errors in inspector
    devtool: 'source-map',

    // Add uglification to the dev workflow
    plugins: devConfig.plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        })
    ),

    module: {
        loaders: [
            {
                // Babel ES6 Transpiler
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                },
            },
        ],
    },
});
