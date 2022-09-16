import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(store)
app.config.globalProperties.append = (path, pathToAppend) =>
  path + (path.endsWith('/') ? '' : '/') + pathToAppend

app.use(router).mount('#app')
