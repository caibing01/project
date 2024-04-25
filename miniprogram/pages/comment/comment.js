Page({
  data: {
      propertyStaffs: [],
      selectedPropertyStaffIndex: 0,
      comments: [],
      commentContent: ''
  },
  onLoad: function () {
      this.getPropertyStaffs();
      this.getComments();
  },
  getPropertyStaffs: function () {
      wx.request({
          url: 'http://localhost:3000/comments/propertyStaffs',
          success: (res) => {
              const staffs = res.data;
              this.setData({
                  propertyStaffs: staffs
              });
          },
          fail: (err) => {
              console.error('Failed to get property staffs:', err);
          }
      });
  },
  getComments: function () {
      wx.request({
          url: 'http://localhost:3000/comments/list',
          success: (res) => {
              const comments = res.data;
              this.setData({
                  comments: comments
              });
          },
          fail: (err) => {
              console.error('Failed to get comments:', err);
          }
      });
  },
  selectPropertyStaff: function (e) {
      const index = e.detail.value;
      this.setData({
          selectedPropertyStaffIndex: index
      });
  },
  inputComment: function (e) {
      this.setData({
          commentContent: e.detail.value
      });
  },
  submitComment: function () {
      const { commentContent, propertyStaffs, selectedPropertyStaffIndex } = this.data;
      const username = wx.getStorageSync('userInfo').email;
      const staff = propertyStaffs[selectedPropertyStaffIndex];
      if (!commentContent.trim()) {
          wx.showToast({
              title: '请输入评论内容',
              icon: 'none'
          });
          return;
      }
      wx.request({
          url: 'http://localhost:3000/comments/submit',
          method: 'POST',
          data: {
              username: username,
              staff: staff,
              comment: commentContent
          },
          success: (res) => {
              if (res.statusCode === 200) {
                  this.getComments();
                  this.setData({
                      commentContent: ''
                  });
              } else {
                  wx.showToast({
                      title: '评论失败',
                      icon: 'none'
                  });
              }
          },
          fail: (err) => {
              console.error('Failed to submit comment:', err);
              wx.showToast({
                  title: '评论失败',
                  icon: 'none'
              });
          }
      });
  }
});