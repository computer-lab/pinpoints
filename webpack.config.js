
function getEntrySources(sources) {
if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
}

return sources;
}

function getOutputSources() {

if (process.env.NODE_ENV !== 'production') {
  return '[name].js'
} else {
  return 'dist/[name].js'
}

return sources;
}


module.exports = {
    entry: {
        bundle: getEntrySources([
          './src/js/bundle'])
    },
    output: {
        filename: getOutputSources()
    },
    module: {
      loaders: [
        { test: /\.js$/, 
          exclude: /node_modules/,
          loader: 'babel',
          query: { presets: ['react',  'es2015'] }, 
        },
/*        { test: /\.scss$/, 
          exclude: /node_modules/,
          loaders: ["style", "css", "sass"], 
        } */
      ]
    }

};
