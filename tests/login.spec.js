// @ts-check
const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/loginPage');
const users = require('../data/users');
const constants = require('../data/constants');
/*** @type {LoginPage} */
let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('user can login with valid credentials @smoke', async ({ page }) => {

  await loginPage.login(users.standard_user.username, users.standard_user.password);
  await expect(page).toHaveURL(url => url.pathname === constants.urls.inventory);
  await expect(page.getByText(constants.text.productTitle, { exact: true })).toBeVisible();
});