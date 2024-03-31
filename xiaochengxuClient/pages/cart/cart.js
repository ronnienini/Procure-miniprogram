// cart.js
Page({
  data: {
    app: null,
    cartItems: [ // 假设这是购物车中的商品列表数据
      {
        id: 1,
        picPath: '1.jpg',
        name: '商品1',
        description: '这是商品1的描述',
        price: 50,
        quantity: 100,
        quantitySelected: 1 // 默认选购数量为1
      },
      {
        id: 2,
        picPath: '2.jpg',
        name: '商品2',
        description: '这是商品2的描述',
        price: 80,
        quantity: 50,
        quantitySelected: 1
      }
    ],
    totalPrice: 0
  },
  onShow: function (options) {
    this.data.app = getApp();
    var tCartItems = [];
    let promises = []; // 用于存放所有请求的 Promise 对象

    // 遍历全局数据的 item_list，发起请求并将 Promise 对象放入数组中
    for (const [key, value] of this.data.app.globalData.item_list) {

      let promise = new Promise((resolve, reject) => {
        wx.request({
          url: 'http://localhost:8080/cart/item/' + key,
          method: 'GET',
          success: res => {
            res.data.quantitySelected = value
            tCartItems.push(res.data);
            resolve(); // 请求成功时执行 resolve
          },
          fail: err => {
            console.error('Failed to fetch cartItem', err);
            reject(); // 请求失败时执行 reject
          }
        });
      });
      promises.push(promise); // 将 Promise 对象放入数组
    }

    // 当所有请求完成后执行 setData 更新页面
    Promise.all(promises).then(() => {
      this.setData({
        cartItems: tCartItems
      });
      this.calculateTotal(tCartItems);

    }).catch(err => {
      console.error('Failed to fetch all cartItems', err);
    });
  },
  reserve(event) {
    wx.request({
      url: 'http://localhost:8080/cart/reserve',
      method: 'POST',
      data: Array.from(this.data.app.globalData.item_list),
      header: {
        'content-type': 'application/json' // 默认值，可根据接口需求修改
      },
      success: res => {
        console.log(res);
        console.log(res.data); // 请求成功后的回调函数
        if (res.data.tryReserve) {//如果库存足够
          this.checkout(res.data.orderID)
        } else {
          this.reserveFail(res.data.itemName) 
        }
      },
      fail: err => {
        console.error('Failed to send POST request', err); // 请求失败后的回调函数
        wx.showToast({
          title: '网络异常，购买失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  checkout(orderID) {
    //弹出支付按钮
    //wv返回支付是否成功
    let pay=true;
    if (pay /*默认支付成功 */ ) {
      wx.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.request({
      url: 'http://localhost:8080/cart/checkout',
      method: 'POST',
      data: {
        orderID: orderID,
        cash:pay?this.data.totalPrice:0
      },
      header: {
        'content-type': 'application/json' // 默认值，可根据接口需求修改
      },
      success: res => {
        console.log(res.data); // 请求成功后的回调函数
        // if (true/*res.data.paymentSuccess*/) {
        // 支付成功，清空购物车
        this.clearCart();
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });

      },
      fail: err => {
        console.error('Failed to send POST request', err); 
        wx.showToast({
          title: '网络异常，支付失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  reserveFail(itemNames) {
    const message = itemNames.join(',') + ' 库存不足';
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  },
  clearCart() {
    this.setData({
      cartItems: [] // 清空购物车列表
    });
    this.data.app.globalData.item_list.clear()
  },
  // 增加商品数量
  increaseQuantity(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    const products = this.data.products.map(item => {
      if (item.id === productId) {
        item.quantity += 1;
      }
      return item;
    });
    this.setData({
      products: products,
      totalPrice: this.calculateTotal(products)
    });
  },

  // 减少商品数量
  decreaseQuantity(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    const products = this.data.products.map(item => {
      if (item.id === productId && item.quantity > 0) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setData({
      products: products,
      totalPrice: this.calculateTotal(products)
    });
  },
  calculateTotal(tCartItems) {
    let sum = 0
    tCartItems.forEach(item => {
      sum += item.quantitySelected * item.price
    });
    this.setData({
      totalPrice: sum
    });
  }


});