var webpack = require('webpack');
var path = require('path');

module.exports = {
    // tells your loaders that you're in debug mode
    debug: true,

    // Add souremaps to js; helps find errors in inspector
    devtool: '#cheap-eval-source-map',

    entry: [
        // input file name, minus the extension
        './src/js/main',
    ],

    output: {
        // output folder path
        path: './dist/js',
        // bundled output file
        filename: 'bundle.js',
        // exspose the library to the console as the following variable
        library: 'App',
    },

    plugins: [
        // Sort included modules by occurrence
        new webpack.optimize.OccurenceOrderPlugin(),
        // Prevent file chunking in AMD/RequireJS style modules
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        // Keep webpack from failing on CLI compile errors
        new webpack.NoErrorsPlugin(),
        // Always load these modules
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],

    resolve: {
        // Look in these directories for our vendor libs / packages
        root: [
            path.resolve('./src/js/lib'),
            path.resolve('./node_modules'),
        ],
        // modulesDirectories: ['lib', 'node_modules'],
        // Adding a package that isn't AMD/CommonJS?
        // Alias it here to make it accessible in your JS modules
        alias: {
         // 'name_to_require': "filename.min",
            waypoint: 'jquery.waypoints.min',
        },
    },

    module: {
        preLoaders: [
            {
                // Lint our JS before attempting to compile
                test: /\.jsx?$/,
                loaders: ['eslint'],
                exclude: /node_modules/,
            },
        ],
        loaders: [
            {
                // Babel ES6 Transpiler
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015'],
                },
            },
        ],
    },
};
