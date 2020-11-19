<template>
  <bef-login-form-card #form-card-content>

    <toaster />

    <v-form
      ref="form"
      v-model="isValid"
    >
      <user-form-email 
        :email.sync="params.auth.email"
        no-validation
      />

      <user-form-password 
        :password.sync="params.auth.password"
        no-validation
      />

      <v-card-actions>
        <nuxt-link
          to="/"
          class="body-2 text-decoration-none"
        >
          パスワードを忘れた？
        </nuxt-link>
      </v-card-actions>

      <v-card-text class="px-8">
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="myblue"
          class="white--text"
          @click="login"
        >
          ログインする
        </v-btn>
      </v-card-text>
    </v-form>
  </bef-login-form-card>
</template>

<script>
export default {
  layout: 'beforeLogin',

  data() {
    return {
      params: {
        auth: {
          email:    '',
          password: ''
        }
      },
      isValid: false,
      loading: false
    }
  },

  methods: {
    
    async login() {
      this.loading = true
      if(this.isValid) {
        await this.$axios.$post('/api/v1/user_token', this.params)
        .then(res => this.authSuccessful(res))
        .catch(error => this.authFailure(error))
      }
      this.loading = false
    },

    // ログイン成功
    async authSuccessful(res) {
      await this.$auth.login(res)
      this.$router.push(this.$store.state.rememberRoute)
    },
    
    // ログイン失敗
    authFailure({ response }) {
      return (response.status === 404)
        ? this.$store.dispatch('getToast', { msg: "ユーザーが見つかりません" })
        : this.$my.errorHandler(response)
    }
  }
}
</script>

<style>

</style>
