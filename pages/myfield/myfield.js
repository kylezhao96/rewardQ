// pages/myfield/myfield.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: false,
    itemArray: [{
      id: 1,
      image: "../image/subject/医学.png",
      name: "医学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 2,
      image: "../image/subject/法学.png",
      name: "法学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 3,
      image: "../image/subject/工学.png",
      name: "工学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 4,
      image: "../image/subject/管理学.png",
      name: "管理学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 5,
      image: "../image/subject/检测学.png",
      name: "检测学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 6,
      image: "../image/subject/教育学.png",
      name: "教育学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 7,
      image: "../image/subject/经济学.png",
      name: "经济学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 8,
      image: "../image/subject/理学.png",
      name: "理学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 9,
      image: "../image/subject/历史学.png",
      name: "历史学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 10,
      image: "../image/subject/农学.png",
      name: "农学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 11,
      image: "../image/subject/文学.png",
      name: "文学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 12,
      image: "../image/subject/艺术学.png",
      name: "艺术学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }, {
      id: 13,
      image: "../image/subject/哲学.png",
      name: "哲学",
      userNum: 0,
      questNum: 0,
      disable: false,
      buttontext: "关注"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.refreshPage();
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
   * 点击更新领域事件 
   */
  updateField: function (event) {
    var that = this,
      field,
      id = event.target.id,
      newArray = that.data.itemArray;
    //提示用户
    if (that.data.selected == true) {//用户有关注过
      wx.showModal({
        title: '注意',
        content: '只能关注一项领域，将取消之前关注的领域，是否继续？',
        success: function (res) {
          if (res.confirm) {
            //用户点击确定
            newArray.forEach(function (element) {//判断用户点击的是哪一项？
              if (id == element.id) {
                field = element.name;

              } else {
              }
            })
            wx.request({
              url: getApp().globalData.serverUrl +'/updatefield',
              data: {
                userId: wx.getStorageSync("userId"),
                field: field
              },
              success: function (res) {
                //请求成功
                if (res.data.msg == "success") {
                  //后台数据库操作成功
                  that.refreshPage();
                } else {
                  //后台数据库操作失败
                  wx.showToast({
                    title: '变更领域失败！',
                    image: "../image/error.png"
                  })
                }
              },
              fail: function () {
                //发送失败
                wx.showToast({
                  title: '网络故障，请检查您的网络！',
                  image: "../image/error.png"
                })
              }
            })//请求结束
          }//用户点击确定
        }
      })
    }
    else {//用户没有关注
      newArray.forEach(function (element) {//判断用户点击的是哪一项？
        if (id == element.id) {
          field = element.name;

        } else {
        }
      })
      wx.request({
        url: getApp().globalData +'/updatefield',
        data: {
          userId: wx.getStorageSync("userId"),
          field: field
        },
        success: function (res) {
          //请求成功
          if (res.data.msg == "success") {
            //后台数据库操作成功
            that.refreshPage();
          } else {
            //后台数据库操作失败
            wx.showToast({
              title: '变更领域失败！',
              image: "../image/error.png"
            })
          }
        },
        fail: function () {
          //发送失败
          wx.showToast({
            title: '网络故障，请检查您的网络！',
            image: "../image/error.png"
          })
        }
      })//请求结束
    }

  },//updateField()结束

  /**
   * 刷新页面
   */
  refreshPage: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.serverUrl +'/myfield',
      data: {
        userId: wx.getStorageSync("userId")
      },
      success: function (res) {
        var head = res.data["0"];
        console.log(res);
        if (head.msg == "null" || head.field == "") {
          wx.showToast({
            title: '您还没有关注过领域，请关注一个吧！',
            icon: 'none'
          });
        } else {
          var newArray = that.data.itemArray;
          var i = 1;
          newArray.forEach(function (element) {
            element.userNum = res.data[i].userNum;
            element.questNum = res.data[i++].questNum;
            if (element.name == head.field) {
              element.disable = true;
              element.type = "primary";
              element.buttontext = "已关注";
            } else {//此处以后可更改，方便改为多种关注
              if (element.buttontext == "已关注") {
                element.disable = false;
                element.type = "default";
                element.buttontext = "关注";
              }
            }
          })
          that.setData({
            selected: true,
            itemArray: newArray
          })
        }
      }, fail: function () {
        //发送失败
        wx.showToast({
          title: '网络故障，请检查您的网络！',
          image: "../image/error.png"
        })
      }
    })
  }
})