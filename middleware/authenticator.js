export default async ({ $auth, store, route, redirect }) => {

  // トップページかつユーザーが存在しない場合、何もしない
  if (route.name === 'index' && !$auth.isUserPresent()) {
    return false
  }

  // 以下、トップページでない、またはユーザーが存在する場合の処理

  // 有効期限外の場合
  if (!$auth.isAuthenticated()) {
    let msg = 'ログインが必要です'

    // ユーザーが存在する
    if ($auth.isUserPresent()) {

      // ログイン中のユーザー
      msg = 'もう一度ログインしてください'
      await $auth.logout()                  // ログアウト処理

    } else {

      // ログイン中のユーザーが存在しない
      store.dispatch('getRememberRoute', route) // ログイン前のルートを記録する

    }
    
    store.dispatch('getToast', { msg })

    return redirect('/login')
  
  } else if (!$auth.isUserPresent()) {

    // 有効期限内でユーザーが存在しない場合

    return $auth.unauthError()
  }

}
