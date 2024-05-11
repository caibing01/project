Page({
  data: {
    userInfo: {}
  },
  onLoad: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo && userInfo.email) {
      this.getUserInfo(userInfo.email);
    } else {
      console.error('User email not found in local storage');
    }
  },
  button:function(){
    wx.showModal({
      title: '功能还在开发中！',
      content: '功能还在开发中！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },
  getUserInfo: function(email) {
    wx.request({
      url: 'http://localhost:3000/users/' + email,
      method: 'GET',
      success: (res) => {
        console.log('User Info:', res.data);
        this.setData({
          userInfo: res.data
        });
      },
      fail: (error) => {
        console.error('Failed to fetch user info:', error);
      }
    });
  }
});