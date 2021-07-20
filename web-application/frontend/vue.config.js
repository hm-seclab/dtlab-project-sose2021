console.log(`Testing env variable VUE_APP_BACKEND_URL: ${process.env.VUE_APP_BACKEND_URL}`)
module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        public: 'localhost:8080',
        hot: true,
        disableHostCheck: true,
    },
}

