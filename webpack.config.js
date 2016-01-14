module.exports = {
  devtool: 'source-map',
  entry: {
    'data-viewer': './js/app.js',
  },
  output: {
    filename: './js/build/[name].js',
    sourceMapFilename: './build/[name].map?_v=[hash]',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/,  loader: 'babel-loader' },
      { test: /\.jsx$/, loader: 'babel?presets[]=react,presets[]=es2015' }
    ]
  }
};
