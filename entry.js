import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainHeader from './components/header';
import SideNav from './components/side-nav';

import './assets/styles/common.css';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
