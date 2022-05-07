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

// 获取时间的数字类型
export function getTimeNum (date) {
const dateNum = !date ? 0 : new Date(date).getTime()
return dateNum
}
