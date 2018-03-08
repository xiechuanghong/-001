// pages/home/home.js]
var api = require('../../utils/api.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
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
    var that = this;
    console.log(Boolean(app.globalData.key))
    wx.request({
      url: api.url + 'ad',
      method:'get',
      success: function(res) {
        if(res.data.code === 200 ) {
          that.setData({
            img_arr:res.data.data.ad
          })
        }
        console.log(res)
      }
    })
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
  // 扫一扫
  sys: function() {
    wx.scanCode({
      success: (res) => {
        if(res) {
          console.log(res.path)
          var r = res.path
          r = r.substring(r.indexOf("=") + 1);
          wx.request({
            url: api.url + 'redpack',
            data:{
              key:app.globalData.key,
              code:r
            },
            method:'get',
            success: function(res) {
              console.log(res)
              if(res.data.code == 0 ) {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                })
                return
              } else {
                wx.navigateTo({
                  url: '/' + res.path
                })
              }
            }
          })
          
        }
         else {
          fail: () => {
            wx.navigateTo({
              url: '../codefail/codefail',
            })
          }
        }
        console.log(res)
      },
      // fail: (res) => {
      //   console.log(res)
      //   wx.navigateTo({
      //     url: '../codefail/codefail',
      //   })
      // }
    })
  },
  // 企业简介
  intro: function() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  // 健康报告
  report: function() {
    wx.navigateTo({
      url: '../uploadrep/uploadrep',
    })
  },
  // 轮播图跳转
  img_swiper: function(e) {
    var src = e.currentTarget.dataset.id
    console.log(src)
    if(src===0) {
      this.intro()
    } else if (src===1) {
      this.sys()
    } else if (src===2) {
      this.report()
    }
    console.log(e.currentTarget.dataset.src)
  }
})