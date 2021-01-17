import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: import('@/views/Home.vue'),
    children: [
      { path: '', redirect: { name: 'add' } },
      { path: '/add', name: 'add', component: import('@/components/Add.vue') },
      {
        path: '/edit',
        name: 'edit',
        component: import('@/components/Edit.vue'),
        beforeEnter: (to, from, next) => {
          if (from.path === '/add') {
            next()
          } else {
            next('/add')
          }
        }
      },
      {
        path: '/delete',
        name: 'delete',
        component: import('@/components/Delete.vue')
      },
      {
        path: '/done',
        name: 'done',
        component: import('@/components/Done.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
