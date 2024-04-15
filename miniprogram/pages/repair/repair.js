// repair.js（tarbar界面）

Page({
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo'); // 从本地缓存中获取用户信息
    // 判断用户是否已登录
    if (!userInfo || !userInfo.email) {
      // 用户未登录，弹出提示框
      wx.showModal({
        title: '提示',
        content: '您还未登录，请登录后进行报修',
        confirmText: '去登录',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            // 用户点击确定，跳转到登录界面
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            // 用户点击取消，跳转到首页
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      // 用户已登录，强制跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
  }
})
