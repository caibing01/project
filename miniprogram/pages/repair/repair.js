Page({
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo || !userInfo.email) {
      wx.showModal({
        title: '提示',
        content: '您还未登录，请登录后进行报修',
        confirmText: '去登录',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
  }
})