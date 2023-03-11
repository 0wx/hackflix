import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Notifications, { notify } from 'notiwind'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(Notifications)

pinia.use(({ store }) => {
  store.$router = markRaw(router)
  store.$notify = notify
})

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId:
    '662974395385-8k8tlfh827jlb3r6pqqcku0hnvahbmhv.apps.googleusercontent.com',
})

app.mount('#app')
