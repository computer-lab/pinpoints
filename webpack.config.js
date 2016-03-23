module.exports = {
    entry: {
        helloWorld: [
          'webpack-dev-server/client?http://localhost:8080',
          './src/js/helloworld']
    },
    output: {
        filename: 'public/[name].js'
    },
    module: {
      loaders: [
        { test: /\.js$/, 
          exclude: /node_modules/,
          loader: 'babel',
          query: { presets: ['react',  'es2015'] }, 
        },
        { test: /\.scss$/, 
          exclude: /node_modules/,
          loaders: ["style", "css", "sass"],
        }
      ]
    }

};
