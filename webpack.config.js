const prod = process.env.NODE_ENV === "production";
const path = require("path");
const Dotenv = require("dotenv-webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: prod ? "production" : "development",
	entry: "./src/index.tsx",
	output: {
		path: __dirname + "/dist/",
	},
	devServer: {
		static: path.resolve(__dirname, "./dist"),
		hot: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: [".ts", ".tsx", ".js", ".json"],
				},
				use: "ts-loader",
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			// {
			// 	test: /\.css$/,
			// 	use: [MiniCssExtractPlugin.loader, "css-loader"],
			// },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	devtool: prod ? undefined : "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
		}),
		new MiniCssExtractPlugin(),
		new Dotenv(),
	],
};
