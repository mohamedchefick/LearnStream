import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import VideoCatalog from '../views/videoCatalog/index.vue'

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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
