class Cart {
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('[data-test ="shopping-cart-badge"]');
        this.cartItems = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continuToOverviewButton = page.locator('[data-test="continue"]');
        this.subTotalMatch = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.taxAmount = page.locator('.summary_tax_label');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async getAllCartItems() {
        const cartItems = await this.page.locator('.cart_item .inventory_item_name').allTextContents();
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
        const cartCount = await this.cartLink.textContent();
        return parseInt(cartCount) || 0;
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
    async getTaxAmount() {
        const taxAmountText = await this.taxAmount.textContent();
        return parseFloat(taxAmountText.replace('Tax: $', ''));
    }

    async finishButton() {
        await this.finishButton.click();
    }
    async getCompleteHeader() {
        return await this.completeHeader.textContent();
    }
}


module.exports = { Cart };