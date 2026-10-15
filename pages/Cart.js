class Cart {
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continuToOverviewButton = page.locator('[data-test="continue"]');
        this.subTotalMatch = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButtonLocator = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async getAllCartItems() {
        const cartItems = await this.cartItemNames.allTextContents();
        return cartItems;
    }
    async removeAllItemsFromCart(productName) {
        const item = this.getCartItem(productName);
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    getCartItem(productName) {
        return this.cartItems.filter({ hasText: productName });
    }
    async getCartCount() {
        const hasBadge = await this.cartBadge.count();
        if (hasBadge === 0) {
            return 0;
        }
        return parseInt(await this.cartBadge.textContent(), 10);
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
    async fillInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async continuToOverview() {
        await this.continuToOverviewButton.click();
    }
    async getSubTotal() {
        const subTotalText = await this.subTotalMatch.textContent();
        return parseFloat(subTotalText.replace('Item total: $', ''));

    }
    async getTax() {
        const taxText = await this.tax.textContent();
        return parseFloat(taxText.replace('Tax: $', ''));
    }
    async getTotal() {
        const totalText = await this.total.textContent();
        return parseFloat(totalText.replace('Total: $', ''));
    }

    async finishButton() {
        await this.finishButtonLocator.click();
    }
    async getCompleteHeader() {
        return await this.completeHeader.textContent();
    }
}


module.exports = { Cart };