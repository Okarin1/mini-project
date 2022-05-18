import myRequest from "index";
const BASE_URL = "http://101.43.221.86:88";
export function getSendEmailCode(useremail) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + "/api/giao/user/email",
      method: "POST",
      data: {
        useremail: useremail,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded", // 修改请求
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
export function registerUser(username, password) {
  return myRequest.post("/api/giao/user/save", {
    username,
    password,
  });
}


export function getUserInfo(username, password) {
  return myRequest.post("/api/giao/user/login", {
    username,
    password,
  });
}

export function getUserInfoById(id) {
  return myRequest.get(`/api/giao/user/info/${id}`);
}

export function getUserPostInfoById(userId, page, limit = 10) {
  return myRequest.post("/api/giao/user/posts/info1/", { userId, page, limit });
}

export function getFollowInfoById(userId) {
  return myRequest.post("/api/giao/user/userfollow/findUsersPhoneBySpu", { userId});
}

export function getUserInfoByUserName(username) {
  return myRequest.get(`/api/giao/user/info1/${username}`);
}

export function updateUserInfoById({ id, username, nickname, autograph, age, birthday, gender, headPortrait }) {
  return myRequest.post("/api/giao/user/update", {
    id,
    nickname,
    username,
    autograph,
    age,
    birthday,
    gender,
    headPortrait,
  });
}

export function getNoticeById(id) {
  return myRequest.get(`/api/giao/user/commentorpostsnotice/getNotice/${id}`);
}

export function deleteNoticeById(id) {
  return myRequest.post(`/api/giao/user/commentorpostsnotice/deleteNotice/${id}`);
}

export function deletePostByPostId(postsIds) {
  return myRequest.post("/api/giao/user/posts/delete", [postsIds]);
}
