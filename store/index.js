function loadLoginsHistory () {
  try {
    return JSON.parse(localStorage.getItem('loginsHistory')) || []
  } catch {
    return []
  }
}

export const state = () => ({
  messages: [],
  user: null,
  loginsHistory: loadLoginsHistory()
})

export const actions = {
  SOCKET_clearHistory ({ commit }) {
    commit('clearHistory')
  }
}

export const mutations = {
  SOCKET_getMessages (state, messages) {
    state.messages = messages.map((message) => {
      message.date = new Date(message.date)
      return message
    })
  },
  SOCKET_onMessage (state, message) {
    message.date = new Date(message.date)
    state.messages.push(message)
  },
  SOCKET_loginUser (state, user) {
    state.user = user
    const idInHistory = state.loginsHistory.findIndex(login => login.id === user.id)
    if (idInHistory !== -1) {
      state.loginsHistory.splice(idInHistory, 1)
    }
    state.loginsHistory.push(user)
    state.loginsHistory = state.loginsHistory.slice(-3)

    localStorage.setItem('loginsHistory', JSON.stringify(state.loginsHistory))
  },
  SOCKET_clearLogins (state) {
    state.loginsHistory = []
    localStorage.removeItem('loginsHistory')
  },
  clearHistory (state) {
    state.messages = []
    state.user = null
  }
}
