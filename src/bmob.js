Bmob.initialize("b0359ad4154cac5660ec396c7411f389", "588a4ae2748d661c915f14c4dff4ac10")

export function queryArticleList(params) {
  return new Promise(function (resolve, reject) {
    var table = Bmob.Object.extend(params)
    var query = new Bmob.Query(table)
    // 查询所有数据
    query.find({
      success: function (results) {
        resolve(results)
      },
      error: function(error) {
        reject('文章加载失败')
      }
    })
  })
}
