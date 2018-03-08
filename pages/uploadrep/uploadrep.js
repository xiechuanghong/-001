// pages/uploadrep/uploadrep.js
var app = getApp();
var api = require('../../utils/api.js')
var qiniuUploader = require("../../utils/qiniuUploader.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // arr: [
    //   { 'name': 'username', 'text': '姓名' },
    //   { 'name': 'phone', 'text': '电话' },
    //   { 'name': 'age', 'text': '年龄' },
    //   { 'name': 'sex', 'text': '性别' },
    //   { 'name': 'bubble', 'text': '气泡' },
    //   { 'name': 'dreg', 'text': '沉淀物' },
    //   { 'name': 'float', 'text': '絮状飘浮' },
    //   { 'name': 'color', 'text': '颜色' },
    // ],
    arr: [{ text: '年龄' }, { text: '性别' }, { text: '气泡' }, { text: '沉淀物' }, { text:'絮状飘浮'},{ text:'颜色' }],
    gather_arr: [],
    gather_obj: {},
    menu:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    // 获取健康报告数据
    wx.request({
      url: api.url + 'report/setting',
      data: {
        key:app.globalData.key
      },
      method:'get',
      success: function (res) {
        console.log(res)
        if(res.data.code == 200) {
          res.data.data.sex.splice(0,1)
          that.setData({
            obj:res.data.data
          })
        }
        
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData)
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
  // 收集input数据
  inp: function (e) {
    console.log(e)
    var arr = this.data.gather_arr,
      obj = this.data.gather_obj,
      str = `${e.currentTarget.dataset.val}=${e.detail.value}`;
    arr.push(str);
    for (var x in arr) {
      var split = arr[x].split('=');
      obj[split[0]] = split[1];
    }
    console.log(obj)
    this.setData({
      gather_obj: obj
    })
  },
  // 上传图片
  sendImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '图片上传中...',
          icon: 'loading'
        })
        var filePath = res.tempFilePaths[0];
        that.uploadToQiniu(filePath, '/reward/img/' + that.getdate() + '/');
      }
    })
  },

  uploadToQiniu: function (filePath, prefix) {
    var that = this;
    console.log(filePath)
    this.setData({
      upload: filePath
    })
    qiniuUploader.upload(filePath, (res) => {
      
      var src = res.key;
      // console.log(that.data.uploadImg)
      // var imgs = that.data.uploadImg;
      // imgs[imgs.length] = src;
      // imgs.push(src);
      // console.log(imgs);
      // console.log(imgs.length)
      // var img = imgs.length >= 4 ? imgs.slice(imgs.length - 4) : imgs;
      // var img = imgs;
      console.log(src)
      that.setData({
        uploadImg: src
      })
      wx.hideToast();
      // that.imgs();
    }, (error) => {
      console.log('error: ' + error);
    }, {
        uploadURL: 'https://upload-z2.qiniup.com',
        domain: 'mpstatic.hanyu020.com',
        uptokenURL: app.globalData.domain + '/qiniuToken',
        region: 'SCN',
        prefix: prefix,
        getkey:app.globalData.key,
      })
  },
  getdate: function () {
    var now = new Date()
    var y = now.getFullYear()
    var m = now.getMonth() + 1
    var d = now.getDay()
    m = m < 10 ? "0" + m : m
    d = d < 10 ? "0" + d : d
    return y + "-" + m + "-" + d
  },
  // // 收集数据发送请求
  // report: function () {
  //   var obj = this.data.gather_obj;
  //   var picture = this.data.uploadImg
  //   wx.request({
  //     url: api.url + "report",
  //     method: 'post',
  //     data: {
  //       key:      app.globalData.key,
  //       age:      obj.age,
  //       sex:      obj.sex,
  //       bubble:   obj.bubble,
  //       dreg:     obj.dreg,
  //       float:    obj.float,
  //       color:    obj.color,
  //       username: obj.username,
  //       phone:    obj.phone,
  //       is_free:  '1',
  //       picture:  picture
  //     },
  //     success: function(res) {
  //       if(res.data.code == 200) {
  //         wx.showToast({
  //           title: '正在查询',
  //           icon:'loading',
  //           success:function(res) {
  //             setTimeout(()=>{
  //               wx.navigateTo({
  //                 url: '../detail/detail',
  //               })
  //             },2000)
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // 下拉菜单年龄
  bindPickerChangeAge: function (e) {
    var age = this.data.obj.age
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      age: e.detail.value,
    })
  },
  // 性别
  bindPickerChangeSex: function (e) {
    var sex = this.data.obj.sex
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var sex = String(Number(e.detail.value) +1)
    console.log(sex)
    this.setData({
      sex: e.detail.value,
    })
  },
  // 气泡
  bindPickerChangeBubble: function (e) {
    var bubble = this.data.obj.bubble
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      bubble: e.detail.value,
    })
  },
  // 沉淀物
  bindPickerChangeDreg: function (e) {
    var dreg = this.data.obj.dreg
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dreg: e.detail.value,
    })
  },
  // 絮状飘浮
  bindPickerChangeFloat: function (e) {
    var float = this.data.obj.floattSSSSSSt
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      float: e.detail.value,
    })
  },
  // 颜色
  bindPickerChangeColor: function (e) {
    var color = this.data.obj.color
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      color: e.detail.value,
    })
  },
  formSubmit: function(e) {
    var sex = String(Number(this.data.sex) + 1)
    
    var data = e.detail.value
    // var name = data.username;
    var that = this
    wx.request({
      url: api.url + "report",
      method: 'post',
      data: {
        username: data.username,
        phone: data.phone,
        picture: that.data.uploadImg,
        key: app.globalData.key,
        bubble: that.data.bubble,
        dreg: that.data.dreg,
        float: that.data.float,
        color: that.data.color,
        age: that.data.age,
        sex: sex
      },
      success: function (res) {
        console.log(res)
        if(res.data.code == 200) {
          wx.navigateTo({
            url: '../detail/detail?id=' + res.data.data.id,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      }
    })
    // console.log(data)
    // wx.navigateTo({
    //   url: '../detail/detail?id=' + 25,
    // })
  },
  // 返回
  reset: function () {
    console.log(11)
    wx.navigateBack({
      delta: 2
    })
  },
 
})