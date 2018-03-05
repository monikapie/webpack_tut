var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
          { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader','sass-loader'] }) },
          { test: /\.js$/, exclude: /node_modules/, use:'babel-loader'},
          { test: /\.pug$/, use:['html-loader','pug-html-loader']}
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
        disable: false,
        allChunks: true
    })]
};