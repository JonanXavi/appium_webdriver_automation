import { $ } from '@wdio/globals';

class ProductDetailPage {
    public get backToProductBtn() { return $('~test-BACK TO PRODUCTS'); }
    public get productName() { return $('//android.view.ViewGroup[@content-desc="test-Description"]/android.widget.TextView[1]'); }
    public get productDetail() { return $('//android.view.ViewGroup[@content-desc="test-Description"]/android.widget.TextView[2]'); }
    public get productPrice() { return $('~test-Price'); }
    public get addToCartBtn() { return $('~test-ADD TO CART'); }

    async clickBackToProductButton() {
        await this.backToProductBtn.click();
    }

    async getProductName() {
        return await this.productName.getText();
    }

    async getProductDetail() {
        return await this.productDetail.getText();
    }

    async getProductPrice() {
        return await this.productPrice.getText();
    }

    async clickAddToCartButton() {
        await this.productName.waitForDisplayed();
        await this.addToCartBtn.scrollIntoView();
        await this.addToCartBtn.click();
    }
}

export default new ProductDetailPage();