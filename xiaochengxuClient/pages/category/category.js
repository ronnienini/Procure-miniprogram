Page({
  data: {
    windowHeight: 100,
    array: [{
      message: '推荐分类',
    }, {
      message: '潮流女装'
    }, {
      message: '个护化妆'
    }, {
      message: '家用电器'
    }, {
      message: '电脑办公'
    }, {
      message: '手机数码'
    }, {
      message: '母婴童装'
    }, {
      message: '图书音像'
    }, {
      message: '家居家纺'
    }, {
      message: '家居生活'
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
      url: 'http://localhost:8080/cate', // 替换为你的商品数据接口地址
      method: 'GET',
      success: res => {
        if (res.statusCode === 200) {
          console.log(res.data);
          // 异步请求成功后更新页面数据
          this.setData({
            products: res.data // 更新商品数据数组
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
     if(event.target.id=='category1'){
       this.setData({
        childCategory: [{
          title:'热卖品牌',
          array:[{
            name:'时尚羽绒'
          },{
            name:'轻薄羽绒'
          },{
            name:'中长款羽绒'
          },{
            name:'针织裙'
          },{
            name:'毛呢大衣'
          }]
        },{
          title:'裙装',
          array:[{
            name:'秋冬连衣裙'
          },{
            name:'长袖连衣裙'
          },{
            name:'针织连衣裙'
          },{
            name:'毛呢连衣裙'
          }]
        }]
      })
     }else{
        this.setData({
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
        })
     }
    }
})