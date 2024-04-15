// 在另一个页面的js文件中获取用户信息并展示
Page({
  data: {
    userInfo: {} // 初始化用户信息对象
  },
  onLoad: function() {
    // 获取本地存储中的用户信息
    const userData = wx.getStorageSync('userData');
    // 更新页面中的用户信息数据
    this.setData({
      userInfo: userData
    });
  }
});
