const setupAssociations = ({ Category, Product }) => {
    Category.hasMany(Product, { foreignKey: "categoryId", as: "products" })
    Product.belongsTo(Category, { foreignKey: "categoryId", as: "categories" })
}


module.exports = setupAssociations