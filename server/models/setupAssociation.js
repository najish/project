const setupAssociations = ({ Category, Product, User, Address, Order, OrderItem }) => {
    // Category and Product associations
    Category.hasMany(Product, { foreignKey: "categoryId", as: "products", onDelete: "CASCADE" });
    Product.belongsTo(Category, { foreignKey: "categoryId", as: "category", onDelete: "CASCADE" });

    // User and Address associations
    User.hasMany(Address, { foreignKey: "userId", onDelete: "CASCADE" });
    Address.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

    // User and Order associations
    User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
    Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

    // Address and Order associations
    Address.hasMany(Order, { foreignKey: "addressId", onDelete: "CASCADE" });
    Order.belongsTo(Address, { foreignKey: "addressId", onDelete: "CASCADE" });

    // Order and OrderItem associations
    Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
    OrderItem.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });

    // Product and OrderItem associations
    Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE" });
    OrderItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });
};

module.exports = setupAssociations;
