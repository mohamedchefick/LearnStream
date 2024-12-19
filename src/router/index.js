import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import Quiz from '../views/quiz/index.vue';
import Login from '../components/Login/index.vue';
import tableauBord from '../components/tableau_de_bord/tableauBord.vue';

// 0000000000000000000000000000000
import Connexion from '../components/Login/login.vue';
import Inscription from '../components/Login/register.vue'


// iframe 

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
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/tableauBord',
    name: 'TableauBord',
    component: tableauBord
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
