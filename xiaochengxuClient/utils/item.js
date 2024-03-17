// 商品类定义
class Product {
  constructor(id,name,image, price,desc, quantity) {
    this.id=id;
    this.name = name;
    this.image=image;
    this.price = price;
    this.desc=desc;
    this.quantity = quantity;
  }
  getId(){
    return this.id;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getQuantity() {
    return this.quantity;
  }
  getImage(){
    return this.image;
  }
  getDesc(){
    return this.desc;
  }

}

