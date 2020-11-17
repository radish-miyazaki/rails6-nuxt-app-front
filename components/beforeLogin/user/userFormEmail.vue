<template>
  <v-text-field 
    label="メールアドレスを入力"
    :placeholder="form.placeholder"
    outlined
    v-model="setEmail"
    :rules="rules"
  />
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },

    noValidation: {
      type: Boolean,
      default: false
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
    },

    form() {
      const placeholder = this.noValidation ? undefined : 'your@email.com'
      return { placeholder }
    }
  },

  data() {
    return {
      rules: [
        v => !!v || '',
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  }
}
</script>

<style>

</style>