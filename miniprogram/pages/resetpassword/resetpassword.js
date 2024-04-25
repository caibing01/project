Page({
  data: {
    email: '',
    password: '',
    message: ''
  },
  bindEmailInput: function(event) {
    this.setData({
      email: event.detail.value
    });
  },
  bindPasswordInput: function(event) {
    this.setData({
      password: event.detail.value
    });
  },
  resetPassword: function() {
    const email = this.data.email;
    const password = this.data.password;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!email || !password) {
      wx.showToast({
        title: '请输入邮箱和新密码',
        icon: 'none'
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      wx.showToast({
        title: '密码至少包含一个字母和一个数字，且至少8个字符',
        icon: 'none'
      });
      return;
    }
    if (!email || !password) {
      wx.showToast({
        title: '请输入邮箱和新密码',
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
        email: email,
        password: password
      },
      success: (res) => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        console.log(res.data);
        this.setData({
          message: res.data.message
        });
      },
      fail: (err) => {
        console.error('Failed to reset password:', err);
        this.setData({
          message: '重置密码失败'
        });
      }
    });
  }
});