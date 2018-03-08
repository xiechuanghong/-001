// pages/redbag/redbag.js
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
    this.setData({
      code:options.scene
    })
    console.log(options);
    
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
  openbag: function() {
    var that = this
    wx.request({
      url: api.url + 'redpack',
      data: {
        key: app.globalData.key,
        code: that.data.code,
      },
      method: 'post',
      success: (res) => {
        if(res.data.code == 200) {
          wx.navigateTo({
            url: '../openbag/openbag?money=' + res.data.data.money,
          })
        } else if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: function() {
              wx.switchTab({
                url: '/pages/mine/mine'
              })
            }
          })
        }
        console.log(res)
      }
    })
  }
})