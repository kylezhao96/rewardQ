// pages/mywallet/mywallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccount();
    this.getBill();
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
   * 获取账单
   */
  getBill:function(){
    var that= this;
    wx.request({
      url: getApp().globalData.serverUrl +'/getuserbill',
      data:{
        userId:wx.getStorageSync("userId")
      },
      success:function(res){
        console.log(res);
        var json=[];
        res.data.forEach(function(element){
          var obj={};
          obj.name=element.type;
          obj.sum=element.sum;
          var timestamp = new Date(element.time)
          obj.time = timestamp.getFullYear()+"/"+timestamp.getMonth()+"/"+timestamp.getDay();
          json.push(obj);
        })
        that.setData({
          isEmpty:false,
          recordArray:json
        })
      }
    })
  },
  /**
   * 获取积分
   */
  getAccount:function(){
    var that = this;
    wx.request({
      url: getApp().globalData.serverUrl +'/getaccount',
      data: {
        userId: wx.getStorageSync("userId")
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          account:res.data.account
        })
      }
    })
  }
})