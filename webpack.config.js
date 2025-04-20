const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const wasmPlugin = require('@wasm-tool/wasm-pack-plugin');
const { experiments } = require('webpack');

module.exports = {
  entry: './public/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new htmlPlugin({
      template: './public/index.html',
    }),
    new wasmPlugin({
      crateDirectory: path.resolve(__dirname, '.'),
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
};
