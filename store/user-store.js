import {
  EventStore
} from '../event-store/index'

import {
  getUserInfo
} from '../service/api_user'

const userStore = new EventStore({
      state: {
        userInfo: {}
      },
      actions: {
        getUserDataAction(ctx, username, password) {
          getUserInfo(username, password).then(res => {
            if(res.code == '0'){
              ctx.userInfo = res["用户信息"]
            }else{
              wx.showToast({
                title: "登录失败，用户名或密码错误",
                icon: 'none',
                duration: 2000
              })
            }
          }).catch(err =>{
            wx.showToast({
              title: err,
              icon: 'error',
              duration: 2000
            })
          })
        },
        }
      })

    export {
      userStore
    }