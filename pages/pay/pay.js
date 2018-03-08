// pages/pay/pay.js
var api = require('../../utils/api.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payImg:'0',
    modal:false,
    isfocus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      money: options.money/100,
      order_sn:options.order_sn
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
  tabCut: function (e) {
    var that = this;
    console.log(this.data.payImg)
    console.log(e)
    console.log(e.target.dataset.payimg)
    
    if (this.data.payImg === e.target.dataset.payimg) {
      return false;
    } else {
      that.setData({
        payImg: e.target.dataset.payimg
      })
    } 
  },
  pay: function () {
    var that = this
    wx.request({
      url: api.url + 'payment',
      data: {
        key:app.globalData.key,
        id: that.data.id,
        // id: '5',
        pay_type: that.data.payImg == '0'?'1':'2',
      },
      method:'post',
      success: function(res) {
        var str = res.data
        if(that.data.payImg == '0') {
          if(res.data.code == 200) {
            // wx.navigateTo({
            //   url: '../detailtoll/detailtoll?id=' + that.data.id,
            // })
            wx.showToast({
              title: '付款成功',
              success: () => {
                console.log(that.data.id)
                setTimeout(()=>{
                  wx.navigateTo({
                    url: '../detailtoll/detailtoll?id=' + that.data.id,
                  })
                },1500)
              }
            })
            console.log('付款成功')
          }else {
            wx.showModal({
              title: '提示',
              content: str.msg
            })
          }
        } else {
          str = JSON.parse(str.data)
          // var time = that.timetrans(str.timeStamp)
          wx.requestPayment({
            timeStamp: str.timeStamp,
            nonceStr: str.nonceStr,
            package: str.package,
            signType: str.signType,
            paySign: str.paySign,
            success: function() {
              wx.navigateTo({
                url: '../detailtoll/detailtoll?id=' + that.data.id,
              })
            }
          })
        }
      }
    })
    // this.setData({
    //   modal:true,
    //   isfocus: true
    // })
    console.log(12345)
  },
  set_wallets_password:function(e) {
    console.log(e.detail.value)
    this.setData({
      wallets_password:e.detail.value
    })
  },
  passwBox: function() {
    this.setData({
      isfocus:true
    })
  },
  ismodal: function() {
    this.setData({
      modal: false
    })
  },
  timetrans: function (date) {
    var date = new Date(date * 1000);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
  }
})