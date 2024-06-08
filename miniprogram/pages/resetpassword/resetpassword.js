Page({
  data: {
    username: '',
    password: '',
    message: ''
  },
  bindUsernameInput: function(event) { // 修正函数名以更符合变量名
    this.setData({
      username: event.detail.value
    });
  },
  bindPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
  },
  resetPassword: function() {
    const username = this.data.username;
    const password = this.data.password;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      wx.showToast({
        title: '密码至少包含一个字母和一个数字，且至少8个字符',
        icon: 'none'
      });
      return;
    }
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和新密码',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: 'http://localhost:3000/reset-password',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password
      },
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '密码重置成功',
            icon: 'success'
          });
          wx.navigateTo({
            url: '/pages/login/login',
          });
          this.setData({
            message: res.data.message
          });
        } else {
          wx.showToast({
            title: '重置密码失败：' + res.data.message,
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('Failed to reset password:', err);
        wx.showToast({
          title: '重置密码失败',
          icon: 'none'
        });
      }
    });
  }
});
