import {
  EventStore
} from '../event-store/index'

import {
  getBrandList
} from '../service/api_phone'
const brandMap = {1: "huaweiList", 2: "iphoneList", 3: "xiaomiList" }

const brandStore = new EventStore({
  state: {
    huaweiList: {}, // 1: 华为
    iphoneList: {}, // 2: 苹果
    xiaomiList: {} // 3: 小米
  },
  actions: {
    getPhoneDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        getBrandList(i,1).then(res => {
          const brandName = brandMap[i]
          ctx[brandName] = res.phoneParams
        })
      }

    }
  }
})

export {
  brandStore
}