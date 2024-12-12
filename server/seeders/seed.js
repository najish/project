const fs = require('fs').promises;
const path = require('path');
const { Product, User, Cart, Category,Address,Order, OrderItem } = require('../models/associations');

const myMap = new Map()

myMap.set(Category, 'CategoryData.json')
myMap.set(Product, 'ProductData.json')
myMap.set(User, 'UserData.json')
myMap.set(Cart, 'CartData.json')
myMap.set(Address,'AddressData.json')
myMap.set(Order, 'OrderData.json')
myMap.set(OrderItem, 'OrderItemData.json')


// Utility function to read data from a JSON file
const readFileData = async (fileName) => {
  try {
    const filePath = path.join(__dirname, 'Data', fileName);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

// Utility function to seed data if table is empty
const seedData = async (model, fileName) => {
  try {
    // Check if data already exists in the table
    const count = await model.count();
    if (count > 0) {
      console.log(`${model.name} table already has data, skipping seeding.`);
      return;
    }

    // If table is empty, seed data
    const data = await readFileData(fileName);
    await model.bulkCreate(data);
    console.log(`${fileName} Data Seeded`);
  } catch (err) {
    console.error(`Error seeding ${fileName}:`, err);
    throw err;
  }
};


const seedAllModel = async () => {
  try {
    for (const [model, fileName] of myMap) {
      await seedData(model, fileName)
    }
  } catch (err) {
    console.log(err)
  }
}

// // Seed all models
// const seedAllModel = async () => {
//   try {
//     await seedCategoryData();
//     await seedProductData();
//     await seedUserData();
//     await seedCartData();
//     console.log('All data seeded successfully');
//   } catch (err) {
//     console.error('Error seeding data:', err);
//   }
// };

module.exports = { seedAllModel };
