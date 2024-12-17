import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import Quiz from '../views/quiz/index.vue'
// import Login from '../views/login/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: 'Login'
  // }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
