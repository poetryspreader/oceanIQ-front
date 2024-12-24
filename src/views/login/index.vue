<template>
  <auth-form :type='"login"'/>
</template>
<script>
import authForm from '@/components/auth-form.vue'
export default {
  components: {
    authForm
  }
}
</script>