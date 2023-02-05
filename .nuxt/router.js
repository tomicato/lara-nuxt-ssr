import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2f2be08c = () => interopDefault(import('..\\pages\\404.vue' /* webpackChunkName: "pages/404" */))
const _ebd48498 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _721ce8a0 = () => interopDefault(import('..\\pages\\contact\\index.vue' /* webpackChunkName: "pages/contact/index" */))
const _755966cf = () => interopDefault(import('..\\pages\\empty.vue' /* webpackChunkName: "pages/empty" */))
const _4bb2f74e = () => interopDefault(import('..\\pages\\errors.vue' /* webpackChunkName: "pages/errors" */))
const _638262eb = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5535e377 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _7ef36bde = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _6a8d3c1e = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _10bc0dfc = () => interopDefault(import('..\\pages\\test\\index.vue' /* webpackChunkName: "pages/test/index" */))
const _33013aa0 = () => interopDefault(import('..\\pages\\topics\\index.vue' /* webpackChunkName: "pages/topics/index" */))
const _4ee289dc = () => interopDefault(import('..\\pages\\profile\\feedback\\index.vue' /* webpackChunkName: "pages/profile/feedback/index" */))
const _0e315344 = () => interopDefault(import('..\\pages\\profile\\orders-detail.vue' /* webpackChunkName: "pages/profile/orders-detail" */))
const _19222d0e = () => interopDefault(import('..\\pages\\profile\\settings.vue' /* webpackChunkName: "pages/profile/settings" */))
const _1c3779fc = () => interopDefault(import('..\\pages\\shop\\categories\\index.vue' /* webpackChunkName: "pages/shop/categories/index" */))
const _4c7e908c = () => interopDefault(import('..\\pages\\shop\\products\\index.vue' /* webpackChunkName: "pages/shop/products/index" */))
const _11213e0e = () => interopDefault(import('..\\pages\\topics\\create.vue' /* webpackChunkName: "pages/topics/create" */))
const _725867fc = () => interopDefault(import('..\\pages\\shop\\categories\\create.vue' /* webpackChunkName: "pages/shop/categories/create" */))
const _57bb0fec = () => interopDefault(import('..\\pages\\shop\\categories\\edit.vue' /* webpackChunkName: "pages/shop/categories/edit" */))
const _07874746 = () => interopDefault(import('..\\pages\\shop\\categories\\not_found.vue' /* webpackChunkName: "pages/shop/categories/not_found" */))
const _f3eaeb78 = () => interopDefault(import('..\\pages\\shop\\products\\create.vue' /* webpackChunkName: "pages/shop/products/create" */))
const _33283350 = () => interopDefault(import('..\\pages\\shop\\products\\edit\\_id.vue' /* webpackChunkName: "pages/shop/products/edit/_id" */))
const _6c5459fa = () => interopDefault(import('..\\pages\\profile\\feedback\\_id.vue' /* webpackChunkName: "pages/profile/feedback/_id" */))
const _40a53ebc = () => interopDefault(import('..\\pages\\shop\\products\\_id.vue' /* webpackChunkName: "pages/shop/products/_id" */))
const _eeffb864 = () => interopDefault(import('..\\pages\\shop\\categories\\_category\\_sub.vue' /* webpackChunkName: "pages/shop/categories/_category/_sub" */))
const _b9e62184 = () => interopDefault(import('..\\pages\\shop\\__index.vue' /* webpackChunkName: "pages/shop/__index" */))
const _4035ec43 = () => interopDefault(import('..\\pages\\tags\\_id.vue' /* webpackChunkName: "pages/tags/_id" */))
const _cc4a8058 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _2f2be08c,
    name: "404"
  }, {
    path: "/cart",
    component: _ebd48498,
    name: "cart"
  }, {
    path: "/contact",
    component: _721ce8a0,
    name: "contact"
  }, {
    path: "/empty",
    component: _755966cf,
    name: "empty"
  }, {
    path: "/errors",
    component: _4bb2f74e,
    name: "errors"
  }, {
    path: "/login",
    component: _638262eb,
    name: "login"
  }, {
    path: "/profile",
    component: _5535e377,
    name: "profile"
  }, {
    path: "/register",
    component: _7ef36bde,
    name: "register"
  }, {
    path: "/shop",
    component: _6a8d3c1e,
    name: "shop"
  }, {
    path: "/test",
    component: _10bc0dfc,
    name: "test"
  }, {
    path: "/topics",
    component: _33013aa0,
    name: "topics"
  }, {
    path: "/profile/feedback",
    component: _4ee289dc,
    name: "profile-feedback"
  }, {
    path: "/profile/orders-detail",
    component: _0e315344,
    name: "profile-orders-detail"
  }, {
    path: "/profile/settings",
    component: _19222d0e,
    name: "profile-settings"
  }, {
    path: "/shop/categories",
    component: _1c3779fc,
    name: "shop-categories"
  }, {
    path: "/shop/products",
    component: _4c7e908c,
    name: "shop-products"
  }, {
    path: "/topics/create",
    component: _11213e0e,
    name: "topics-create"
  }, {
    path: "/shop/categories/create",
    component: _725867fc,
    name: "shop-categories-create"
  }, {
    path: "/shop/categories/edit",
    component: _57bb0fec,
    name: "shop-categories-edit"
  }, {
    path: "/shop/categories/not_found",
    component: _07874746,
    name: "shop-categories-not_found"
  }, {
    path: "/shop/products/create",
    component: _f3eaeb78,
    name: "shop-products-create"
  }, {
    path: "/shop/products/edit/:id?",
    component: _33283350,
    name: "shop-products-edit-id"
  }, {
    path: "/profile/feedback/:id",
    component: _6c5459fa,
    name: "profile-feedback-id"
  }, {
    path: "/shop/products/:id",
    component: _40a53ebc,
    name: "shop-products-id"
  }, {
    path: "/shop/categories/:category/:sub?",
    component: _eeffb864,
    name: "shop-categories-category-sub"
  }, {
    path: "/shop/:_index",
    component: _b9e62184,
    name: "shop-_index"
  }, {
    path: "/tags/:id?",
    component: _4035ec43,
    name: "tags-id"
  }, {
    path: "/",
    component: _cc4a8058,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
