Page({
  data: {
    menuItems: [
      { name: '登录', url: '/pages/login/login' },
      { name: '物业人员信息', url: '/pages/property_staff/property_staff' },
      { name: '评价', url: '/pages/comment/comment' },
      { name: '预约', url: '/pages/order/order' },
      { name: '业主信息', url: '/pages/info/info' }
    ]
  },
  onItemClick: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({ url });
  }
});