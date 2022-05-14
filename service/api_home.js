import myRequest from "index"

const banner = [
  "https://s1.ax1x.com/2022/05/11/OUcAL4.png",
  "https://s1.ax1x.com/2022/05/11/OUcAL4.png",
  "https://s1.ax1x.com/2022/05/11/OUcAL4.png",
  "https://s1.ax1x.com/2022/05/11/OUcAL4.png",
  "https://s1.ax1x.com/2022/05/11/OUcAL4.png",
  "https://s1.ax1x.com/2022/05/11/OUcAL4.png"
]
export function getBanner() {
  return new Promise((resolve, reject) => {
    resolve(banner)
  })
}

export function getRemmedPost(page, limit = 10) {
  return myRequest.post("/api/giao/user/posts/list1", { page, limit })
}

export function sendPostById(userId,type,article,image,title){
  return myRequest.post("/api/giao/user/posts/save", { userId,type,article,image,title})
}

export function getPostByType(page,type,limit = 10) {
  return myRequest.post("/api/giao/user/posts/list1", { page,type, limit })
}

export function thumbPost(postsId,userId) {
  return myRequest.post("/api/giao/user/poststhumbs/thumbsPosts", {postsId,userId})
}

export function checkThumbsPosts(postsId,userId) {
  return myRequest.post("/api/giao/user/poststhumbs/checkThumbsPosts", {postsId,userId})
}

export function getPostByPostId(postsId) {
  return myRequest.get(`/api/giao/user/posts/info/${postsId}`)
}

export function getPostThumbsList(postsId){
  return myRequest.get(`/api/giao/user/poststhumbs/checkThumbsUsers/${postsId}`)
}

export function getPostCommentList(posts_id,page,queryby = "create_date",limit = 10){
  return myRequest.post("/api/giao/user/comment/info1",{posts_id,page,queryby,limit})
}

export function sendPostComment(postsId,userId,userComment){
  return myRequest.post("/api/giao/user/comment/save",{postsId,userId,userComment})
}
