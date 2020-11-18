class MyInject {
  constructor(app) {
    this.app = app
  }

  // i18nページタイトル変更
  pageTitle(routeName) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return (typeof(title) === 'object') ? title.index : title
  }

  // 日付のformatを変更
  format(date) {
    const dateTimeFormat =  new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(date))
  }

  // プロジェクトごとのリンクを生成する
  projectLinkTo (id, name = 'project-id-dashboard') {
    return { name, params: { id } }
  }
}

export default ({ app }, inject) => {
  inject('my', new MyInject(app))
}
