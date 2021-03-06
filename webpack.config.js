var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

var plugins = [
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(require('./package.json').version)
  })
];
if (process.env.npm_lifecycle_event === 'release') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    output: {comments: false}
  }));
} else {
  plugins.push(new Clean(['dist']));
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loaders: ['css', 'sass?includePaths[]='
            + path.resolve(__dirname, './node_modules/compass-mixins/lib')
            + '&includePaths[]='
            + path.resolve(__dirname, './node_modules/clappr/src/base/scss')
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(png|woff|eot|ttf|swf)/, loader: 'url-loader?limit=1'
      },
      {
        test: /\.svg/, loader: 'svg-inline'
      },
      {
        test: /\.html/, loader: 'html?minimize=true'
      }
    ],
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js'],
  },
  externals: {
    "Clappr": "Clappr",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '<%=baseUrl%>/',
    filename: 'youtube_playback.js',
    library: 'ClapprYoutubePlayback',
    libraryTarget: 'umd',
  },
};
