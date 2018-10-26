const helpers = require('./helpers'),
  webpackConfig = require('./webpack.config.base'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  env = require('../environment/dev.env');

webpackConfig.module.rules = [...webpackConfig.module.rules,
  {
    test: /\.less$/,
    use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader'
      }
    ]
  },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      },
        {
          loader: 'css-loader'
        }
      ]
    },
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader'
  }
];

webpackConfig.plugins = [...webpackConfig.plugins,
  new HtmlWebpackPlugin({
    inject: true,
    template: helpers.root('/src/index.html'),
    favicon: helpers.root('/src/favicon.ico')
  }),
  new DefinePlugin({
    'process.env': env
  })
];

webpackConfig.devServer = {
  port: 8080,
  host: 'localhost',
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  proxy: {
    "/v1": {
      "target": {
        "host": "sysapi-dev1.vulcanm.ru",
        "protocol": 'http:',
        "port": 80
      },
      ignorePath: false,
      changeOrigin: true,
      secure: false
    }
  },
  contentBase: './src',
  open: true
};

module.exports = webpackConfig;
