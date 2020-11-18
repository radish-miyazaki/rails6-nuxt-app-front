<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'loggedIn',

  // 自動生成される/accountパスを無効化
  validate({ route }) {
    return route.name !== 'account'
  }
}
</script>

<style>

</style>