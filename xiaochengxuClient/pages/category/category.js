import "../../utils/item.js"
Page({
  data: {
    app:null,
    showInput: [], // 控制输入框的显示与隐藏

    windowHeight: 100,
    types: [{
      typeName: '推荐分类',
      typeID:0
    }, {
      typeName: '潮流女装'
    }, {
      typeName: '个护化妆'
    }, {
      typeName: '家用电器'
    }, {
      typeName: '电脑办公'
    }, {
      typeName: '手机数码'
    }, {
      typeName: '母婴童装'
    }, {
      typeName: '图书音像'
    }, {
      typeName: '家居家纺'
    }, {
      typeName: '家居生活'
    }],
    

    childCategory:[
      {
        description:"",
        id:0,
        name:"",
        price:1.2,
        quantity:100,
        type:0
      }
    ]


  },
  onLoad: function (options) {
    this.data.app=getApp();
    console.log(this.data.app)
    // Do some initialize when page load.
    var me = this;
    console.log("ddd")
    wx.request({
      url: 'http://localhost:8080/cate/types', // 替换为你的商品数据接口地址
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          // 异步请求成功后更新页面数据
          this.setData({
            types: res.data // 更新商品数据数组
          });
        } else {
          console.error('Failed to fetch products');
        }
      },
      fail: err => {
        console.error('Failed to fetch products', err);
      }
    });
    wx.request({
      url: 'http://localhost:8080/cate/products/0',
      method:'GET',
      success: res => {
        if (res.statusCode === 200) {
          // 异步请求成功后更新页面数据
          this.setData({
            childCategory: res.data // 更新商品数据数组
          },()=>{
            this.resizeInput(res)
          });
          
        } else {
          console.error('Failed to fetch products');
        }
      },
      fail: err => {
        console.error('Failed to fetch products', err);
      }
    });
    

    //获取设备窗口信息
    wx.getSystemInfo({
      success: function (res) {

        me.setData({
          windowHeight: res.windowHeight
        })

      }
    })
  },
     resizeInput:function(res) {
      let a=[]
            for (let i = 0; i < res.data.length; i++) {
              a.push(false); // 初始化每个商品的输入框为隐藏状态
            }
            this.setData({
              showInput: a
            });
    },
   //切换分类方法  
    toggleCategory: function(event) {
      wx.request({
        url: 'http://localhost:8080/cate/products/'+event.target.id,
        method:'GET',
        success: res => {
          if (res.statusCode === 200) {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              const itemId = res.data[i].id;
            
              if (this.data.app.globalData.item_list.has(itemId)) {
                // 如果存在对应的元素，则执行相应的操作
                const quantity = this.data.app.globalData.item_list.get(itemId);
                // TODO: 执行存在元素时的操作
                console.log(`Key ${itemId} exists, Quantity: ${quantity}`);
              } else {
                // 如果不存在对应的元素，则执行相应的操作
                // TODO: 执行不存在元素时的操作
                console.log(`Key ${itemId} does not exist`);
              }
            }
            
            // 异步请求成功后更新页面数据
            this.setData({
              childCategory: res.data // 更新商品数据数组
            },()=>{
              this.resizeInput(res)
            });
            
          } else {
            console.error('Failed to fetch products');
          }
        },
        fail: err => {
          console.error('Failed to fetch products', err);
        }
      });
    },
    toggleInput: function (e) {
      console.log("a")
      const index = e.currentTarget.dataset.index;
      
      const newShowInput = this.data.showInput.slice(); // 创建一个 showInput 的副本
      newShowInput[index] = !newShowInput[index]; // 切换对应商品的输入框显示状态

      this.setData({
        showInput: newShowInput
      },()=>{
        console.log(newShowInput)
      });
      
    },
  
    // 输入框内容改变时的事件处理函数
    inputChange: function (e) {
      const index = e.currentTarget.dataset.index;
      let inputValue = e.detail.value;
      console.log(`第 ${index} 个商品的输入框内容：`, inputValue);
      // 在这里处理输入框内容变化的逻辑
      if(!this.isPositiveInteger(inputValue)){
        //弹窗提醒
      }else{
        inputValue = parseInt(inputValue); // 获取用户输入的数量，转换为整数
        // 获取商品的数量信息的 Map 对象
        // 如果数量大于 0，则更新或插入键值对
        if (inputValue > 0) {
          this.data.app.globalData.item_list.set(index, inputValue);
        } else {
          // 如果数量为 0，则删除对应的键值对
          this.data.app.globalData.item_list.delete(index);
        }
         
      }
    },
     isPositiveInteger:function(s) {
      // 使用正则表达式匹配正整数
      var pattern = /^[1-9]\d*$/;
      return pattern.test(s);
    }
    
    // 点击加号按钮的事件处理函数
  // showInput: function () {
  //   wx.showModal({
  //     title: '请输入购买数量',
  //     content: '请输入想要购买的数量：',
  //     showCancel: true,
  //     confirmText: '确定',
  //     cancelText: '取消',
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定');
  //         // 在这里处理用户点击确定按钮后的逻辑，比如发送购买请求等
  //       } else if (res.cancel) {
  //         console.log('用户点击取消');
  //       }
  //     }
  //   });
  // }
})