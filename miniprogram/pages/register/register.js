Page({
  register: function (e) {
    const { username, phoneNumber, email, password, confirmPassword } = e.detail.value;
    const phoneReg = /^1[0-9]{2}-[0-9]{3}-[0-9]{4}$/;
    if (!phoneReg.test(phoneNumber)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }
    const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!emailReg.test(email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none'
      });
      return;
    }
    if (password.length < 6 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      let message = '密码复杂度过低，请确保密码至少包含一个字母和一个数字，并且长度不少于6个字符。建议使用包含字母、数字和特殊字符的复杂密码。';
      wx.showModal({
        title: '密码提示',
        content: message,
        showCancel: false
      });
      return;
    }
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      });
      return;
    }
    wx.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      data: {
        username,
        phoneNumber,
        email,
        password
      },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          });
          wx.setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }, 3000);
        } else {
          wx.showToast({
            title: '注册失败：' + res.data.error,
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
  }
});