import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import VideoCatalog from '../views/videoCatalog/index.vue';
import Search from '../views/Search/index.vue';
import CourseDetail from '../views/CourseDetail/index.vue';
import Lesson from '../views/lesson/index.vue';
import Login from '../views/Login/index.vue';
import Quiz from '../views/quiz/index.vue';
import myCourses from '../views/myCourses/index.vue';
import Contact from '../views/contact/index.vue';
import emailActivateConfirm from '../views/emailActivateConfirm/index.vue';
import Profile from '../views/profile/index.vue';
import Settings from '../views/settings/index.vue';
import PasswordReset from '../views/passwordReset/index.vue';
import PageNoFound from '../components/Helper/404.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Wisoria - Accueil',
      description: 'Bienvenue sur Wisoria, votre plateforme de cours en ligne.',
      image: 'https://wisoria.net/wisoria-logo.png',
      url: 'https://wisoria.net/',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/auth',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Wisoria - Connexion',
      description: 'Connectez-vous à votre compte Wisoria pour accéder à vos cours.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/auth',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/courses',
    name: 'VideoCatalog',
    component: VideoCatalog,
    meta: {
      title: 'Wisoria - Catalogue de Cours',
      description: 'Découvrez tous les cours disponibles sur Wisoria.',
      image: 'https://wisoria.net/wisoria-logo.png',
      url: 'https://wisoria.net/courses',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: 'Wisoria - Recherche de Cours',
      description: 'Trouvez des cours intéressants sur Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/search',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/myCourses',
    name: 'MyCourses',
    component: myCourses,
    meta: {
      title: 'Wisoria - Mes Cours',
      description: 'Accédez à vos cours enregistrés sur Wisoria.',
      image: 'https://wisoria.net/wisoria-logo.png',
      url: 'https://wisoria.net/myCourses',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Wisoria - Contact',
      description: 'Contactez-nous pour toute question concernant Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/contact',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/courseDetail/:id',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: {
      title: 'Wisoria - Détail du Cours',
      description: 'Détail du cours sélectionné sur Wisoria.',
      image: 'https://wisoria.net/wisoria-logo.png',
      url: 'https://wisoria.net/courseDetail/:id', // URL dynamique
      type: 'article',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: Lesson,
    meta: {
      title: 'Wisoria - Leçon',
      description: 'Suivez votre leçon sur Wisoria.',
      image: 'https://wisoria.net/wisoria-logo.png',
      url: 'https://wisoria.net/lesson/:id', // URL dynamique
      type: 'article',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz,
    meta: {
      title: 'Wisoria - Quiz',
      description: 'Testez vos connaissances avec un quiz sur Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/quiz/:id', // URL dynamique
      type: 'article',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/email-activate-confirm',
    name: 'EmailActivateConfirm',
    component: emailActivateConfirm,
    meta: {
      title: 'Wisoria - Activation du Compte',
      description: 'Activez votre compte Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/email-activate-confirm',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Wisoria - Profil',
      description: 'Consultez et modifiez votre profil sur Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/profile',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Wisoria - Paramètres',
      description: 'Gérez vos paramètres sur Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/settings',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: PasswordReset,
    meta: {
      title: 'Wisoria - Réinitialisation du Mot de Passe',
      description: 'Réinitialisez votre mot de passe Wisoria.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/password-reset',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNoFound,
    meta: {
      title: 'Wisoria - Page Non Trouvée',
      description: 'La page que vous recherchez n\'existe pas.',
      image: 'https://wisoria.net/wisoria-ico.png',
      url: 'https://wisoria.net/404',
      type: 'website',
      locale: 'fr_FR',
      twitterCard: 'summary_large_image'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🎯 Fonction pour mettre à jour dynamiquement les meta tags
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Wisoria';
  
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', (to.meta.description as string) || '');
  } else {
    const metaTag = document.createElement('meta');
    metaTag.name = 'description';
    metaTag.content = (to.meta.description as string) || '';
    document.head.appendChild(metaTag);
  }

  updateMetaTag('property', 'og:title', to.meta.title as string);
  updateMetaTag('property', 'og:description', to.meta.description as string);
  updateMetaTag('property', 'og:image', to.meta.image as string);
  updateMetaTag('property', 'og:url', to.meta.url as string);
  updateMetaTag('property', 'og:type', to.meta.type as string);
  updateMetaTag('property', 'og:locale', to.meta.locale as string);

  updateMetaTag('name', 'twitter:title', to.meta.title as string);
  updateMetaTag('name', 'twitter:description', to.meta.description as string);
  updateMetaTag('name', 'twitter:image', to.meta.image as string);
  updateMetaTag('name', 'twitter:card', (to.meta.twitterCard as string) || 'summary_large_image');
  updateMetaTag('name', 'twitter:url', to.meta.url as string);

  next();
});

// 🏷️ Fonction pour mettre à jour les meta tags
function updateMetaTag(attr, name, content) {
  if (!content) return;
  let metaTag = document.querySelector(`meta[${attr}="${name}"]`);
  if (metaTag) {
    metaTag.setAttribute('content', content);
  } else {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attr, name);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
}

export default router;
