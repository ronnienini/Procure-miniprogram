import "../../utils/item.js"
Page({
  data: {
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
    childCategory:[{
        title:'推荐分类',
        array:[{
          name:'12.19超级品牌日'
        },{
          name:'冬季小家电专场'
        },{
          name:'令全满减'
        }]
    },{
        title:'热门分类',
        array:[{
          name:'手机'
        },{
          name:'笔记本'
        },{
          name:'空调'
        },{
          name:'收纳用品'
        },{
          name:'炒锅'
        },{
          name:'床品套件'
        }]
    }]
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    var me = this;
    console.log("ddd")
    wx.request({
      url: 'http://localhost:8080/cate/types', // 替换为你的商品数据接口地址
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          console.log(res.data);
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
    

    //获取设备窗口信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)

        me.setData({
          windowHeight: res.windowHeight
        })

      }
    })
  },
   //切换分类方法  
    toggleCategory: function(event) {
      console.log(event.target.id)
      
      wx.request({
        url: 'http://localhost:8080/cate/products/'+event.target.id,
        method:'GET',
        success: res => {
          if (res.statusCode === 200) {
            console.log(res.data);
            // 异步请求成功后更新页面数据
            this.setData({
              childCategory: res.data // 更新商品数据数组
            },()=>{
              console.log(this.data.childCategory)
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