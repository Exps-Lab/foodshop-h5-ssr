import request from '@utils/request.js'

export function getShopDetail (params, ctx) {
  return request({
    url: '/h5/sale/noauth/shop/detail',
    method: 'get',
    params,
    ctx
  })
}

export function getShopGoods (params) {
  return request({
    url: '/h5/sale/noauth/shop/getGoods',
    method: 'get',
    params
  })
}

export function searchShopGoods (params) {
  return request({
    url: '/h5/sale/noauth/shop/searchGoods',
    method: 'get',
    params
  })
}

// 创建购物袋
export function addShoppingBag (data, ctx) {
  return request({
    url: '/h5/sale/auth/shop/shoppingBag/add',
    method: 'post',
    data,
    ctx
  })
}
