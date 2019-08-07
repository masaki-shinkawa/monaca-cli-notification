const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname),
    filename: './bin/mcn.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ]
}
