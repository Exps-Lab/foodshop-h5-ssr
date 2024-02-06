import request from '@utils/request.js'

export function getRecentAddress (params, ctx) {
  return request({
    url: '/h5/order/auth/getRecentAddress',
    method: 'get',
    params,
    ctx
  })
}

export function getConfirmDetail (params, ctx) {
  return request({
    url: '/h5/order/auth/getConfirmDetail',
    method: 'get',
    params,
    ctx
  })
}

export function createOrder (data, ctx) {
  return request({
    url: '/h5/order/auth/order/create',
    method: 'post',
    data,
    ctx
  })
}

export function getOrderDetail (params, ctx) {
  return request({
    url: '/h5/order/auth/order/detail',
    method: 'get',
    params,
    ctx
  })
}

export function getOrderList (params, ctx) {
  return request({
    url: '/h5/order/auth/order/list',
    method: 'get',
    params,
    ctx
  })
}

export function cancelOrder (data, ctx) {
  return request({
    url: '/h5/order/auth/order/cancel',
    method: 'post',
    data,
    ctx
  })
}
