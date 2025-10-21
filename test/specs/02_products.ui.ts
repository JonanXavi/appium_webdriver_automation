import { expect } from '@wdio/globals'
import { AllureHelper, restartApp } from '../../utils/helpers.ts';
import AuthPage from '../pages/auth/auth_page.ts';
import ProductListPage from '../pages/product/plp_page.ts'
import ProductDetailPage from '../pages/product/pdp_page.ts'
import products from '../../data/products.json';

describe('Validate the correct behavior of the products on the app', () => {
    beforeEach(async () => {
        await restartApp();
        await AuthPage.login();
    })

    it('Confirm that all products are properly displayed on the Product Listing Page (PLP)', async () => {
        const productsData = products;
        const productsNumber = productsData.length;

        await AllureHelper.step('Verify that all available products are loaded and displayed correctly on the Product Listing Page (PLP)', async () => {
            for (let i = 1; i <= productsNumber; i++) {
                const actualProductName = await ProductListPage.getProductName(i);
                const actualProductPrice = await ProductListPage.getProductPrice(i);
                expect(actualProductName).toHaveText(productsData[i-1].name);
                expect(actualProductPrice).toHaveText(productsData[i-1].price);
            }
        })
    })

    it('Confirm that product details are correctly displayed on the Product Detail Page (PDP)', async () => {
        const productsData = products;
        const productsNumber = productsData.length;

        for (let i = 0; i < productsNumber; i++) {
            await AllureHelper.step(`Click on ${productsData[i].name} to open its Product Detail Page (PDP)`, async () => {
                await ProductListPage.clickOnProduct(productsData[i].name);
            })

            await AllureHelper.step('Verify that the product name, description, and price match the expected values', async () => {
                const actualProductName = await ProductDetailPage.getProductName();
                const actualProductDetail = await ProductDetailPage.getProductDetail();
                const actualProductPrice = await ProductDetailPage.getProductPrice();
                expect(actualProductName).toEqual(productsData[i].name);
                expect(actualProductDetail).toEqual(productsData[i].description);
                expect(actualProductPrice).toEqual(`$${productsData[i].price}`);
            })

            await AllureHelper.step('Return to the Product Listing Page (PLP)', async () => {
                await ProductDetailPage.clickBackToProductButton();
            })
        }
    })
})
