// pages/detail/detail.js
var app = getApp();
var api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js')

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
    console.log(options)
    var order_id = options.id.padStart(9,'0')
    this.setData({
      id: options.id,
      order_id: order_id
    })
    var that = this;
    wx.request({
      url: api.url + 'report/'+options.id,
      data:{
        key: app.globalData.key
      },
      success: function(res) {
        console.log(res)
        var str = res.data;
        if(str.code == 200 ) {
          WxParse.wxParse('article', 'html', str.data.content, that, 5)
          
          that.setData({
            detail: str.data
          })
        }
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
  // 付费咨询
  pay: function() {
    console.log(this.data.detail.id)
    wx.navigateTo({
      url: '../pay/pay?id=' + this.data.detail.id +'&money=' + this.data.detail.money +'&order_sn=' +this.data.detail.order_sn,
      // url: '../pay/pay?id=' + 3 +'&money=' + this.data.detail.money,
    })
    console.log(123)
  },
  // 返回
  turn: function() {
    console.log(11)
    wx.navigateBack({
      delta: 10
    })
  },
  // 预览图片
  previewImage: function(e) {
    var src = e.target.dataset.src
    console.log(e)
    wx.previewImage({
      // current: src, // 当前显示图片的http链接  
      urls: [src] // 需要预览的图片http链接列表  
    })  
  }
})