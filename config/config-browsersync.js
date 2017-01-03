/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 */
module.exports = {
    files: [
        'dist/css/*.css',
        'dist/js/*.js',
        '***/*.html',
        '!node_modules/**/*.html',
    ],
    reloadDelay: 250,
    reloadDebounce: 250,
    minify: false,
    notify: false,
    open: false,
    proxy: 'http://localhost:9999',
    serveStatic: ['/dist'],
    logLevel: 'debug',
};
