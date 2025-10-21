import { expect } from '@wdio/globals'
import { AllureHelper, restartApp } from '../../utils/helpers.ts';
import { generateUserData } from '../../utils/testdata.ts';
import AuthPage from '../pages/auth/auth_page.ts';
import ProductListPage from '../pages/product/plp_page.ts'
import CheckoutPage from '../pages/checkout/checkout_page.ts'
import products from '../../data/products.json';

describe('Verify that the checkout functionality on the app works correctly', () => {
    beforeEach(async () => {
        await restartApp();
        await AuthPage.login();
    })

    it('Ensure that a user can complete a purchase successfully through the app', async () => {
        const productNames = products.map(product => product.name);
        const userData = generateUserData();

        await AllureHelper.step('Add one or more products to the shopping cart', async () => {
            await ProductListPage.addProductsToCartFromPLP(productNames);
        })

        await AllureHelper.step('Click the cart icon to open the shopping cart', async () => {
            await ProductListPage.clickShoppingCartButton();
        })

        await AllureHelper.step('Click the "Checkout" button', async () => {
            await CheckoutPage.clickCheckoutButton();
        })

        await AllureHelper.step('Enter all required information in the "Checkout Information" form', async () => {
            await CheckoutPage.typeFirstName(userData.firstName);
            await CheckoutPage.typeLastName(userData.lastName);
            await CheckoutPage.typeZip(userData.zip);
        })

        await AllureHelper.step('Click the "Continue" button to proceed to the Checkout Overview', async () => {
            await CheckoutPage.clickContinueButton();
        })

        await AllureHelper.step('Click the "Finish" button to complete the purchase', async () => {
            await CheckoutPage.clickFinishButton();
        })

        await AllureHelper.step('Verify that the order is successfully created and a confirmation message is displayed', async () => {
            const actualHeaderText = await CheckoutPage.isThankYouMessageVisible();
            expect(actualHeaderText).toBe(true);
        })
    })
})
