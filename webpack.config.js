// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devtool: "eval-source-map",
	devServer: {
		host: "192.168.178.99",
		port: 8080,
		https: {
			key: fs.readFileSync(path.resolve(__dirname, "ssl/key.pem")),
			cert: fs.readFileSync(path.resolve(__dirname, "ssl/cert.pem")),
		},
		watchFiles: ["./src/template.html"],
		hot: true,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
};
