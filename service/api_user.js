import myRequest from "index"
export function getUserInfo(username,password) {
  return myRequest.post("/api/giao/user/login", {
    username,
    password
  })
}

export function getUserInfoById(id) {
  return myRequest.get(`/api/giao/user/info/${id}`)
}

export function getUserPostInfoById(id) {
  return myRequest.get(`/api/giao/user/posts/info1/${id}`)
}

export function getUserInfoByUserName(username) {
  return myRequest.get(`/api/giao/user/info1/${username}`)
}

export function updateUserInfoById({id,username,nickname,autograph,age,birthday, gender}) {
  return myRequest.post('/api/giao/user/update', {
    id,
    nickname,
    username,
    autograph,
    age,
    birthday,
    gender
  })
}

export function getNoticeById(id) {
  return myRequest.get(`/api/giao/user/commentorpostsnotice/getNotice/${id}`)
}