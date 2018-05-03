// pages/itemlist/itemlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var
      that = this,
      request = options,
      requestParam = options.type;
    console.log(requestParam);
    if (requestParam == "questdetails")//请求问题详情页
    {
      that.setData({//设置需要展示的模块
        needButton: true,
        needQuestion: true,
        needViewNum: true,
        needItemUser: true,
        buttonText: "回答",
        itemType: "回答",
      })
      wx.request({
        url: getApp().globalData.serverUrl + '/getQuestDetails',
        data: {
          questId: request.questId
        }, 
        success: function (res) {
          // wx.setNavigationBarTitle({
          //   title: 
          // })
          that.setData({
            questTit: res.data.questTit,
            questCon: res.data.questCon
          })
        }
      })
      wx.request({
        url: getApp().globalData.serverUrl +'/ansertoquest',
        data: {
          questId: request.questId
        },
        success: function (res) {
          console.log(res.data);
          
          that.refreshPage(res.data, requestParam);
        }
      })
    } else if (requestParam == "myquest") {//请求我的问题页面
      that.setData({
        needButton: true,
        needViewNum: true,
        itemType: "问题",
        buttonText: "提问",
        buttonUrl: "../quiz/quiz"
      });
      wx.setNavigationBarTitle({
        title: '我的问题'
      });
      //向服务器发送请求，请求我的问题
      wx.request({
        url: getApp().globalData.serverUrl+'/myquest',
        data: {
          userId: wx.getStorageSync("userId")
        },
        success(res) {
          console.log(res.data);
          //读取json中的内容
          var content = res.data;
          //刷新页面函数
          that.refreshPage(content, requestParam);
        }
      })
    } else if (requestParam == "questtome") {
      //请求向我的求助
      that.setData({
        needViewNum: true,
        needItemUser: true,
        itemType: "求助",
      });
      wx.setNavigationBarTitle({
        title: '向我求助'
      });
      //向服务器发送请求，请求我的问题
      wx.request({
        url: getApp().globalData.serverUrl+'/questtome',
        data: {
          userId: wx.getStorageSync("userId")
        },
        success(res) {
          console.log(res.data);
          //读取json中的内容
          var content = res.data;
          //刷新页面函数
          that.refreshPage(content, requestParam);
        }
      });
    } else if (requestParam = "myanswer") {//请求我的回答页面
      that.setData({
        needButton: true,
        needViewNum: true,
        needItemTit: true,
        itemType: "回答",
        buttonText: "回答问题",
        buttonUrl: "../itemlist/itemlist?type=questtome"
      })
      wx.setNavigationBarTitle({
        title: '我的回答'
      })
      //向服务器发送请求，请求我的问题
      wx.request({
        url: getApp().globalData.serverUrl+'/myanswer',
        data: {
          userId: wx.getStorageSync("userId")
        },
        success(res) {
          console.log(res.data);
          //读取json中的内容
          var content = res.data;
          //刷新页面函数
          that.refreshPage(content, requestParam);
        }
      });
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
   * 刷新页面函数
   * @Param:content（传回JSON中的Page）,this （页面根节点）
   */
  refreshPage: function (content, requestParam) {
    console.log(content);
    var itemNum = content.length;
    if (itemNum != 0) {
      //有数据返回，说明有提问
      var dataJson = [];
      var util = require('../../utils/util.js');
      content.forEach(function (element) {
        var obj = {};
        obj.userPic = element.userPic;
        obj.userName = element.userName;
        obj.title = element.title;
        obj.content = element.content;
        obj.time = util.getTimeDiff(new Date(element.onTime).getTime());
        obj.num = element.num;
        obj.id = element.id;
        obj.zan = element.zan + "个赞";
        obj.answered = element.answered;
        obj.adapted = element.adapted;
        if (requestParam == "myquest" || requestParam == "questtome") {
          obj.url = "../itemlist/itemlist?type=questdetails&questId=" + element.id;
        }
        dataJson.push(obj);
      });
      //注意，给的value是一个json对象，不是个json字符串啊！！！！
      this.setData({
        isEmpty: false,
        itemNum: itemNum,
        itemArray: dataJson
      });
    } else {
      this.setData({
        isEmpty: true
      });
    }
    this.setData({
      loading: false//无论是否有内容，都已加载完，去除加载条
    });
  },

  imgError: function (e) {
    console.log(e);
  }


})