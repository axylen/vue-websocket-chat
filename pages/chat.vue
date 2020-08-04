<template>
  <div v-if="author" class="container">
    <header class="header">
      <div class="header__container">
        <avatar :name="author.name" :color="author.color" />
        <button class="button" @click="logout">
          Выйти
        </button>
      </div>
    </header>
    <main class="chat-container">
      <messages :messages="messages" :author="author.id" />
    </main>
    <footer class="footer">
      <message-input @send="sendMessage" />
    </footer>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Messages from '@/components/Messages'
import MessageInput from '@/components/MessageInput'

export default {
  components: { Avatar, Messages, MessageInput },
  computed: {
    author () {
      return this.$store.state.user
    },
    messages () {
      return this.$store.state.messages
    }
  },
  mounted () {
    this.$socket.emit('getMessages')
  },
  beforeUpdate () {
    if (!this.author) {
      this.$router.replace('/')
    }
  },
  methods: {
    logout () {
      this.$socket.emit('logoutUser')
      this.$store.commit('clearHistory')
    },
    sendMessage (text) {
      this.$socket.emit('sendMessage', { text, authorId: this.author.id })
      this.$store.commit('SOCKET_onMessage', { text, date: new Date(), author: this.author })
    }
  },
  middleware ({ store, redirect }) {
    if (!store.state.user) {
      redirect('/')
    }
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  z-index: 1;
  top: 0;

  display: flex;
  justify-content: center;

  height: 80px;

  background-color: #efefef;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 820px;
  padding: 0 20px;
}

.chat-container {
  flex-grow: 1;

  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 0 30px;
}

.container {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}

.footer {
  position: sticky;
  bottom: 0;

  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 0 0 16px;

  background-color: #fff;
}

@media (max-width: 820px) {
  .header {
    height: 60px;
  }
  .chat-container {
    padding: 0 8px;
  }
  .footer {
    padding: 0;
  }
}
</style>
