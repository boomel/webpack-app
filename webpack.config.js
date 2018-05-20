//base plugins
const path = require('path');
const webpack = require('webpack');

//additional plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
	context: path.resolve(__dirname, 'src'),
	entry: [
		'./js/index.js',
		'./scss/style.scss'
	],
	output : {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/main.js',
		publicPath: '../'
	},
	devServer : {
		overlay: true,
		contentBase: './app'
	},
	//devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
	module: {
		rules: [
			//JS ES2015
			{
				test: /\.js$/,
				loader: 'babel-loader',
				//exclude: 'node_modules/'
			},
			//SCSS
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
							],
							sourceMap: true
						}
					},					
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			//Images
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					},
					{
						loader: 'img-loader'
					}
				]				
			},
			//Fonts
			{
				test: /\.(woff|woff2|eot|tif|otf)$/,
				use:[
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]'
						}
					}
				]
			},
			//SVG
			{
				test: /\.svg$/,
				loader: 'svg-url-loader'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/style.css"
		}),
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin(
			[
				{ from: './img', to: 'img'}
			],
			{
				ignore: [
					{ glob: 'svg/*'}
				]
			}
		)
	]	
};

//module.exports = config;

module.exports = (env, options) => {
	let production = options.mode === 'production';
	config.devtool = production ? 'source-map' : 'eval-source-map';

	//Production only
	if(production) {
		config.plugins.push(
			new UglifyJsPlugin({
				sourceMap: true
			}),
			new ImageminPlugin({
				test: /\.(png|jpe?g|gif|svg)$/i
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true
			})
		)
	}

	return config;
};


