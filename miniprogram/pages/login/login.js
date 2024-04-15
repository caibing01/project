// pages/login/login.js
Page({
  login: function (e) {
    const { email, password } = e.detail.value;

    // 发起登录请求到后端
    wx.request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      data: {
        email: email,
        password: password
      },
      success: function (res) {
        if (res.statusCode === 200) {
          // 登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });

          // 将用户信息保存到本地缓存
          wx.setStorageSync('userInfo', {
            email: email,
            // 这里可以根据后端返回的其他用户信息进行保存
          });

          // 跳转到订单页面
          wx.navigateTo({
            url: '/pages/order/order'
          });
        } else {
          // 登录失败
          wx.showToast({
            title: '登录失败：' + res.data.error,
            icon: 'none'
          });
        }
      },
      fail: function () {
        // 请求失败
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      }
    });
  },
});
