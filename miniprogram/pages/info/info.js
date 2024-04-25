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