<template>
  <v-text-field 
    label="ユーザー名を入力"
    placeholder="あなたの表示名"
    outlined
    v-model="setName"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },

  computed: {
    setName: {
      get() {
        return this.name
      },
      set(newVal) {
        return this.$emit('update:name', newVal)
      }
    }
  }
}
</script>

<style>

</style>