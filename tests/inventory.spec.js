// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { Inventory } = require('../pages/inventory');
const constants = require('../data/constants');
const users = require('../data/users');

/*** @type {LoginPage} */
let loginPage;
/*** @type {Inventory} */
let inventory;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventory = new Inventory(page);
  await loginPage.open();
  await loginPage.login(users.standard_user.username, users.standard_user.password);
});

test('cart badge update when adding and removing items from the cart', async ({ page }) => {
  await inventory.addToCart(constants.text.souceLabsBackpack);
  await inventory.addToCart(constants.text.souceLabsBikeLight);
  const cartCount = await inventory.getCartCount();
  await expect(cartCount).toBe(2);
});

test('products can be sorted by price low to high', async ({ page }) => {
  await inventory.sortBY(constants.sortOptions.priceAsc);
  const prices = await inventory.getAllProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  await expect(prices).toEqual(sortedPrices);
});