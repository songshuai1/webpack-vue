export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ './pages/home/index.vue'),
    title: 'home',
    name: ''
  }
]
