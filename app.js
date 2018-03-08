//app.js
var api = require('./utils/api.js')
App({
  
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
            console.log(12345)
            console.log(that.globalData)
        if (!that.globalData.key) {
          
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              console.log('11321')
              wx.showLoading({
                title: '正在加载中',
                mask:true
              })
              console.log(res.userInfo)
                  // // 登录
                  wx.login({
                    success: function (res) {
                      that.globalData.code = res.code
                      console.log(res.code)
                      if(res.code) {
                        wx.request({
                          method:'post',
                          url:api.url + 'login',
                          data: {
                            code: res.code,
                            userinfo: that.globalData.userInfo
                          },
                          success: function(res) {
                            console.log(res)
                            if(res.data.data.token ) {
                              console.log(res.data.data.token)
                              console.log('登录成功')
                              wx.hideLoading()
                              that.globalData.key = res.data.data.token
                            }
                          }
                        })
                      }
                    }
                  });
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            
          })
        }
      },
      complete:()=> {
        console.log(1234)
      }
    })

    // wx.openSetting({
    //   success: res => {
    //     console.log(12345)

    //     if (!that.globalData.key) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           that.globalData.userInfo = res.userInfo
    //           console.log('11321')

    //           console.log(res.userInfo)
    //           // // 登录
    //           wx.login({
    //             success: function (res) {
    //               that.globalData.code = res.code
    //               console.log(res.code)
    //               if (res.code) {
    //                 wx.request({
    //                   method: 'post',
    //                   url: 'https://health.hanyu020.com/login',
    //                   data: {
    //                     code: res.code,
    //                     userinfo: that.globalData.userInfo
    //                   },
    //                   success: function (res) {
    //                     console.log(res)
    //                     if (res.data.data.token) {
    //                       console.log(res.data.data.token)
    //                       console.log('登录成功')
    //                       that.globalData.key = res.data.data.token
    //                     }
    //                   }
    //                 })
    //               }
    //             }
    //           });
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         },

    //       })
    //     }
    //   },
    //   complete: () => {
    //     console.log(1234)
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    money:0,
    key:'',
    domain: 'https://health.hanyu020.com/'
  }
})