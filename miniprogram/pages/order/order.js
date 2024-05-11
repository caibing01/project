Page({
  data: {
    username: '',
    datetime: '',
    category: '',
    staff: null,
    address: '',
    staffList: [],
    staffIndex: 0,
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      const username = userInfo.email;
      this.setData({ username });
    } else {
    }
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({ datetime: `${year}-${month}-${day}` });
    wx.request({
      url: 'http://localhost:3000/staff',
      success: (res) => {
        const staffList = res.data.map(staff => staff.name);
        this.setData({ staffList });
      },
      fail: (err) => {
        console.error('Error fetching property staffs:', err);
        wx.showToast({
          title: '获取物业人员列表失败',
          icon: 'none'
        });
      }
    });
  },
  bindDateTimeChange(e) {
    this.setData({ datetime: e.detail.value });
  },
  inputCategory(e) {
    this.setData({ category: e.detail.value });
  },
  inputAddress(e) {
    this.setData({ address: e.detail.value });
  },
  bindStaffChange(e) {
    this.setData({ staffIndex: e.detail.value });
  },
  submitOrder(e) {
    const { username, datetime, category, staffList, staffIndex, address } = this.data;
    const staff = staffList[staffIndex];
    if (!username || !datetime || !category || !staff || !address) {
      wx.showToast({
        title: '请填写完整报修单信息',
        icon: 'none'
      });
      return;
    }
    wx.request({
      url: 'http://localhost:3000/orders',
      method: 'POST',
      data: {
        username,
        datetime,
        category,
        staff,
        address
      },
      success: (res) => {
        wx.showToast({
          title: '报修单创建成功',
          icon: 'success',
          duration: 2000,
          complete: () => {
            this.setData({
              category: '',
              staff: null,
              address: ''
            });
          }
        });
      },
      fail: (err) => {
        console.error('Error creating order:', err);
        wx.showToast({
          title: '报修单创建失败，请重试',
          icon: 'none'
        });
      }
    });
  },
  return:function(){
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});