
import { registerPlugins } from '@/plugins'

import App from './App.vue'

import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

registerPlugins(app)
app.use(VueQueryPlugin)
app.mount('#app')
