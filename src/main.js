import './assets/main.scss'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(
  faBars, faMagnifyingGlass
)

import { createApp } from 'vue'
import App from './index.vue'
import router from './router'
import { createI18n } from 'vue-i18n';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import VueLazyload from 'vue-lazyload'

// languages
import ruMessages from '@/locales/ru.json';
import enMessages from '@/locales/en.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    ru: ruMessages
  },
});

const vuetify = createVuetify({
  components
});

const lazyloadOptions = {
  preLoad: 1.3,
  attempt: 1,
};

createApp(App)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .use(VueLazyload, lazyloadOptions)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
