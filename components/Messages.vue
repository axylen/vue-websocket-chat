<template>
  <div class="chat">
    <message
      v-for="message in messages"
      :key="message.id"
      :text="message.text"
      :is-author="message.author.id === author"
      :author="message.author"
      :date="message.date"
    />
  </div>
</template>

<script>
import Message from '@/components/Message'

export default {
  components: { Message },
  props: {
    messages: {
      type: Array,
      required: true
    },
    author: {
      type: String,
      default: ''
    }
  },
  updated () {
    const curScrollPos = window.scrollY
    const viewportHeight = window.innerHeight
    const scrollHeight = document.body.scrollHeight

    const scrollDiff = scrollHeight - (curScrollPos + viewportHeight)

    if (scrollDiff < 220) {
      window.scrollTo({ top: scrollHeight })
    }
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 15px 0;
}
</style>
