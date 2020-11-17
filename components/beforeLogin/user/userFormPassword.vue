<template>
  <v-text-field 
    label="パスワードを入力"
    v-model="setPassword"
    outlined
    :hide-details="noValidation"
    :counter="!noValidation"
    :rules="form.rules"
    :placeholder="form.placeholder"
    :hint="form.hint"
    :append-icon="toggle.icon"
    :type="toggle.type"
    autocomplete="on"
    @click:append="show = !show"
  />
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    },

    noValidation: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    setPassword: {
      get() {
        return this.password
      },
      set(newVal) {
        return this.$emit('update:password', newVal)
      }
    },

    form() {
      const min = '8文字以上'
      const msg = `${min} 半角英数字・ﾊｲﾌﾝ・ｱﾝﾀﾞｰﾊﾞｰが使えます`
      const required = v => !!v || ''
      const format = v => /^[\w-]{8,72}$/.test(v) || msg

      const rules = this.noValidation ? [required] : [format]
      const hint = this.noValidation ? undefined : msg
      const placeholder = this.noValidation ? undefined : min
      return { rules, hint, placeholder }
    },

    toggle() {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text': 'password'
      return { icon, type }
    }
  },

  data() {
    return {
      show: false
    }
  }
}
</script>

<style>

</style>