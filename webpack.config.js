var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path");

var isProd = process.argv.indexOf('-p') !== -1;
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader','sass-loader'] });
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js',
    },
    output: {
        filename: '[name].bundle.js'
    },
    module:{
      rules: [
          { test: /\.scss$/, use: cssConfig},
          { test: /\.js$/, exclude: /node_modules/, use:'babel-loader'},
          { test: /\.pug$/, use:['html-loader','pug-html-loader']}
      ]
    },
    devServer:{
      compress: true,
      stats: "errors-only",
      hot: true,
      open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Project Demo',
        // minify: {
        //     collapseWhitespace: true
        // },
        hash: true,
        excludeChunks: ['contact'],
        template: './src/index.pug'
        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page',
            hash: true,
            chunks: ['contact'],
            filename: 'contact.html',
            template: './src/contact.html'
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};