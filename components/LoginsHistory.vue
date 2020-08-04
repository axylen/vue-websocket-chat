<template>
  <ul v-if="logins.length" class="logins-history">
    <li v-for="nick in logins" :key="nick.id">
      <button class="button logins-history__button" @click="$emit('login', nick)">
        {{ nick.name }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    logins: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.logins-history {
  padding: 0;

  list-style: none;
}

.logins-history__button {
  overflow: hidden;

  width: 100%;
  margin: 3px 0;

  text-overflow: ellipsis;

  border-radius: 5px;
}
</style>
