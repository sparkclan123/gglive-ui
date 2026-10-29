import { createApp } from 'vue'
// import './style.css'
import './index.css'
import './styles/member.css'
import './styles/member-mobile.css'
import './styles/member-theme.css'
import './styles/member-rebrand.css'
import { initializeMemberTheme } from './utils/memberTheme.js'
import MemberThemeToggle from './components/member/MemberThemeToggle.vue'
import { memberDialog, installMemberViewport } from './utils/memberMobile.js'
import {memberBrand, applyMemberBrand} from './config/memberBrand.js'
import MemberBrand from './components/member/MemberBrand.vue'
import MemberIcon from './components/member/MemberIcon.vue'
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



applyMemberBrand()
const disposeMemberTheme = initializeMemberTheme()
if (import.meta.hot) import.meta.hot.dispose(disposeMemberTheme)
const app = createApp(App)
app.directive('member-dialog', memberDialog)
const disposeMemberViewport = installMemberViewport()
if (import.meta.hot) import.meta.hot.dispose(disposeMemberViewport)
app.config.globalProperties.$memberBrand = memberBrand
app.component('MemberBrand', MemberBrand)
app.component('MemberThemeToggle', MemberThemeToggle)
app.component('MemberIcon', MemberIcon)
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

