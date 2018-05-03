const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 登录程序,重写!!
 */
function login(that) {
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
              url: 'http://localhost:8080/login',
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
                }else{
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
}
/**
 * 刷新登录状态
 */
function refreshLoginStatus(that){
  console.log("执行刷新函数");
  //想法，让其一直检测loginStatus，有变化再执行
  var
    userName = wx.getStorageSync("userName"),
    userPic = wx.getStorageSync("userPic");
  that.setData({
    loginStatus: getApp().globalData.loginStatus,
    userName: userName,
    userPic: userPic
  })
}
/**
 * 给时间戳，求时间差
 */
function getTimeDiff(timeStamp){
  var now = new Date().getTime()
  var timeDiff = Math.floor((now - timeStamp) / (3600 * 1000 * 24));
  if(timeDiff<1){
    return "今天";
  }else if(timeDiff<30){
    return timeDiff+"天前";
  }else if(timeDiff<365){
    return Math.floor(timeDiff/30)+"月前";
  }else{
    return Math.floor(timeDiff/365)+"年前";
  }
}

module.exports = {
  formatTime: formatTime,
  login: login,
  refreshLoginStatus: refreshLoginStatus,
  getTimeDiff: getTimeDiff
}
