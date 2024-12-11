<template>
  <div class="header">
    <font-awesome-icon
      class="header__burger"
      icon="fa-solid fa-bars"
      aria-hidden="true"
    />
    <logo/>
    <search-bar />
    <div class="header__actions">
      <a
        class='sign-up'
        href=''
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
<script setup>
import mainButton from '@/components/buttons/main-btn.vue'
import searchBar from '@/components/search-bar.vue'
import logo from '@/components/logo.vue'

</script>
<style lang="scss">
.header {
  position: fixed;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  .logo {
    margin: 0 0 0 30px;
  }
  &__burger {
    scale: 1.4;
  }
  &__actions {
    position: absolute;
    right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    .sign-up {
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