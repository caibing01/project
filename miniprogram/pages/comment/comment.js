// pages/comments/comments.js
Page({
  data: {
      propertyStaffs: [], // 物业人员列表
      selectedPropertyStaffIndex: 0, // 已选择的物业人员下标
      comments: [], // 评论列表
      commentContent: '' // 输入的评论内容
  },

  onLoad: function () {
      // 获取物业人员名单列表
      this.getPropertyStaffs();
      // 获取评论列表
      this.getComments();
  },

  // 获取物业人员名单列表
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

  // 获取评论列表
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

  // 选择物业人员
  selectPropertyStaff: function (e) {
      const index = e.detail.value;
      this.setData({
          selectedPropertyStaffIndex: index
      });
  },

  // 输入评论内容
  inputComment: function (e) {
      this.setData({
          commentContent: e.detail.value
      });
  },

  // 提交评论
  submitComment: function () {
      const { commentContent, propertyStaffs, selectedPropertyStaffIndex } = this.data;
      const username = wx.getStorageSync('userInfo').email;
      const staff = propertyStaffs[selectedPropertyStaffIndex];

      // 校验评论内容是否为空
      if (!commentContent.trim()) {
          wx.showToast({
              title: '请输入评论内容',
              icon: 'none'
          });
          return;
      }

      // 发起请求提交评论
      wx.request({
          url: 'http://localhost:3000/comments/submit',
          method: 'POST',
          data: {
              username: username,
              staff: staff,
              comment: commentContent
          },
          success: (res) => {
              // 提交成功，重新获取评论列表
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
