import { $ } from '@wdio/globals';

class AuthPage {
    public get logoImage() { return $('android=new UiSelector().className("android.widget.ImageView").instance(0)'); }
    public get usernameInput() { return $('~test-Username'); }
    public get passwordInput() { return $('~test-Password'); }
    public get loginBtn() { return $('~test-LOGIN'); }
    public get errorMessage() { return $('//*[@content-desc="test-Error message"]//android.widget.TextView'); }
    public get standardUserCredentials() { return $('//android.widget.TextView[@text="standard_user"]'); }

    async isLogoVisible() {
        return await this.logoImage.isDisplayed();
    }

    async typeUsername(username: string) {
        await this.usernameInput.setValue(username);
    }

    async typePassword(password: string) {
        await this.passwordInput.setValue(password);
    }

    async clickLoginButton() {
        await this.loginBtn.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }

    async login() {
        await this.standardUserCredentials.click();
        await this.clickLoginButton();
    }
}

export default new AuthPage();