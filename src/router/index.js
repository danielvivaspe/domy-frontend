import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'app.home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        middleware: 'auth',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/room/:room',
      name: 'room',
      component: () => import('@/views/room/RoomMain.vue'),
      meta: {
        pageTitle: '{{room}}',
        middleware: 'auth',
        breadcrumb: [
          {
            text: 'Rooms',
            active: false,
          },
          {
            text: '{{room}}',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'auth.login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
        middleware: 'guest',
        pageTitle: 'Login',
      },
    },
    {
      path: '/error-404',
      name: 'errors.404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeResolve((to, from, next) => {
  const regex = to.meta.pageTitle.match('{{(.*)}}')
  if (regex != null) {
    const [, param] = regex
    document.title = `${to.params[param]} - ${process.env.VUE_APP_NAME}`
  } else {
    document.title = `${to.meta.pageTitle} - ${process.env.VUE_APP_NAME}`
  }

  if (to.meta.middleware === 'guest') {
    if (router.app.$store.state.auth.authenticated) {
      next({ name: 'app.home' })
    }
    next()
  } else if (router.app.$store.state.auth.authenticated) {
    next()
  } else {
    next({ name: 'auth.login' })
  }
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
