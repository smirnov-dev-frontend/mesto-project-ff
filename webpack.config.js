const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/scripts/index.js',
   output: {
      filename: 'bundle.[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext][query]',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '',
   },
   mode: 'development',
   devServer: {
      static: {
         directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|svg|jpg|gif)$/,
            type: 'asset/resource',
            generator: {
               filename: 'images/[hash][ext][query]',
            },
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[hash][ext][query]',
            },
         },
         {
            test: /\.html$/i,
            use: ['html-loader'],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      new CleanWebpackPlugin(),
   ],
};