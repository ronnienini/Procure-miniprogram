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
        type:0,
        icon:"../../image/plus2.png",
      }
    ]


  },
  onShow: function (options) {
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
    this.getItemByType(0);
    

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
      this.getItemByType(event.target.id);
    },
    toggleInput: function (e) {
      const index = e.currentTarget.dataset.index;
      console.log(index);
      const newShowInput = this.data.showInput.slice(); // 创建一个 showInput 的副本
      newShowInput[index] = !newShowInput[index]; // 切换对应商品的输入框显示状态
      const newItems = this.data.childCategory.slice(); // 创建一个 items 的副本
      if(newShowInput[index]){
        //加号切换成勾
        newItems[index].icon = '../../image/tick.png';
      }else{
        //点击勾：变加号，保留数量
        // 隐藏输入框时，修改图标为加号
        newItems[index].icon = '../../image/plus2.png';
        // 如果有输入的数量，保留在原地
        newItems[index].inputValue=this.data.app.globalData.item_list.get(newItems[index].id);
      }
      this.setData({
        showInput: newShowInput,
        childCategory:newItems
      });
      
    },
  
    // 输入框内容改变时的事件处理函数
    inputChange: function (e) {
      console.log(e)
      const index = e.currentTarget.dataset.index;
      let inputValue = e.detail.value;
      console.log(`第 ${index} 个商品的输入框内容：`, inputValue);
      // 在这里处理输入框内容变化的逻辑
      if(isNaN(inputValue)){
      }else{
        inputValue = parseInt(inputValue); // 获取用户输入的数量，转换为整数
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
    },
    getItemByType(typeID){
      wx.request({
        url: 'http://localhost:8080/cate/products/'+typeID,
        method:'GET',
        success: res => {
          if (res.statusCode === 200) {
            // 异步请求成功后更新页面数据
            for(let i=0;i<res.data.length;i++){
              res.data[i].icon="../../image/plus2.png";
              res.data[i].inputValue=this.data.app.globalData.item_list.get(res.data[i].id);
            }
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
    }
    

})