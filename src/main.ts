import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app/App.vue'
import router from './app/router'

import './app/assets/scss/reset.scss'
import './app/assets/scss/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
