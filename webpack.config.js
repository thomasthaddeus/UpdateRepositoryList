const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.ts', // Your main JavaScript file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js', // The output bundle
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
