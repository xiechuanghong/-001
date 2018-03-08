// pages/intro/intro.js
var WxParse = require('../../wxParse/wxParse.js')
var api = require('../../utils/api.js')
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
    this.intro()
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
  intro: function() {
    var that = this
    wx.request({
      url: api.url + 'about',
      method:'get',
      success: function(res) {
        var str = res.data;
        if(str.code == 200) {
          if(str.data === null) {
            that.setData({
              isshow: true
            })
            return
          }
          WxParse.wxParse('article', 'html', str.data.content, that, 5)
          console.log(str.data)
          that.setData({
            about:str.data
          })
        }
      }
    })
  }
})