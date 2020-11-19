const storage = window.localStorage
const keys = { exp: 'exp' }
const cryptoJs = require('crypto-js')

class Authentication {
  constructor(ctx) {
    this.store =    ctx.store
    this.$axios =   ctx.$axios
    this.error =    ctx.error
    this.$config =  ctx.$config
  }

  // 有効期限を暗号化
  encrypt(exp) {
    const expire = String(exp * 1000)
    return cryptoJs.AES.encrypt(expire, this.$config.cryptoKey).toString()
  }

  // 暗号化された有効期限を復号化
  // 復号に失敗した場合、localStorageから削除
  decrypt(exp) {
    try{
      const bytes = cryptoJs.AES.decrypt(exp, this.$config.cryptoKey)
      return bytes.toString(cryptoJs.enc.UTF8) || this.removeStorage()
    } catch(e) {
      return this.removeStorage()
    }
  }

  // 有効期限をlocalStorageに保存
  // 暗号化した値を保存するように変更
  setStorage(exp) {
    storage.setItem(keys.exp, this.encrypt(exp)) 
  }

  // localStorageから削除
  removeStorage() {
    for (const key of Object.values(keys)) {
      storage.removeItem(key)
    }
  }

  // localStorageから有効期限を返す
  // localStorageに存在する場合は、復号化した値を返す
  // 存在しない場合には、nullを返す
  getExpire() {
    const expire = storage.getItem(keys.exp)
    return expire ? this.decrypt(expire) : null
  }

  // 有効期限内であるか確認する
  isAuthenticated() {
    return new Date().getTime() < this.getExpire()
  }

  // Vuexのユーザーを返す
  // getを用いて、プロパティとして追加する
  get user() {
    return this.store.state.current.user || {}
  }

  // ユーザーオブジェクトがある場合にtrueを返す
  isUserPresent() {
    return ('id' in this.user)
  }

  // 有効期限内、かつユーザーが存在する場合のみtrueを返す
  get isloggedIn() {
    return this.isAuthenticated() && this.isUserPresent()
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
export default ({ store, $axios, error, $config }, inject) => {
  inject('auth', new Authentication({ store, $axios, error, $config }))
}

