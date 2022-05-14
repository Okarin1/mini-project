export function uploadImage(imgUrl) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'http://101.43.221.86:88/api/giao/user/uploadpic', 
      filePath: imgUrl,
      name: 'imgFile',
      success(res) {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}