const path = require('path');
const Dotenv = require('dotenv-webpack');
const withTypescript = require('@zeit/next-typescript');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const dev = process.env.NODE_ENV !== "production";
const {CDN_URL} = process.env;



module.exports = withTypescript({
	assetPrefix: CDN_URL,
	webpack: function(config) {
		config.plugins = config.plugins || []
		
		config.plugins = [
			...config.plugins,
			
			// Read the .env file
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true
			}),
            
            !dev && new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true
                    }
                },
                sourceMap: false
            })
		].filter(plugin => plugin)
		
		const originalEntry = config.entry
		config.entry = async () => {
			const entries = await originalEntry()
			
			if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
				entries['main.js'].unshift('./client/polyfills.js')
			}
			
			return entries
		}
		
		return config;
	}
});