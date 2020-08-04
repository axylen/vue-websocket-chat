<template>
  <div class="input-container">
    <textarea v-model="message" class="input" placeholder="Сообщение" @keydown.enter.ctrl.prevent="newLine" @keydown.exact.enter.prevent="sendMessage(message)" />
    <button class="send-button" @click="sendMessage(message)">
      <svg class="send-icon">
        <use href="/icons.svg#paper-plane" />
      </svg>
    </button>
  </div>
</template>

<script>
import formatText from '@/lib/formatText'

export default {
  data: () => ({
    message: ''
  }),
  methods: {
    newLine () {
      this.$data.message += '\n'
    },
    sendMessage (text) {
      text = formatText(text)
      if (text) {
        this.$emit('send', text)
        this.$data.message = ''
      }
    }
  }
}
</script>

<style scoped>
.input-container {
  display: flex;

  width: 100%;
  height: 83px;
  padding: 6px 10px;

  transition: border-color .08s ease-in-out;

  border: 2px solid transparent;
  border-radius: 10px;
  background-color: #efefef;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, .2);
}

.input-container:focus-within {
  border-color: #2196f3;
}

.input {
  width: 100%;

  resize: none;

  border: none;
  outline: none;
  background: none;
}

.input::-webkit-scrollbar {
  width: 6px;
}

.input::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, .25);
}

.input::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, .35);
}

.send-button {
  align-self: center;
  flex-shrink: 0;

  width: 60px;
  height: 60px;
  margin-left: 10px;

  cursor: pointer;
  transition: color .15s ease-in-out;

  color: #aaa;
  border: none;
  outline: none;
}

.send-button:hover,
.send-button:focus {
  color: #2196f3;
}

.send-icon {
  width: 34px;
  height: 34px;
  margin: 8px 12px 0 0;

  fill: currentColor;
}

@media (max-width: 820px) {
  .input-container {
    height: 63px;

    border-radius: 0;
  }
  .send-button {
    width: 45px;
    height: 45px;
  }
  .send-icon {
    width: 26px;
    height: 26px;
  }
}
</style>
