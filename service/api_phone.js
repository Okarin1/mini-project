import myRequest from "index"

export function getBrandList(brand,page,limit = 10) {
  return myRequest.post("/api/product/skuinfo/searchPhoneAll/{brandId}", {
    brand,
    page,
    limit
  })
}

export function getRankingList() {
  return myRequest.get("/api/product/rankinglist/list1")
}