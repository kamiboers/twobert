const path = require('path');

module.exports = {
  entry: {
    main: "./static/lib/index.js",
    test: "mocha!./static/test/index.js"
  },
  output: {
    path: path.join(__dirname, '/static'),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  }
};