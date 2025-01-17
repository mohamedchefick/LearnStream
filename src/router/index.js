import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import VideoCatalog from '../views/videoCatalog/index.vue'
import Search from '../views/Search/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/videocatalog',
    name: 'VideoCatalog',
    component: VideoCatalog
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
