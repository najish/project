const setupAssociations = ({ Category, Product, User, Address}) => {
    Category.hasMany(Product, { foreignKey: "categoryId", as: "products" })
    Product.belongsTo(Category, { foreignKey: "categoryId", as: "categories" })

    User.hasMany(Address, {foreignKey: "userId"})
    Address.belongsTo(User, {foreignKey: "userId"})

}


module.exports = setupAssociations