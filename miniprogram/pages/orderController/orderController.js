// pages/orderList/orderList.js

Page({
  data: {
    userInfo: null,
    orders: []
  },

  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo });
      this.getOrders();
    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
  },

  getOrders: function () {
    wx.request({
      url: 'http://localhost:3000/api/orders',
      method: 'GET',
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

  completeOrder: function (e) {
    const orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定完成该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:3000/api/orders/' + orderId + '/complete',
            method: 'PUT',
            header: {
              'Authorization': 'Bearer ' + this.data.userInfo.token
            },
            success: (res) => {
              if (res.data.success) {
                this.getOrders();
                wx.showToast({
                  title: '订单已完成',
                  icon: 'success'
                });
              } else {
                wx.showToast({
                  title: '操作失败，请重试',
                  icon: 'none'
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '操作失败，请重试',
                icon: 'none'
              });
            }
          });
        }
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
                this.getOrders();
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
  },

  editOrder: function (e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/edit-order/edit-order?id=' + orderId,
    });
  }
});
