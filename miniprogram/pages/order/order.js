// pages/order/order.js
Page({
  data: {
    category: '',
    selectedDate: '',
    staffs: [], // 物业人员名单列表
    selectedStaff: '', // 已选择的物业人员
  },

  onLoad: function() {
    // 获取物业人员名单
    this.getPropertyStaffs();
  },

  getPropertyStaffs: function() {
    wx.request({
      url: 'http://localhost:3000/propertyStaffs',
      success: (res) => {
        const staffs = res.data;
        this.setData({
          staffs: staffs,
          selectedStaff: staffs[0] // 默认选择第一个物业人员
        });
      },
      fail: (err) => {
        console.error('Failed to get property staffs:', err);
      }
    });
  },

  bindStaffChange: function(e) {
    const index = e.detail.value;
    const selectedStaff = this.data.staffs[index];
    this.setData({
      selectedStaff: selectedStaff
    });
  },

  bindCategoryInput: function(e) {
    const category = e.detail.value;
    this.setData({
      category: category
    });
  },

  bindDateChange: function(e) {
    const selectedDate = e.detail.value;
    this.setData({
      selectedDate: selectedDate
    });
  },

  submitOrder: function() {
    // 获取当前用户信息（邮箱作为用户名）
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.showToast({
        title: '用户信息缺失，请重新登录',
        icon: 'none'
      });
      wx.navigateTo({
        url: '/pages/login/login'
      });
      return;
    }

    // 从页面获取用户选择的类目和日期
    const { category, selectedDate, selectedStaff } = this.data;

    // 校验用户输入是否合法
    if (!category || !selectedDate || !selectedStaff) {
      wx.showToast({
        title: '请输入类目、日期和物业人员',
        icon: 'none'
      });
      return;
    }

    // 构造订单信息
    const orderInfo = {
      username: userInfo.email, // 使用邮箱作为用户名
      category: category,
      datetime: selectedDate,
      staff: selectedStaff
    };

    // 发起请求提交订单信息
    wx.request({
      url: 'http://localhost:3000/order/submit',
      method: 'POST',
      data: orderInfo,
      success: (res) => {
        wx.showToast({
          title: '订单提交成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('Failed to submit order:', err);
        wx.showToast({
          title: '订单提交失败，请稍后重试',
          icon: 'none'
        });
      }
    });
  },
  back(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
});
