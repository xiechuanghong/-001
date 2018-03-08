// pages/feedback/feedback.js
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
  // 获取inpuht内容
  inp: function(e) {
    if(e.currentTarget.dataset.name == "name") {
      this.setData({
        name:e.detail.value
      })
    } else {
      this.setData({
        phone:e.detail.value
      })
    }
  },
  // 获取副文本内容
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
    this.setData({
      message:e.detail.value
    })
  },
  // 返回到我的页面
  mine: function() {
    wx.switchTab({
      url: '../mine/mine'
    })
  },
  // 提交数据
  submit: function () {
    var that = this
    wx.request({
      url: api.url + 'message',
      method: 'post',
      data: {
        key: app.globalData.key,
        name: that.data.name,
        phone: that.data.phone,
        message: that.data.message
      },
      success: function(res) {
        console.log(res)
        if(res.data.code == 200) {
          wx.showModal({
            title: '提示',
            content: '提交成功',
            success: ()=> {
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 10
                })
              },1000)
              console.log(123)
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
          return
        }
        console.log(res)
      }
    })
  }
})