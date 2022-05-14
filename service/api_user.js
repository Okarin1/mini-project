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

export function getUserPostInfoById(userId,page,limit = 10) {
  return myRequest.post("/api/giao/user/posts/info1/",{userId,page,limit})
}

export function getUserInfoByUserName(username) {
  return myRequest.get(`/api/giao/user/info1/${username}`)
}

export function updateUserInfoById({id,username,nickname,autograph,age,birthday, gender,headPortrait}) {
  return myRequest.post('/api/giao/user/update', {
    id,
    nickname,
    username,
    autograph,
    age,
    birthday,
    gender,
    headPortrait
  })
}

export function getNoticeById(id) {
  return myRequest.get(`/api/giao/user/commentorpostsnotice/getNotice/${id}`)
}

export function deleteNoticeById(id) {
  return myRequest.post(`/api/giao/user/commentorpostsnotice/deleteNotice/${id}`)
}