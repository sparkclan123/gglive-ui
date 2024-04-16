import { createApp } from 'vue'
// import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Numberformat from './components/object/numberformat.vue';
import NumberformatValue from './components/object/numberformatforvalue.vue';
import LodingSceen from './components/object/lodingSceen.vue';
import Menu from './components/object/menu.vue';


axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const app = createApp(App)
app.component('Numberformat', Numberformat);
app.component('NumberformatValue', NumberformatValue);
app.component('LodingSceen', LodingSceen);
app.component('MenuScreen', Menu);

app.use(router)
app.use(store)

app.mount('#app')

