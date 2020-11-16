<template>
  <div>
    index.vue
  </div>
</template>

<script>
export default {

  layout({ store }) {
    // ログインしている場合'default'を、ログインしていない場合'welcome'を返す
    return store.state.loggedIn ? 'default' : 'welcome'
  }
  
}
</script>