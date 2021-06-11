'use strict';

let path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/script.js',
    output: {
        filename: 'bindle.js',
        path: __dirname + '/js'
    },
    watch: true,

    devtool: 'source-map',

    module: {}
};