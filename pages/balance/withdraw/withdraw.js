// pages/transmoney/transmoney.js
var api = require('../../../utils/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:'10.00',
    // val:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money: app.globalData.money
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
  // 全部提现
  all_money: function() {
    var money = (this.data.money).toString()
    this.setData({
      val: money
    })
  },
  inp: function(e) {
    var num = e.detail.value.toString()
    console.log(num)
    this.setData({
      val: e.detail.value
    })
  },
  // 提现按钮
  money_btn: function() {
    var that = this
    console.log(!this.data.val)
    if(!this.data.val) {
      wx.showModal({
        title: '提示',
        content: '请输入转账金额',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    } else {
      if(this.data.val <= 0) {
        if(this.data.money === '0') {
          wx.showModal({
            title: '提示',
            content: '您的余额为0',
            showCancel: false,
          })
          return
        }
        console.log('不能低于0元')
        wx.showModal({
          title: '提示',
          content: '输入的金额不能为0',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return false
      }
      wx.request({
        url: api.url + 'withdraw',
        data: {
          key: app.globalData.key,
          money: that.data.val
        },
        method:'post',
        success: function(res) {
          console.log(res)
          if(res.data.code == 200 ){
            wx.navigateTo({
              url: '../moneyresult/moneyresult',
            })
            console.log('转账成功')
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        }
      })
    }
  }
})