Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    toptap: "wxLogin",//绑定登陆函数
    infoitem: [{
      src: "../image/question.png",
      text: "我的问题",
      url: "../itemlist/itemlist?type=myquest"
    }, {
      src: "../image/answer.png",
      text: "我的回答",
      url: "../itemlist/itemlist?type=myanswer"
    }, {
      src: "../image/help.png",
      text: "向我求助",
      url:"../itemlist/itemlist?type=questtome"
    }, {
      src: "../image/success.png",
      text: "擅长领域",
      tips: "填写后优先被推荐",
      url:"../myfield/myfield"
    }, 
    // {
    //   src: "../image/favorite.png",
    //   text: "我的关注"
    // }, 
    {
      src: "../image/dollar.png",
      text: "我的钱包",
      url: "../mywallet/mywallet"
    }],
    setitem: [{
      src: "../image/guide.png",
      text: "用户帮助"
    }],
    // toolitem:[{
    //   src: "../image/clean.png",
    //   text:"清除缓存",
    //   bindtap:"cleanCache"
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginStatus = getApp().globalData.loginStatus;
    if (loginStatus) {
      this.refreshLoginStatus();
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

  },
  /**
   * 自定义函数，用户点击登录按钮事件
   */
  wxLogin: function () {
    var that = this;
    wx.login({
      success: res => {
        var code = res.code;
        //向微信请求成功
        if (code) {
          wx.getUserInfo({
            success: function (res) {
              var userName = res.userInfo.nickName;   //昵称
              var userPic = res.userInfo.avatarUrl; //头像
              //将code发给服务器
              wx.request({
                url: getApp().globalData.serverUrl+'login',
                data: {
                  code: code,
                  name: userName,
                  pic: userPic
                },
                success: function (res) {
                  // console.log(res.data.msg+res.data.userName+res.data.userId);
                  if (res.data.msg == "成功" || res.data.msg == "已存在") {
                    getApp().globalData.loginStatus = true; //将全局登陆态设为真
                    //写入缓存
                    wx.setStorageSync("logs", new Date().toLocaleString())
                    wx.setStorageSync("userName", res.data.userName);
                    wx.setStorageSync("userId", res.data.userId);
                    wx.setStorageSync("userPic", res.data.userPic);

                    //开始刷新页面
                    that.refreshLoginStatus();

                  } else {
                    console.log("fail");

                  }
                },
                fail() {
                  console.log("404,找不到服务器!")
                }
              })
            }
          })
        } else {
          //获取用户登录态失败！
        }
      }
    })
  },
  /**
   * 自定义函数，刷新登录状态
   */
  refreshLoginStatus: function () {
    console.log("执行刷新函数");
    var
      userName = wx.getStorageSync("userName"),
      userPic = wx.getStorageSync("userPic");
    this.setData({
      loginStatus: getApp().globalData.loginStatus,
      userName: userName,
      userPic: userPic
    })

  },
  cleanCache: function () {
    console.log("清理缓存");
    wx.removeStorageSync("logs");
  },

})
