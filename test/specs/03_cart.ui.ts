import { expect } from '@wdio/globals'
import { AllureHelper, restartApp } from '../../utils/helpers.ts';
import AuthPage from '../pages/auth/auth_page.ts';
import ProductListPage from '../pages/product/plp_page.ts'
import ProductDetailPage from '../pages/product/pdp_page.ts'
import CartPage from '../pages/cart/cart_page.ts';
import products from '../../data/products.json';

describe('Validate the correct behavior of the cart functionality on the app', () => {
    beforeEach(async () => {
        await restartApp();
        await AuthPage.login();
    })

    it('Confirm that products can be added to the cart from the Product Listing Page (PLP)', async () => {
        const productNames = products.map(product => product.name);
        const productsNumber = productNames.length;

        await AllureHelper.step('Add one or more products to the shopping cart from the Product Listing Page (PLP)', async () => {
            await ProductListPage.addProductsToCartFromPLP(productNames);
        })

        await AllureHelper.step('Verify that the cart icon reflects the correct number of items added', async () => {
            const actualProducts = await ProductListPage.getTotalOfProductsOnCart();
            expect(actualProducts.length).toHaveText(String(productsNumber));
        })
    })

    it('Confirm that products can be added to the cart from the Product Detail Page (PDP)', async () => {
        const productNames = products.map(product => product.name);

        await AllureHelper.step('For each desired product, navigate to its Product Detail Page (PDP), add it to the cart, and return to the Product Listing Page (PLP)', async () => {
            for (const name of productNames) {
                await ProductListPage.clickOnProduct(name);
                await ProductDetailPage.clickAddToCartButton();
                await ProductDetailPage.clickBackToProductButton();
            }
        })

        await AllureHelper.step('Click the shopping cart icon to open the cart', async () => {
            await ProductListPage.clickShoppingCartButton();
        })

        await AllureHelper.step('Verify that all selected products are correctly listed in the shopping cart', async () => {
            for (const name of productNames) {
                const isVisible = await CartPage.isProductInCart(name);
                expect(isVisible).toBe(true);
            }
        })
    })

    it('Confirm that dragging products to the cart correctly updates the cart count', async () => {
        const productNames = products.map(product => product.name);
        const productsNumber = productNames.length;

        await AllureHelper.step('Select and drag multiple products into the shopping cart using drag and drop', async () => {
                await ProductListPage.dragProductToCart(productNames);
        })

        await AllureHelper.step('Verify that the cart icon displays the correct number of added products', async () => {
            const actualProducts = await ProductListPage.getTotalOfProductsOnCart();
            expect(actualProducts.length).toHaveText(String(productsNumber));
        })
    })

    it('Confirm that products can be removed from the cart using the swipe gesture', async () => {
        const productNames = products.map(product => product.name);
        const productsNumber = productNames.length;

        await AllureHelper.step('Add one or more products to the shopping cart from the Product Listing Page (PLP)', async () => {
            await ProductListPage.addProductsToCartFromPLP(productNames);
        })

        await AllureHelper.step('Click the cart icon to open the shopping cart', async () => {
            await ProductListPage.clickShoppingCartButton();
        })

        await AllureHelper.step('For each product in the cart: swipe to reveal the delete icon and tap it to remove the product', async () => {
            for (let i = 0; i < productsNumber; i++) {
                await CartPage.swipeProduct();
                await CartPage.clickDeleteProductButton();
            }
        })

        await AllureHelper.step('Verify that the shopping cart is empty', async () => {
            const isCartEmpty = await CartPage.isCartEmpty();
            expect(isCartEmpty).toBe(false);
        })
    })
})
