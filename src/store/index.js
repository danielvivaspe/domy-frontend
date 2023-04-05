import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import createPersistedState from 'vuex-persistedstate'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import home from './home'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    home,
  },
  plugins: [
    createPersistedState(),
  ],
  strict: process.env.DEV,
})
