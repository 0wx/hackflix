import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Movies from '../views/Movies.vue'
import Genres from '../views/Genres.vue'
import Favorited from '../views/Favorited.vue'
import MovieDetail from '../views/MovieDetail.vue'

import { notify } from 'notiwind'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
    },
    {
      path: '/movies/:id',
      name: 'movies-detai',
      component: MovieDetail,
    },
    {
      path: '/genres',
      name: 'genres',
      component: Genres,
    },
    {
      path: '/favorited',
      name: 'favorited',
      component: Favorited,
    },
  ],
})

router.beforeEach((to) => {
  if (
    (to.path === '/login' || to.path === '/signup') &&
    localStorage.access_token
  ) {
    return '/'
  }

  if (to.path === '/favorited' && !localStorage.access_token) {
    notify(
      {
        group: 'error',
        title: 'Error',
        text: 'You need to be logged in first',
      },
      2000
    )
    return { name: 'login', query: { to: to.path } }
  }
})

export default router
