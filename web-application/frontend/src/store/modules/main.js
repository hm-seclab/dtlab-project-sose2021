import axios from "axios";

const state = () => ({
    backendStatus: {
        "online": false
    },
    alert: {
        "alert": false,
        "msg": null,
        "type": null,
        "dismissible": true,
    },
})

// getters
const getters = {

}

// actions
const actions = {
    checkBackendStatus({commit}) {
        axios.get(process.env.VUE_APP_BACKEND_URL + 'status', {
            timeout: 5000
        }).then(response => {
            commit('SET_BACKEND_STATUS', response.data)
            commit('SET_ALERT', {"alert": false, "msg": null, "type": null, 'dismissible': true})
        }).catch(() => {
            commit('SET_BACKEND_STATUS', {"online": false})
            commit('SET_ALERT', {
                "alert": true, "msg": "Could not connect to the backend!", "type": "error",
                'dismissible': false
            },)
        })
    }
}

// mutations
const mutations = {
    SET_BACKEND_STATUS: (state, status) => {
        state.backendStatus = status
    },
    SET_ALERT: (state, alert) => {
        state.alert = alert
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}