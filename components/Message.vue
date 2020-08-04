<template>
  <div :class="['message-container', { 'message-container_author': isAuthor }]">
    <avatar :name="author.name" :color="author.color" size="36px" />
    <div class="message-wrap">
      <div class="message">
        <div v-for="(line, id) in text.split('\n')" :key="id">
          {{ line }}
        </div>
        <div class="date">
          {{ dateFormatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

const isToday = date => new Date().toDateString() === date.toDateString()
const isYesterday = (date) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toDateString() === date.toDateString()
}

export default {
  components: { Avatar },
  props: {
    text: {
      type: String,
      required: true
    },
    isAuthor: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      required: true
    },
    author: {
      type: Object,
      required: true
    }
  },
  computed: {
    dateFormatted ({ date }) {
      const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

      if (isToday(date)) {
        return `Сегодня в ${time}`
      } else if (isYesterday(date)) {
        return `Вчера в ${time}`
      }

      const day = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
      const year = date.toLocaleDateString(undefined, { year: 'numeric' })

      if (new Date().getFullYear() === date.getFullYear()) {
        return `${day} в ${time}`
      }

      return `${day} ${year} в ${time}`
    }
  }
}
</script>

<style scoped>
.message-container {
  display: flex;

  margin: 5px 0;
}

.message-container_author {
  flex-direction: row-reverse;
}

.message-wrap {
  max-width: calc(100% - 42px);
}

.message {
  flex-shrink: 1;

  max-width: 500px;
  margin: 0 6px;
  padding: 10px 10px 6px;

  word-wrap: break-word;

  border-radius: 10px;
  background-color: #efefef;
}

.date {
  font-size: 12px;

  user-select: none;
  text-align: right;

  opacity: .5;
}
</style>
