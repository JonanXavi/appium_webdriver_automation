import { $, $$ } from '@wdio/globals';
import { Gestures } from '../../../utils/gestures.ts';

class CartPage {
    public get cartList() { return $$('//*[@content-desc="test-Description"]//android.widget.TextView[1]'); }
    public get deleteBtn() { return $('~test-Delete'); }

    async getCartProductNames(expectedCount: number) {
        const names: string[] = [];

        for (let i = 1; i <= expectedCount; i++) {
            const locator = `(//android.view.ViewGroup[@content-desc="test-Description"]//android.widget.TextView[1])[${i}]`;
            const productName = await $(locator);

            await productName.scrollIntoView();
            const name = (await productName.getText()).trim();
            names.push(name);
        }

        return names;
    }

    async isProductInCart(productName: string){
        await new Promise(resolve => setTimeout(resolve, 2000));
        const product = await $(`//android.widget.TextView[@text="${productName}"]`);
        await product.scrollIntoView();
        return product.isDisplayed();
    }

    async swipeProduct() {
        const element = $('(//android.view.ViewGroup[@content-desc="test-Item"])[1]');
        await Gestures.swipe(element, 'left');
    }

    async clickDeleteProductButton() {
        await this.deleteBtn.click();
    }

    async isCartEmpty() {
        return await $('~test-Item').isDisplayed();
    }
}

export default new CartPage();