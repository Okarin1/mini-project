import myRequest from "index"

export function getBrandList(brand, page, limit = 10) {
  return myRequest.post("/api/product/skuinfo/searchPhoneAll/{brandId}", {
    brand,
    page,
    limit
  })
}

export function getRankingList() {
  return myRequest.get("/api/product/rankinglist/list1")
}

export function getPhoneInfoById(spuId) {
  return myRequest.get(`/api/product/spuinfodesc/info/${spuId}`,)
}

export function getPhoneParamById(spuId) {
  return myRequest.get(`/api/product/skuinfo/attrAndGroup/${spuId}`)
}

export function getPhoneCommentList(phone_id,page,queryby = "create_date",limit = 5){
  return myRequest.post("/api/giao/user/comment/info1",{phone_id,page,queryby,limit})
}

export function sendPhoneComment(phoneId,userId,userComment){
  return myRequest.post("/api/giao/user/comment/save",{phoneId,userId,userComment})
}

export function checkUserFollow(spuId,userId){
  return myRequest.post("/api/giao/user/userfollow/checkFollow",{spuId,userId})
}

export function followPhone(spuId,userId){
  return myRequest.post("/api/giao/user/userfollow/save",{spuId,userId})
}

export function searchPhone(name){
  return myRequest.get(`/api/product/spuinfo/search/${name}`)
}