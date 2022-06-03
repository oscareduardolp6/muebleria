const path = require('path')

const stylesRule = {
  test: /\.css$|\.sass$/, 
  use: ['style-loader', 'css-loader', 'sass-loader']
}

const tsxRule = {
  test: /\.tsx?$/, 
  use: 'ts-loader', 
  exclude: /node_modules/
}

module.exports = {
  entry: './src/main.tsx',
  devtool: 'source-map', 
  module: {
    rules: [
      tsxRule,
      stylesRule
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.sass'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};