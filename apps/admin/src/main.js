import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import vue3GoogleLogin from 'vue3-google-login'
import { LoadingPlugin } from 'vue-loading-overlay'

import App from './App.vue'

import './assets/main.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App)

app.use(VueSweetalert2, {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
})

app.use(vue3GoogleLogin, {
  clientId:
    '662974395385-8k8tlfh827jlb3r6pqqcku0hnvahbmhv.apps.googleusercontent.com',
})

app.use(LoadingPlugin, {
  loader: 'dots',
})

app.mount('#app')
