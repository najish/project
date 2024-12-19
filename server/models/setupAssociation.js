
const setupAssociations = ({ Category, Product, User, Address, Order, OrderItem}) => {
    Category.hasMany(Product, { foreignKey: "categoryId", as: "products" })
    Product.belongsTo(Category, { foreignKey: "categoryId", as: "categories" })

    User.hasMany(Address, {foreignKey: "userId", onDelete: "CASCADE"})
    Address.belongsTo(User, {foreignKey: "userId"})



    OrderItem.hasMany(Order, {foreignKey: "orderId", onDelete: 'CASCADE'})
    Order.belongsTo(OrderItem, {foreignKey: "orderId"})



}
module.exports = setupAssociations