const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.jsx'
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'public/js')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: '/\.jsx$/',
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }]
      }
    ]
  }
};
