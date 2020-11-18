const storage = window.localStorage
const keys = { exp: 'exp' }

class Authentication {
  constructor(ctx) {
    this.store = ctx.store
    this.$axios = ctx.$axios
  }

  // 有効期限をlocalStorageに保存
  setStorage(exp) {
    storage.setItem(keys.exp, exp * 1000) // 1000msに変換して保存
  }

  // localStorageから削除
  removeStorage() {
    for (const key of Object.values(keys)) {
      storage.removeItem(key)
    }
  }

  // localStorageから有効期限を返す
  getExpire() {
    return storage.getItem(keys.exp)
  }

  // 有効期限内であるか確認する
  isAuthenticated() {
    return new Data().getTime() < this.getExpire()
  }

  // ログイン
  login({ exp, user }) {
    this.setStorage(exp)                        // 有効期限をlocalStorageに保存
    this.store.dispatch('getCurrentUser', user) // ユーザーをVuexに保存
  }

  // ログアウト
  logout() {
    this.$axios.$delete('/api/v1/user_token')   // アクセストークンの削除
    this.removeStorage()                        // localStorageから有効期限を消去
    this.store.dispatch('getCurrentUser', null) // Vuexのユーザーをnull
  }
}
export default ({ store, $axios }, inject) => {
  inject('auth', new Authentication({ store, $axios }))
}

