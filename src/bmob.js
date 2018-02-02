Bmob.initialize("b0359ad4154cac5660ec396c7411f389", "588a4ae2748d661c915f14c4dff4ac10")


// 查找文章列表，可以带参数
export function queryArticleList (config = {}) {
  return new Promise(function (resolve, reject) {
    var table = Bmob.Object.extend('article_list')
    var query = new Bmob.Query(table)
    if (config.columnId) {
      query.equalTo("columnId", config.columnId)
    } else if (config.userId) {
      query.equalTo("userId", config.userId)
    }
    // 查询所有数据
    query.find({
      success: function (result) {
        let articleList = []
        for (let i = 0; i < result.length; i++) {
          let object = result[i].attributes
          object.tags = object.tags.split('，')
          object.ID = result[i].id
          object.date = result[i].updatedAt
          articleList.push(object)
        }
        resolve(articleList)
      },
      error: function (error) {
        reject('文章加载失败')
      }
    })
  })
}

// 查找文章，带文章ID，带用户头像
export function queryOneArticle (articleId) {
  return new Promise(function (resolve, reject) {
    var table = Bmob.Object.extend('article_list')
    var query = new Bmob.Query(table)
    query.get(articleId, {
      success: function (result) {
        let object = result.attributes
        object.tags = object.tags.split('，')
        object.ID = result.id
        object.date = result.updatedAt
        resolve(object)
      },
      error: function (error) {
        reject('文章加载失败')
      }
    })
  })
}

// 查找某一个用户
export function queryOneUser (userId = 'BAYj5556') {
  return new Promise(function (resolve, reject) {
    var User = Bmob.Object.extend('_User')
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(User)
    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(userId, {
      success: function (result) {
        // 查询成功，调用get方法获取对应属性的值
        resolve(result.attributes)
      },
      error: function (object, error) {
        // 查询失败
        reject('用户查找失败')
      }
    });
  })
}
