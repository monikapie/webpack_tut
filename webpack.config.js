var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js'
    },
    module:{
      rules: [
           { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader','sass-loader'] }) }
      ]
    },
    devServer:{
      compress: true,
      stats: "errors-only",
      open: true
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Project Demo',
        // minify: {
        //     collapseWhitespace: true
        // },
        hash: true,
        template: './src/index.ejs'
    }),
    new ExtractTextPlugin({
        filename: "app.css",
        disable: false,
        allChunks: true
    })]
};