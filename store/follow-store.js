import { EventStore } from "../event-store/index";

import { getFollowInfoById } from "../service/api_user";

const followStore = new EventStore({
  state: {
    followList: [],
  },
  actions: {
    getFollowDataAction(ctx, id) {
      getFollowInfoById(id).then((res) => {
        if (res.spuInfo) {
          ctx.followList = res.spuInfo;
        }else{
          ctx.followList = [];
        }
      });
    },
  },
});

export { followStore };
