// pages/detailtoll/detailtoll.js
var api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    console.log(options)
    wx.request({
      url: api.url + 'report/' + id,
      data:{
        key: app.globalData.key
      },
      success: function(res) {
        if(res.data.code == 200) {
          WxParse.wxParse('article', 'html', res.data.data.content, that, 5)
          that.setData({
            detailtoll:res.data.data,
            content:res.data.data.content
          })
        }
        console.log(res)
      }
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
  result: function() {
    console.log(11)
    wx.navigateBack({
      delta: 10
    })
  },
  // 预览图片
  previewImage: function (e) {
    var src = e.target.dataset.src
    console.log(e)
    wx.previewImage({
      // current: src, // 当前显示图片的http链接  
      urls: [src] // 需要预览的图片http链接列表  
    })
  }
})