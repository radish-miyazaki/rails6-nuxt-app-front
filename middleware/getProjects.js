export default async ({ $auth, store, $axios }) => {

  // ログイン済み、かつプロジェクト一覧が存在しない時
  if ($auth.isloggedIn && !store.state.projects.length) {
    await $axios.$get('/api/v1/projects')
      .then(response => store.dispatch('getProjects', response))
  }

}