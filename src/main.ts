import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API

createApp(App).use(store).use(router).mount('#app')
