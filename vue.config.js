const webpack = require("webpack");

const externalsConfig = () => {
    return {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'web3': 'Web3'
    }
}

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ],
        externals: process.env.NODE_ENV === 'production' ? externalsConfig : {},
    },
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].isPro = process.env.NODE_ENV === 'production'
            return args
        })
    }
};

// modules.exports = {
// 	...
// 	configureWebpack: {
// 		...
// 		externals: {
// 			'vue': 'Vue',
// 			'vue-router': 'VueRouter',
// 			'vuex':'Vuex',
// 			"element-ui": "ELEMENT"
// 		}	
// 	}
// }