import { EventStore } from "../event-store/index";

import { getNoticeById, deleteNoticeById } from "../service/api_user";

const noticeStore = new EventStore({
  state: {
    commentNoticeList: [],
    thumbsNoticeList: [],
    noticeList: [],
  },
  actions: {
    getNoticeDataAction(ctx, id, username) {
      getNoticeById(id).then((res) => {
        if ((res.msg = "success")) {
          let commentNoticeList = res.postsCommentNotice.filter((res) => {
            return res.username != username;
          });
          ctx.commentNoticeList = commentNoticeList;
          let thumbsNoticeList = res.thumbsNotice.filter((res) => {
            return res.username != username;
          });
          ctx.thumbsNoticeList = thumbsNoticeList;
          ctx.noticeList = commentNoticeList.concat(thumbsNoticeList);
        }
      });
    },
  },
});

export { noticeStore };
