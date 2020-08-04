<template>
  <div class="container">
    <h2 class="heading">
      Войти в чат
    </h2>
    <form @submit.prevent="loginNewUser(login)">
      <input
        v-model="login"
        type="text"
        placeholder="Имя"
        class="text-input"
        minlength="2"
        maxlength="20"
        required
      >
    </form>
    <logins-history :logins="loginsHistory" @login="loginOldUser" />
    <button v-if="loginsHistory.length" class="button" @click="clearHistory">
      Очистить историю
    </button>
  </div>
</template>

<script>
import LoginsHistory from '@/components/LoginsHistory'
import formatText from '@/lib/formatText'

export default {
  components: { LoginsHistory },
  data: () => ({
    login: ''
  }),
  computed: {
    loginsHistory () {
      return this.$store.state.loginsHistory.slice().reverse()
    }
  },
  methods: {
    loginNewUser (name) {
      name = formatText(name)
      if (name) {
        this.$socket.emit('createUser', name, () => this.$router.push('/chat'))
      }
    },
    loginOldUser ({ name, id }) {
      this.$socket.emit('loginUser', { name, id }, () => this.$router.push('/chat'))
    },
    clearHistory () {
      if (confirm('Очистить историю логинов и сообщений?')) {
        this.$socket.emit('clearHistory')
      }
    }
  },
  middleware ({ store, redirect }) {
    if (store.state.user) {
      redirect('/chat')
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 260px;
  min-height: 100vh;
  margin: 0 auto;

  text-align: center;
}

.heading {
  font-size: 20px;
  font-weight: 400;

  margin: 0 0 25px;
}

.text-input {
  width: 100%;
  padding: 14px 20px;

  transition: border-color .08s ease-in-out;

  border: 2px solid transparent;
  border-radius: 10px;
  outline: none;
  background-color: #efefef;
}

.text-input:focus {
  border-color: #2196f3;
}
</style>
