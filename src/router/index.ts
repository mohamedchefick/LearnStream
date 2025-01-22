import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import VideoCatalog from '../views/videoCatalog/index.vue'
import Search from '../views/Search/index.vue'
import Detailscours from '../views/DetailsCours/index.vue'
import Login from '../views/Login/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
  {
    path: '/detailscours',
    name: 'DetailsCours',
    component: Detailscours
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
