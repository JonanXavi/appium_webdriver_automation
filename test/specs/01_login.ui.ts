import { expect } from '@wdio/globals'
import { AllureHelper, restartApp } from '../../utils/helpers.ts';
import AuthPage from '../pages/auth/auth_page.ts';
import ProductListPage from '../pages/product/plp_page.ts'
import SettingsPage from '../pages/menu/settings_page.ts';
import users from '../../data/users.json';

describe('Validate the correct behavior of the login functionality on the app', () => {
    beforeEach(async () => {
        await restartApp();
    })

    it('Confirm that the username field is validated as required in the login form', async () => {
        await AllureHelper.step('Click the "Login" button without entering any credentials', async () => {
            await AuthPage.clickLoginButton();
        })

        await AllureHelper.step('Verify that the "Username is required" validation message is displayed', async () => {
            const actualUserErrorMessage = await AuthPage.getErrorMessage();
            expect(AuthPage.errorMessage).toBeDisplayed();
            expect(actualUserErrorMessage).toHaveText('Username is required');
        })
    })

    it('Confirm that the password field is validated as required in the login form', async () => {
        const userData = users.validUser;

        await AllureHelper.step('Enter a valid username in the login form', async () => {
            await AuthPage.typeUsername(userData.username);
        })

        await AllureHelper.step('Click the "Login" button without entering a password', async () => {
            await AuthPage.clickLoginButton();
        })

        await AllureHelper.step('Verify that the "Password is required" validation message is displayed', async () => {
            const actualPasswordErrorMessage = await AuthPage.getErrorMessage();
            expect(AuthPage.errorMessage).toBeDisplayed();
            expect(actualPasswordErrorMessage).toHaveText('Password is required');
        })
    })

    it('Confirm that login is rejected when using invalid credentials', async () => {
        const userData = users.invalidUser;

        await AllureHelper.step('Enter invalid username and/or password in the login form', async () => {
            await AuthPage.typeUsername(userData.username);
            await AuthPage.typePassword(userData.password);
        })

        await AllureHelper.step('Click the "Login" button', async () => {
            await AuthPage.clickLoginButton();
        })

        await AllureHelper.step('Verify that access is denied and an appropriate error message is displayed', async () => {
            const actualAuthErrorMessage = await AuthPage.getErrorMessage();
            expect(AuthPage.errorMessage).toBeDisplayed();
            expect(actualAuthErrorMessage).toHaveText('Username and password do not match any user in this service.');
        })
    })

    it('Confirm that login is rejected for a locked user account', async () => {
        const userData = users.lockedUser;

        await AllureHelper.step('Enter valid credentials for a locked user in the login form', async () => {
            await AuthPage.typeUsername(userData.username);
            await AuthPage.typePassword(userData.password);
        })

        await AllureHelper.step('Click the "Login" button', async () => {
            await AuthPage.clickLoginButton();
        })

        await AllureHelper.step('Verify that access is denied and a corresponding error message is displayed', async () => {
            const actualAuthErrorMessage = await AuthPage.getErrorMessage();
            expect(AuthPage.errorMessage).toBeDisplayed();
            expect(actualAuthErrorMessage).toHaveText('Sorry, this user has been locked out.');
        })
    })

    it('Confirm that a registered user can successfully login', async () => {
        const userData = users.validUser;

        await AllureHelper.step('Enter valid credentials for a registered user in the login form', async () => {
            await AuthPage.typeUsername(userData.username);
            await AuthPage.typePassword(userData.password);
        })

        await AllureHelper.step('Click the "Login" button', async () => {
            await AuthPage.clickLoginButton();
        })

        await AllureHelper.step('Verify that the user is successfully authenticated and granted access to the website', async () => {
            const actualProductsHeader = await ProductListPage.getProductsHeader();
            expect(actualProductsHeader).toHaveText('PRODUCTS');
        })
    })

    it('Confirm that the user is successfully logged out of the session', async () => {
        await AllureHelper.step('Log in using valid credentials', async () => {
            await AuthPage.login();
        })

        await AllureHelper.step('Open the navigation menu by clicking the menu button', async () => {
            await ProductListPage.clickMenuButton();
        })

        await AllureHelper.step('Select the "Logout" option from the menu', async () => {
            await SettingsPage.clickLogoutOption();
        })

        await AllureHelper.step('Verify that the user is redirected to the login page and the application logo is visible', async () => {
            const logoIsVisible = await AuthPage.isLogoVisible();
            expect(logoIsVisible).toBe(true);
        })
    })
})
