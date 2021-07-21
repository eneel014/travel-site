const Webpack = require('webpack');
const WebpackVersionFile = require('webpack-version-file');
const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const now = new Date();
const yy = now.getFullYear();
const mm = now.getMonth() + 1;
const dd = now.getDate();
const ver = `${yy}${mm < 10 ? '0' + mm : mm}${dd < 10 ? '0' + dd : dd}.${now.getTime()}`;

module.exports = {
    entry : './src/index.js',
    output : {
        filename : 'bundle.js',
        path : Path.resolve(__dirname, 'dist')
    },
    module : {
        rules : [{
            test : /\.js$/,
            exclude : /node_modules/,
            use : {
                loader : 'babel-loader'
            }
        }, {
            test : /\.(css|scss)$/,
            use : ExtractTextPlugin.extract({
                fallback : 'style-loader',
                use: [{
                    loader : 'css-loader',
                    options : {
                        url : false,
                        minimize : {
                            minifyFontValues: false 
                        }
                    }
                }, {
                    loader : 'postcss-loader'
                }, {
                    loader : 'sass-loader'
                }]
            })
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
          include: /\.js$/
        })]
    },
    plugins : [
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextPlugin({
            filename : 'style.css'
        }),
        new WebpackVersionFile({
            output : './dist/version.php',
            templateString : '<?php define("_BUILD_VERSION", "<%= version %>");',
            data : {
                version : ver
            }
        })
    ]
};