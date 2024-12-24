<template>
  <router-link
    class='button'
    :to="this.to"
  >
    {{ $t(this.label) }}
  </router-link>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    },
    to: {
      type: String
    }
  }
}
</script>
<style lang='scss'>
.button {
  display: flex;
  margin-right: 0;
  align-items: center;
  padding: 20px 30px;
  height: 30px;
  background-color: var(--main-color-black);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  font-weight: 400;
  white-space: nowrap;
  color: var(--main-color-white);
  &:hover {
    scale: 1.07;
  }
}
</style>