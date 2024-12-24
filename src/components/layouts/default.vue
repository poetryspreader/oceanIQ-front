<template>
  <div class="header">
    <telegram />
    <div class="header__actions">
      <a
        class='sign-up'
        href='/register'
      >
        {{ $t('header.sign-up') }}
      </a>
      <main-button
        :label='"header.sign-in"'
        :to='"/login"'
      />
    </div>
  </div>
  <slot></slot>
</template>
<script>
import mainButton from '@/components/buttons/main-btn.vue'
import logo from '@/components/logo.vue'
import telegram from '@/components/icons/telegram.vue'
export default {
  components: {
    mainButton, logo, telegram
  }
}
</script>
<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &__burger {
    scale: 1.4;
  }
  &__actions {
    margin: 0 0 0 30px;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    .sign-up {
      white-space: nowrap;
      text-decoration: none;
      color: var(--main-color-black);
      transition: all 1s;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>