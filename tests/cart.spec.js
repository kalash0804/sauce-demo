const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { Inventory } = require('../pages/inventory');
const { Cart } = require('../pages/cart');
const constants = require('../data/constants');

/*** @type {LoginPage} */
let loginPage;

/*** @type {Inventory} */
let inventory;

/** @type {Cart} */ 
let cart;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventory = new Inventory(page);
    cart = new Cart(page);
    await loginPage.open();
    await loginPage.login(constants.users.standard_user.username, constants.users.standard_user.password);
});

test("added products apear curretly in the cart", async ({ page }) => {
    await inventory.addToCart(constants.text.souceLabsBackpack);
    await inventory.addToCart(constants.text.souceLabsBikeLight);

    
    await cart.goToCart();
    await expect(page).toHaveURL(constants.urls.cart);

    const cartItems = await cart.getAllCartItems();
    await expect(cartItems).toContain(constants.text.souceLabsBackpack);
    await expect(cartItems).toContain(constants.text.souceLabsBikeLight);
});

test("cart is empty after removing all products", async ({ page }) => {
    await inventory.addToCart(constants.text.souceLabsBackpack);
    await inventory.addToCart(constants.text.souceLabsBikeLight);
    await cart.goToCart();

    await cart.removeAllItemsFromCart(constants.text.souceLabsBackpack);
    await cart.removeAllItemsFromCart(constants.text.souceLabsBikeLight);

    await cart.getCartCount();
    const cartCount = await cart.getCartCount();
    await expect(cartCount).toBe(0);


    const remainingCartItems = await cart.getAllCartItems();
    await expect(remainingCartItems).toHaveLength(0);
});

test("Add a product to the cart and verify the cart count", async ({ page }) => {
    await inventory.addToCart(constants.text.souceLabsBackpack);
    await inventory.addToCart(constants.text.souceLabsBikeLight);
    await cart.goToCart();

    await cart.clickCheckout();
    await cart.fillInformation(constants.checkoutInfo.firstName, constants.checkoutInfo.lastName, constants.checkoutInfo.postalCode);
    await cart.continuToOverview();

    await expect(page).toHaveURL(constants.urls.checkouttwo);

    const subTotal = await cart.getSubTotal();
    const tax = await cart.getTax();
    const taxAmount = await cart.getTaxAmount();

    expect(subTotal).toBeCloseTo(subTotal + tax, 2); 
     cart.finishButton();
    await expect(page).toHaveURL(constants.urls.checkoutcomplete);

    await expect(cart.getCompleteHeader()).toBe('THANK YOU FOR YOUR ORDER');

});