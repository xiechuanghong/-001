// pages/record/record.js
var api = require('../../../utils/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record_list: [],
    isshow:false,
    flag:true,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wallet()
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
  // 钱包记录
  wallet: function (page) {
    var that = this;
    var flag = that.data.flag
    wx.request({
      url: api.url + 'wallet',
      data: {
        key: app.globalData.key,
        page: page?page:'1'
      },
      method: 'get',
      success: function (res) {
        console.log(res)
        var str = res.data;
        if (str.code == 200) {
          if(str.data.data == '') {
            that.setData({
              flag:false,
              isShow:true
            })
          }
          var arr = that.data.record_list
          arr.push(...str.data.data)

          // arr.sort(function (a, b) {
          //   return b.id > a.id
          // })
          console.log(arr)
          that.setData({
            record_list: arr,
            isshow:true
          })
          console.log(str)
          console.log("钱包记录数据返回")
        }
      }
    })
  },
  scroll: function (e) {
    var flag = this.data.flag
    if(flag) {
      // console.log(e)
      var windowHeight = this.data.height;
      var scrollTop = e.detail.scrollTop;
      // console.log(windowHeight + scrollTop)
      var scrollHeight = e.detail.scrollHeight
      // console.log(scrollHeight-100)
      if ((windowHeight + scrollTop) >= (scrollHeight - 10)) {
        var page = this.data.page
        page++
        this.setData({
          page: page
        })
        this.wallet(String(page))
        console.log(String(page))
      }
    }
  }
})