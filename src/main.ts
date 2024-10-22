import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files
import { aliases, fa } from 'vuetify/iconsets/fa'

const dark = {
  dark: true,
  colors: {
    background: '#2c3e50',
    surface: '#34495e',
    primary: '#ffffff',
    'primary-darken-1': '#ffffff',
    secondary: '#AAAAAA',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const light = {
  dark: false,
  colors: {
    background: '#fff8e7',
    surface: '#fff8e7',
    primary: '#34495e',
    'primary-darken-1': '#ffffff',
    secondary: '#AAAAAA',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark, 
      light
    }
  }
})

createApp(App).use(vuetify).mount('#app')

