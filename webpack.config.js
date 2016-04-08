var path = require("path");

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
      sources.push('webpack-dev-server/client?http://localhost:8080');
  }

  return sources;
}

module.exports = {
    entry: {
        bundle: getEntrySources(
        ['./src/js/bundle'])
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: "[name].js",
      publicPath: process.env.NODE_ENV == 'production' ? "https://s3-us-west-2.amazonaws.com/pinpoints/" : "/"
    },
    module: {
      loaders: [
        { test: /\.js$/, 
          exclude: /node_modules/,
          loader: 'babel',
          query: { 
            presets: ['react',  'es2015', 'stage-0'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
          }, 
        },
        { test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
          exclude: /node_modules/,
          loader: 'file?name=fonts/[name].[ext]'
        },
        { test: /\.(png|jpg)$/,
          loader: 'url?limit=8192&name=images/[name].[ext]'
        } 
      ]
    }

};
