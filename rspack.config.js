const path = require('path');
const { ProgressPlugin, ExternalsPlugin } = require("@rspack/core");
module.exports = {
  mode: 'production',
  entry: {
    'home': path.join(__dirname, 'app', 'home')
  },
  output: {
    path: path.join(__dirname, 'dist-rspack'),
    publicPath: '/',
    filename: '[name].js',
  },
  builtins: {
    css: { modules: { localIdentName: '[local]_[hash:5]' } },
  },
  module: {
    rules: [{ test: /\.css$/, type: 'css/auto', }]
  },
  plugins: [
    new ProgressPlugin(),
    new ExternalsPlugin('commonjs', (dep, callback) => {
    if (dep.dependencyType === 'url' && dep.request.startsWith('/')) {
      return callback(null, dep.request);
    }
    callback(null);
  })],
}
