import Vue from 'vue'
import Router from 'vue-router'
import Music from '@/views/Music'
import SongMenu from '@/views/SongMenu'
import musiclist from '@/views/MusicList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'music',
      component: Music
    },
    {
      path: '/songmenu',
      name: 'songmenu',
      component: SongMenu
    },
    {
      path: '/musicList',
      name: 'musiclist',
      component: musiclist
    }
  ]
})
