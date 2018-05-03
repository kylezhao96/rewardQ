//app.js
App({
  onLaunch: function () {
    var that = this;
    var logs = wx.getStorageSync('logs');
    if (logs) {
      console.log("检测到登陆日志，自动登录");
      wx.setStorage({
        key: 'logs',
        data: new Date().toLocaleString(),
        success: function () {
          console.log("写入日志成功")
        }
        
      });
      that.globalData.loginStatus=true;
    } else {
      console.log("未登陆过");
    }
  },

  globalData: {
    loginStatus:false,
    serverUrl:"http://localhost:8080"
    // serverUrl: "http://192.168.1.3"
  },

})