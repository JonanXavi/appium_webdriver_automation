import { $, $$ } from '@wdio/globals';
import { Gestures } from "../../../utils/gestures.ts";

class ProductListPage {
    public get menuBtn() { return $('~test-Menu'); }
    public get shoppingCartBtn() { return $('~test-Cart'); }
    public get productsHeader() { return $('//android.widget.TextView[@text=\"PRODUCTS\"]'); }
    public get productsItem() { return $$('~test-Item'); }
    public get dropZone() { return $('~test-Cart drop zone'); }

    async clickMenuButton() {
        await this.menuBtn.click();
    }

    async clickShoppingCartButton() {
        await this.shoppingCartBtn.click();
    }

    async getTotalOfProductsOnCart() {
        return await this.shoppingCartBtn.$('//android.widget.TextView[@text]').getText();
    }

    async getProductsHeader() {
        return await this.productsHeader.getText();
    }

    async getProductsList() {
        return await this.productsItem;
    }

    private async handleProductsAction(products: string[], action: (item: WebdriverIO.Element) => Promise<void>) {
        const items = await this.getProductsList();

        for (const item of items) {
            const titleText = await item.$('~test-Item title').getText();

            if (products.includes(titleText)) {
                const addToCartButton = await item.$('~test-ADD TO CART');
                await addToCartButton.scrollIntoView();
                await action(item);
            }
        }
    }

    async addProductsToCartFromPLP(products: string[]) {
        await this.handleProductsAction(products, async (item) => {
            const addToCartButton = await item.$('~test-ADD TO CART');
            await addToCartButton.click();
        });
    }

    async dragProductToCart(products: string[]) {
        await this.productsHeader.waitForDisplayed();
        const product = await $('(//android.view.ViewGroup[@content-desc="test-Drag Handle"])[1]');

        await this.handleProductsAction(products, async () => {
            await Gestures.dragAndDrop(product, this.dropZone);
        });
    }

    async clickOnProduct(name: string) {
        const productName = await $(`//android.widget.TextView[@content-desc="test-Item title" and @text="${name}"]`);
        await productName.scrollIntoView();
        await productName.click();
    }

    async getProductName(position: number) {
        return await $(`(//android.widget.TextView[@content-desc='test-Item title'])[${position}]`).getText();
    }

    async getProductPrice(position: number) {
        return await $(`(//android.widget.TextView[@content-desc='test-Price'])[${position}]`).getText();
    }
}

export default new ProductListPage();