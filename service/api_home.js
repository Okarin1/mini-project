import myRequest from "index"

const banner = [
  "http://p1.music.126.net/cWwMySSyjZ-N24pbHQduZg==/109951167369941967.jpg",
  "http://p1.music.126.net/2gmbT4-zFpi_TF_nnOBjUg==/109951167368709290.jpg",
  "http://p1.music.126.net/SmJp7vuiOILl1t8lS9o6ew==/109951167368729676.jpg",
  "http://p1.music.126.net/_R3KoKRiGZEJpK6XuQybjw==/109951167369067602.jpg",
  "http://p1.music.126.net/BW0x45V2G1U5eSBASR0vYA==/109951167368737211.jpg",
  "http://p1.music.126.net/0ARJBNp78aw6ihRnsZx_Fw==/109951167368750241.jpg",
  "http://p1.music.126.net/Xr7OLsoy2ywK3scDTVDIhg==/109951167368751495.jpg",
  "http://p1.music.126.net/OwS8NDamftg_Zchwr3gXzA==/109951167368764654.jpg",
  "http://p1.music.126.net/KIN2qt4H6EToFvyg-ZOGaw==/109951167368768073.jpg",
  "http://p1.music.126.net/IYAPjMxrlavLG6R_5287Og==/109951167368776383.jpg",
  "http://p1.music.126.net/nciCtMH66J7mmChyskCWeQ==/109951167368791525.jpg",
  "http://p1.music.126.net/ysmb7xT6ZeaAj0ICuvUQfQ==/109951167358306463.jpg"
]
export function getBanner() {
  return new Promise((resolve, reject) => {
    resolve(banner)
  })
}

export function getRemmedPost(page, limit = 10) {
  return myRequest.post("/api/giao/user/posts/list1", { page, limit })
}

export function sendPostById(userId,type,article,title){
  return myRequest.post("/api/giao/user/posts/save", { userId,type,article,title})
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

export function getPostCommentList(posts_id,page,queryby = "thumbs",limit = 10){
  return myRequest.post("/api/giao/user/comment/info1",{posts_id,page,queryby,limit})
}