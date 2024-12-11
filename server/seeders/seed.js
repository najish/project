const fs = require('fs').promises;
const path = require('path');
const { Product, User, Cart, Category } = require('../models/associations');

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

// Seed individual model data
const seedProductData = async () => {
  await seedData(Product, 'ProductData.json');
};

const seedUserData = async () => {
  await seedData(User, 'UserData.json');
};

const seedCategoryData = async () => {
  await seedData(Category, 'CategoryData.json');
};

const seedCartData = async () => {
  await seedData(Cart, 'CartData.json');
};

// Seed all models
const seedAllModel = async () => {
  try {
    await seedCategoryData();
    await seedProductData();
    await seedUserData();
    await seedCartData();
    console.log('All data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

module.exports = { seedAllModel };
