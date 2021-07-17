const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: "/",
		clean: true,
    },
	devServer: {
        contentBase: '/dist',
        overlay: true,
		hot: true,
    },
	module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        } 
                    },
                ]
            },
			{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                      plugins: ['@babel/plugin-transform-runtime']
                    }
                },
            },
        ]
    } ,
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
            inject: true,
			template: 'src/index.html',
        }),
	]
}