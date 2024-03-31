//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.item_list=new Map();
    this.getUserInfo();
  },
  getUserInfo:function(){
    var that = this
    if(this.globalData.userInfo){
      return;
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log(res);
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    item_list:null
  }
})