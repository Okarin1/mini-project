export function queryRect(selector) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => {
      resolve(res)
    })
  })
}


export function sortItemByDate(posts) {
  posts.sort((prev, next) => {
    return compareDate(prev, next)
  })
}

// 比对时间
export function compareDate(a, b) {
  const aDateNum = getTimeNum(a.createDate)
  const bDateNum = getTimeNum(b.createDate)
  if (aDateNum === 0 && bDateNum === 0) return 0
  return bDateNum - aDateNum
}

// 获取时间的数字类型
export function getTimeNum(date) {
  const dateNum = !date ? 0 : new Date(date).getTime()
  return dateNum
}