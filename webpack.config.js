const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const HtmlWebpackPLugin = require('html-webpack-plugin');

// const PATHS = {
// 	source: path.join(__dirname, 'src'),
// 	build: path.join(__dirname, 'dist')
// };

// const config = {
// 	entry: {
// 		main: PATHS.source + 'index.js'
// 	},
// 	output: {
// 		path: PATHS.build,
// 		filename: '[name].js'
// 	}	
// };

// module.exports = {
// 	mode: 'development',
// 	plugins: [
// 		new HtmlWebpackPLugin({
// 			title: 'Webpack app'
// 		})
// 	]
// }

let conf = {
	entry: './src/index.js',
	output : {
		path: path.resolve(__dirname, './dist/'),
		filename: 'main.js',
		publicPath: 'dist/'
	},
	devServer : {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				//exclude: 'node_modules/'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
				//use: [
				//	'style-loader',
				//	'css-loader'
				//]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css")
	]	
};

module.exports = (env, options) => {
	let production = options.mode === 'production';
	conf.devtool = production ? 'source-map' : 'eval-sourcemap';

	return conf;
};