module.exports = [
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: 'url-loader?limit=10000&name=font/[hash].[ext]'
  },
  {
    test: /\.svg$/,
    exclude: /ico\.svg$/,
    use: 'url-loader?limit=8192&name=image/[hash].[ext]'
  },
  {
    test: /ico\.svg$/,
    loader: 'svg-inline-loader',
    options: {
      classPrefix: true,
      removeTags: true,
      removingTagAttrs: ['fill', 'opacity']
    }
  }
]

