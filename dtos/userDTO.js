class UserDTO {
    constructor(user) {
      this.user_id = user.user_id;
      this.name = user.name;
      this.orders = user.orders.map(order => ({
        order_id: order.order_id,
        total: order.total,
        date: order.date,
        products: order.products.map(product => ({
          product_id: product.product_id,
          value: product.value,
        })),
      }));
    }
  }
  
  module.exports = UserDTO;
  