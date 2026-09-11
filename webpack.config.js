const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map',

    entry: {
      index: './src/views/index.pug',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash:8].js',
      clean: true,
      /*
        ⚠️ НАСТРОЙКА ДЛЯ NETLIFY:
        Здесь строго должна быть косая черта '/'.
        Мы убрали 'auto', так как pug-plugin его не поддерживает и ломает пути к стилям.
        (Если бы мы собирали под GitHub Pages, тут была бы пустая строка '', но под Netlify нужна '/')
      */
      publicPath: '',
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern',
                sassOptions: {
                  silenceDeprecations: ['legacy-js-api'],
                }
              }
            }
          ],
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[hash:8][ext]',
          },
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    plugins: [
      new PugPlugin({
        pretty: !isProd,
        css: {
          filename: 'css/[name].[contenthash:8].css',
        },
      }),
    ],

    devServer: {
      static: path.join(__dirname, 'dist'),
      watchFiles: ['src/**/*.*'],
      hot: true,
      open: true,
      port: 3000,
      allowedHosts: 'all', // Убирает ошибку Content Security Policy (CSP) от Chrome DevTools
    },
		// ВОТ ЭТОТ БЛОК УБЕРЕТ ЖЁЛТЫЕ ВАРНИНГИ:
    performance: {
      // Показываем предупреждения только при npm run build, в режиме разработки отключаем
      hints: isProd ? 'warning' : false,
      maxAssetSize: 600000, // Поднимаем планку для одного файла до 600 КБ
      maxEntrypointSize: 800000, // Поднимаем планку для всей страницы до 800 КБ
    },
  };
};
