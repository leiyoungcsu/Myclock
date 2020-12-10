//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 自定义函数--绘制时钟
   */
  drawClock: function() {
    /* 1.准备工作 */
    // 获取画布上下文
    var ctx = this.ctx
    // 定义时钟的宽和高
    let width = 300,
      height = 300

    // 设置画布中心为参照点
    ctx.translate(width / 2, height / 2)

    // 将画布逆时针旋转90度
    ctx.rotate(-Math.PI / 2)

    /*2.绘制时钟刻度 */
    /*2-1. 绘制小时刻度（12个）*/
    // 设置线条的粗细
    ctx.lineWidth = 6
    // 设置线条末端样式
    ctx.lineCap = 'round'

    for (let i = 0; i < 12; i++) {
      // 开始路径
      ctx.beginPath()
      // 从(100,0)绘制到(120,0)
      ctx.moveTo(100, 0)
      ctx.lineTo(120, 0)
      // 描边路径
      ctx.stroke()

      // 顺时针旋转30°
      ctx.rotate(Math.PI / 6)
    }

    /*2-2. 绘制分钟刻度（60个）*/
    // 设置线条的粗细
    ctx.lineWidth = 5
    // 设置线条末端样式
    ctx.lineCap = 'round'

    for (let i = 0; i < 60; i++) {
      // 开始路径
      ctx.beginPath()
      // 从(118,0)绘制到(120,0)
      ctx.moveTo(118, 0)
      ctx.lineTo(120, 0)
      // 描边路径
      ctx.stroke()

      // 顺时针旋转6°
      ctx.rotate(Math.PI / 30)
    }

    /* 3.获取当前时间*/
    let time = this.getTime() //获取当前时间
    let h = time[0] //小时
    let m = time[1] //分钟
    let s = time[2] //秒

    /* 4.绘制时钟指针*/
    /* 4-1.绘制时针*/
    // 保存当前的绘图状态
    ctx.save()

    // 旋转角度
    ctx.rotate(h * Math.PI / 6 + m * Math.PI / 360 + s * Math.PI / 21600)

    // 设置线条的粗细
    ctx.lineWidth = 12

    // 开始绘制路径
    ctx.beginPath()
    // 从(-20,0)绘制到(80,0)
    ctx.moveTo(-20, 0)
    ctx.lineTo(80, 0)
    // 描边路径
    ctx.stroke()

    // 恢复之前保存的绘图样式
    ctx.restore()

    /* 4-2.绘制分针*/
    // 保存当前的绘图状态
    ctx.save()

    // 旋转角度
    ctx.rotate(m * Math.PI / 30 + s * Math.PI / 1800)

    // 设置线条的粗细
    ctx.lineWidth = 8

    // 开始绘制路径
    ctx.beginPath()
    // 从(-20,0)绘制到(112,0)
    ctx.moveTo(-20, 0)
    ctx.lineTo(112, 0)
    // 描边路径
    ctx.stroke()

    // 恢复之前保存的绘图样式
    ctx.restore()

    /* 4-3.绘制秒针*/
    // 保存当前的绘图状态
    ctx.save()

    // 旋转角度
    ctx.rotate(s * Math.PI / 30)

    // 设置画笔描边颜色为红色
    ctx.strokeStyle = 'red'
    // ctx.setStrokeStyle('red')

    // 设置线条的粗细
    ctx.lineWidth = 6

    // 开始绘制路径
    ctx.beginPath()
    // 从(-30,0)绘制到(120,0)
    ctx.moveTo(-30, 0)
    ctx.lineTo(120, 0)
    // 描边路径
    ctx.stroke()

    // 设置填充颜色为红色
    ctx.fillStyle = 'red'
    // 开始绘制路径
    ctx.beginPath()
    // 绘制圆弧
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true)
    // 填充圆弧
    ctx.fill()

    // 恢复之前保存的绘图样式
    ctx.restore()

    // 在画布中绘制
    ctx.draw()

    /*更新页面显示时间*/
    this.setData({
      h: h > 9 ? h : '0' + h,
      m: m > 9 ? m : '0' + m,
      s: s > 9 ? s : '0' + s
    })
  },

  /**
   *自定义函数--获取当前时间
   */
  getTime: function() {
    // 获取当前时间日期对象
    let now = new Date()
    // 空数组用于存放时分秒
    let time = []

    time[0] = now.getHours() //小时
    time[1] = now.getMinutes() //分钟
    time[2] = now.getSeconds() //秒

    // 24小时换算为12小时制
    if (time[0] > 12) time[0] -= 12

    return time

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 创建画布上下文
    this.ctx = wx.createCanvasContext("clockCanvas")

    // 绘制时钟
    this.drawClock()

    var that = this

    // 每秒更新画面
    this.interval = setInterval(function(){
      // 绘制时钟
      that.drawClock()
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 清除计时器
    clearInterval(this.interval)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})