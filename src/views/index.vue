<template>
  <default-layout>
    <div class='promo'>
      <raznos class='promo__logo' />
      <search-bar class='promo__search' />
    </div>
  </default-layout>
</template>
<script>
import defaultLayout from "@/components/layouts/default.vue";
import searchBar from '@/components/search-bar.vue'
import raznos from '@/components/icons/raznos.vue'
export default {
  components: {
    defaultLayout, searchBar, raznos
  }
}
</script>
<style lang='scss'>
.promo {
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  margin: 60px 0 0 0;
  width: 100%;
  &__logo {
    scale: 2;
  }
  &__search {
    margin: 50px 0 0 0;
  }
}
</style>