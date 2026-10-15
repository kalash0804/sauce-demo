class Inventory {
    constructor(page) {
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    }

    getProductCard(productName) {
        return this.inventoryItems.filter({ hasText: productName });
    }

    async addToCart(productName) {
        const productCard = this.getProductCard(productName);
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartCount() {
        const hasBadge = await this.cartBadge.count();
        if (hasBadge === 0) {
            return 0;
        }
        return parseInt(await this.cartBadge.textContent(), 10);
    }

    async sortBY(sortOption) {
        await this.sortDropDown.selectOption(sortOption);
    }

    async getAllProductPrices() {
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map(price => parseFloat(price.replace('$', '')));
    }
  
}

module.exports = { Inventory };