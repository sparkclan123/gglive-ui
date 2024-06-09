import { createApp } from 'vue'
// import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'
import store from './store'


import Numberformat from './components/object/numberformat.vue';
import NumberformatValue from './components/object/numberformatforvalue.vue';
import LodingSceen from './components/object/lodingSceen.vue';
import Menu from './components/object/menu.vue';
import Pagination from './components/object/pagenation.vue';
import PaginationJavascript from './components/object/pagenationjavascript.vue';
import DateFormatted from './components/object/dateformatted.vue';
import CountDown from './components/object/countdown.vue';



const app = createApp(App)
app.component('Numberformat', Numberformat);
app.component('NumberformatValue', NumberformatValue);
app.component('LodingSceen', LodingSceen);
app.component('MenuScreen', Menu);
app.component('Pagination', Pagination);
app.component('PaginationJavascript', PaginationJavascript);
app.component('DateFormatted', DateFormatted);
app.component('CountDown', CountDown);

app.use(router)
app.use(store)

app.mount('#app')

