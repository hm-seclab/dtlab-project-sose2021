import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import Keycloak from "keycloak-js";

Vue.config.productionTip = false

// Initialize Keycloak with the following options
let initOptions = {
    url: 'https://auth.yourdomain.com/auth/',
    realm: 'hm-client',
    clientId: 'frontend',
    onLoad: "check-sso"
}

let keycloak = Keycloak(initOptions);
keycloak.init({
        onLoad: initOptions.onLoad,
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    }
).then(() => {
    keycloak = Vue.observable(keycloak)
    Vue.prototype.$keycloak = keycloak
    new Vue({
        vuetify,
        store,
        el: '#app',
        render: h => h(App,
        )
    })

    //Token Refresh
    setInterval(() => {
        if (keycloak.authenticated) {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.log("Token refreshed!")
                } else {
                    console.log("Token not refreshed, still valid for "
                        + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + " seconds!");
                }
            }).catch(() => {
                console.log("Failed to refresh token!")
            });
        }
    }, 60000)

}).catch(() => {
    console.log("Error initializing keycloak. Is the server  offline?")
});


