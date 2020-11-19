<template>
  <v-snackbar
    v-model="setSnackbar"
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        text
        :color="toast.color"
        @click="resetToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    toast() {
      return this.$store.state.toast
    },

    setSnackbar: {
      get() {
        return !!this.toast.msg
      },
      set(Val) {
        this.resetToast()
        return Val
      }
    }
  },

  beforeDestroy() {
    // ページ遷移前に削除する
    this.resetToast()
  },

  methods: {
    resetToast() {
      return this.$store.dispatch('getToast', { msg: null })
    }
  }
}
</script>

<style>

</style>
