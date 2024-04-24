// index.js
Page({
	freeTell:function(){
    wx.makePhoneCall({
      phoneNumber: '5201314',
    })
	 },
	 onL:function(){
    var that=this
    wx.showModal({
      title: '提示',
      content: '致电5201314',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.freeTell();
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  data: {
    showLeft: false,
    showRight: false
  },
  showLeftContent: function () {
    this.setData({
      showLeft: true,
      showRight: false
    });
  },
  showRightContent: function () {
    this.setData({
      showLeft: false,
      showRight: true
    });
  }
})
