<template>
  <div
    class="avatar"
    :style="{ backgroundColor: color, width: size, height: size }"
    :title="name"
  >
    {{ name[0] }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#4caf50'
    },
    size: {
      type: String,
      default: '42px'
    }
  }
}
</script>

<style scoped>
.avatar {
  font-size: 20px;
  line-height: 1;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  user-select: none;
  text-transform: uppercase;

  color: #fff;
  border-radius: 50%;
}
</style>
