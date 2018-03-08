// pages/mine/mine.js
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
    this.user_info()
    this.setData({
      errMoney: app.globalData.money
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
  // 健康报告列表
  goodlist: function () {
    wx.navigateTo({
      url: '../goodlist/goodlist',
    })
  },
  // 帮助中心
  help: function () {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  // 在线留言
  message: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  // 余额
  balance: function() {
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  phone: function() {
    var that = this
    wx.makePhoneCall({
      phoneNumber: this.data.user_info.phone //仅为示例，并非真实的电话号码
    })
  },
  // 用户信息
  user_info: function() {
    var that = this;
    wx.request({
      url: api.url + 'user',
      data: {
        key: app.globalData.key
      },
      method:'get',
      success: function(res) {
        var str = res.data
        if (str.code == 200) {
          console.log(123)
          app.globalData.money = str.data.money / 100
           that.setData({
             user_info:str.data
           })
        }
      }
    })
  }
})