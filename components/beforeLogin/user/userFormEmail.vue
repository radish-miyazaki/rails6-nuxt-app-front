<template>
  <v-text-field 
    label="メールアドレスを入力"
    placeholder="your@email.com"
    outlined
    v-model="setEmail"
  />
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    }
  },

  computed: {
    setEmail: {
      get() {
        return this.email
      },
      set(newVal) {
        return this.$emit('update:email', newVal)
      }
    }
  }
}
</script>

<style>

</style>