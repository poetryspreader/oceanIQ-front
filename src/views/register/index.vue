<template>
  <auth-form :type='"register"'/>
</template>
<script>
import authForm from '@/components/auth-form.vue'

export default {
  components: {
    authForm
  }
}
</script>