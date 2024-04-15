// pages/propertyStaffList/propertyStaffList.js

Page({
  data: {
    propertyStaffList: [] // 保存从后端获取的物业人员信息
  },

  // 页面加载时请求物业人员信息
  onLoad: function () {
    this.getPropertyStaffList();
  },

  // 发送请求获取物业人员信息
  getPropertyStaffList: function () {
    wx.request({
      url: 'http://localhost:3000/propertyStaffList',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            propertyStaffList: res.data
          });
        } else {
          wx.showToast({
            title: '获取物业人员信息失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none'
        });
        console.error('请求失败：', err);
      }
    });
  }
});
