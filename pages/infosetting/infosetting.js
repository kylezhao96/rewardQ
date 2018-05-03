Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPic: "../image/wx.jpg",
    userName: "欢迎使用"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.loginStatus == true) {
      //注意，这个写法有漏洞，万一缓存里的头像没了，需要从数据库中读！！！！
      var
        userName = wx.getStorageSync("userName"),
        userPic = wx.getStorageSync("userPic");
      //加载头像昵称
      this.setData({
        userPic: userPic,
        userName: userName
      })
    } else {
      //未登录，提示用户登录
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})