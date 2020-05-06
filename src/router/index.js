import Vue from 'vue'
import Router from 'vue-router'
import ToDo from '@/components/ToDo'
import Notes from '@/components/Notes'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo',
      component: ToDo
    },
    {
      path: '/notes/:groupName',
      name: 'notes',
      component: Notes
    }
  ]
})
