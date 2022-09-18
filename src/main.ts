import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
const app = createApp(App)

app.use(createPinia())

app.mount('#weather')

//генерация и регистрация CustomElement
import { defineCustomElement } from 'vue'

import Weather from './domains/Weather/Weather.ce.vue'
const Weather_CE = defineCustomElement(Weather)
customElements.define('weather-widget', Weather_CE)
