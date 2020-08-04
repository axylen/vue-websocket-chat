import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default ({ store }) => {
  Vue.use(new VueSocketIO({
    connection: 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))
}
