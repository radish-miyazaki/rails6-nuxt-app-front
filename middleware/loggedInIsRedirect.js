export default ({ $auth, route, redirect }) => {
  // ログイン後のユーザーのリダイレクト処理
  const loggedInUserNotAccess = ['signup', 'login']
  
  if ($auth.isloggedIn && loggedInUserNotAccess.includes(route.name)) {
    return redirect('/')
  }
}
