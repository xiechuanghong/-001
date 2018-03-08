// pages/help/help.js
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    page: 1,
    help_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.help()
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })

    
  },

  help: function(page) {
    var that = this
    wx.request({
      url: api.url + 　'helps',
      data: {
        page: page ? page : '1'
      },
      success: function (res) {
        var str = res.data
        if (str.code == 200) {
          if (str.data.data == '') {
            that.setData({
              flag: false,
              isShow: true
            })
          }
          var arr = that.data.help_list
          arr.push(...str.data.data)
          console.log(arr)
          that.setData({
            help_list: arr
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
  helpDetail: function(e) {
    wx.navigateTo({
      url: 'helpbag/helpbag?id=' + e.currentTarget.dataset.id,
    })
    console.log(e)
  },
  scroll: function (e) {
    // console.log(e)
    var flag = this.data.flag
    if (flag) {
      // console.log(e)
      var windowHeight = this.data.height;
      var scrollTop = e.detail.scrollTop;
      // console.log(windowHeight + scrollTop)
      var scrollHeight = e.detail.scrollHeight
      // console.log(scrollHeight-100)
      
      if ((windowHeight + scrollTop) >= (scrollHeight - 1)) {
        var page = this.data.page
        page++
        this.setData({
          page: page
        })
        console.log(123)
        this.help(String(page))
        // console.log(String(page))
      }
    }
  },
})