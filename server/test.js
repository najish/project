const { sequelize, Product, Address } = require('./models/associations');

const func = async () => {
  const t = await sequelize.transaction();
  try {
    const body = {
      id: 5,
      addressId: 7,
      products: [
        { productId: 2, quantity: 2 },
        { productId: 3, quantity: 1 },
      ],
    };

    // Validate address
    const address = await Address.findByPk(body.addressId, { transaction: t });
    if (!address) {
      throw new Error(`Address with ID ${body.addressId} not found`);
    }

    // Process each product
    for (const product of body.products) {
      const prod = await Product.findByPk(product.productId, { transaction: t });
      if (!prod) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }

      if (prod.stockQuantity >= product.quantity) {
        prod.stockQuantity -= product.quantity;
        await prod.save({ transaction: t });
      } else {
        throw new Error(
          `Insufficient stock for Product ID ${product.productId}. Requested: ${product.quantity}, Available: ${prod.stockQuantity}`
        );
      }
    }

    // Commit transaction
    await t.commit();
    console.log('Transaction completed successfully');
  } catch (err) {
    // Rollback transaction in case of error
    await t.rollback();
    console.error('Transaction failed:', err.message);
  }
};

func();
