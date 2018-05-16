const path = require('path');
const HtmlWebpackPLugin = require('html-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

const config = {
	entry: {
		main: PATHS.source + 'index.js'
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	}	
};

module.exports = {
	mode: 'development',
	plugins: [
		new HtmlWebpackPLugin({
			title: 'Webpack app'
		})
	]
}

