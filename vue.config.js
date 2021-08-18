const webpack = require("webpack");

let externalsConfig = {}

if (process.env.NODE_ENV === 'production') {
    externalsConfig = {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'web3': 'Web3',
        'bignumber.js': 'BigNumber'
    }
}

module.exports = {
    configureWebpack: {
        externals: externalsConfig,
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ],
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
