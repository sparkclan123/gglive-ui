import { createApp } from 'vue'
// import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'
import store from './store'


import Numberformat from './components/object/numberformat.vue';
import NumberformatValue from './components/object/numberformatforvalue.vue';
import NumberDisplay from './components/object/numberDisplay.vue';
import LodingSceen from './components/object/LodingSceen.vue';
import Menu from './components/object/menu.vue';
import Pagination from './components/object/pagenation.vue';
import PaginationJavascript from './components/object/pagenationjavascript.vue';
import DateFormatted from './components/object/dateformatted.vue';
import CountDown from './components/object/countdown.vue';

import FootBallIcon from './components/icon/FootballIcon.vue';
import StarMVPIcon from './components/icon/StarMVPIcon.vue';



const app = createApp(App)
app.component('Numberformat', Numberformat);
app.component('NumberformatValue', NumberformatValue);
app.component('NumberDisplay', NumberDisplay);
app.component('LodingSceen', LodingSceen);
app.component('MenuScreen', Menu);
app.component('Pagination', Pagination);
app.component('PaginationJavascript', PaginationJavascript);
app.component('DateFormatted', DateFormatted);
app.component('CountDown', CountDown);
// icon
app.component('FootBallIcon', FootBallIcon);
app.component('StarMVPIcon', StarMVPIcon);

app.use(router)
app.use(store)

app.mount('#app')

