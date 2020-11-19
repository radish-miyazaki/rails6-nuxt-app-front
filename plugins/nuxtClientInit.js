// Client初期設定ファイル
export default async ({ $auth, $axios, store }) => {
  if ($auth.isAuthenticated()) {
    await $axios.get('/api/v1/users/current_user')
      .then(tokenUser => store.dipatch('getCurrentUser', tokenUser))
      // Cookieはサーバーで削除済み
      .catch(() => $auth.removeStorage())
  }
}
