Page({
  data: {
    isLogin: false,
    userInfo: null
  },
  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLogin: true,
        userInfo: userInfo
      });
    }
  },
  login: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },
  logout: function () {
    wx.removeStorageSync('userInfo');
    wx.showToast({
      title: '退出登录成功',
      icon: 'success'
    });
    wx.navigateTo({
      url: '/pages/login/login'
    });
  }
});