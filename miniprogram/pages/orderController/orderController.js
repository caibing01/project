Page({
  data: {
    userInfo: null,
    orders: []
  },
  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo && userInfo.email) {
      this.setData({ userInfo });
      this.getOrders(userInfo.email); // 传递用户名参数
    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
  },
  getOrders: function (username) { // 接收用户名作为参数
    wx.request({
      url: 'http://localhost:3000/api/orders',
      method: 'GET',
      data: {
        username: username // 将用户名作为参数传递
      },
      header: {
        'Authorization': 'Bearer ' + this.data.userInfo.token
      },
      success: (res) => {
        this.setData({ orders: res.data });
      },
      fail: (err) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  },
  deleteOrder: function (e) {
    const orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:3000/api/orders/' + orderId,
            method: 'DELETE',
            header: {
              'Authorization': 'Bearer ' + this.data.userInfo.token
            },
            success: (res) => {
              if (res.data.success) {
                this.getOrders(this.data.userInfo.email); // 传递用户名参数
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
              } else {
                wx.showToast({
                  title: '删除失败，请重试',
                  icon: 'none'
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '删除失败，请重试',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  }
});
