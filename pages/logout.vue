<template>
  <div></div>
</template>

<script>
export default {

  // トップページ以外のページではこちらの処理でリダイレクト
  async middleware({ store, redirect, from }) {
    await store.dispatch('logout')
    if (from.name !== 'index') { return redirect('/') }
  },

  // トップページの場合、こちらの処理でリダイレクト
  layout: 'logout',
  beforeCreate() {
    this.$router.replace('/')
  }
}

</script>

