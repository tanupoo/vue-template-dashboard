import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userData: null,
    },
    mutations: {
        setUserData(state, payload) {
            state.userData = payload
        },
        clearUserData(state) {
            state.userData = null
        }
    },
    actions: {
        authorized({commit}) {
            commit('setUserData')
        },
        logout({commit}) {
            commit('clearUserData')
        }
    },
    modules: {
    }
})
