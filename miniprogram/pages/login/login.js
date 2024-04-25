Page({
  login: function (e) {
    const { email, password } = e.detail.value;
    wx.request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      data: {
        email: email,
        password: password
      },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          wx.setStorageSync('userInfo', {
            email: email,
          });
          wx.navigateTo({
            url: '/pages/order/order'
          });
        } else {
          wx.showToast({
            title: '登录失败：' + res.data.error,
            icon: 'none'
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },
});