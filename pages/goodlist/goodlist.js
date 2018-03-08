// pages/goodlist/goodlist.js
var app = getApp()
var api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_list:[],
    flag: true,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.report()
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
  },
  report: function(page) {
    var that = this;
    wx.request({
      url: api.url + 'report',
      data: {
        key: app.globalData.key,
        page: page ? page : '1'
      },
      success: function (res) {
        // var str = res.data.data
        var str = res.data
        console.log(str)
        if (res.data.code == 200) {
          if (str.data.data == '') {
            that.setData({
              flag: false,
              isShow: true
            })
          }
          var arr = that.data.good_list
          arr.push(...str.data.data)
          // arr.sort(function (a, b) {
          //   return b.id > a.id
          // })
          for (var value of arr) {
            value.order_id = value.id.padStart(9,'0')
          }
          console.log(arr)
          that.setData({
            good_list: arr,
          })
          console.log("钱包记录数据返回")


          // that.setData({
          //   good_list: str.data
          // })
        }
        console.log(res)
      }
    })
  },
  scroll: function (e) {
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
        this.report(String(page))
        // console.log(String(page))
      }
    }
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
  detail: function(e) {
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.pay_status
    if(status === '1'){
      wx.navigateTo({
        url: '../detailtoll/detailtoll?id=' + id,
      })
    } else if(status==='0') {
      wx.navigateTo({
        url: '../detail/detail?id=' + id,
      })
    }
    console.log(id)
  }
})