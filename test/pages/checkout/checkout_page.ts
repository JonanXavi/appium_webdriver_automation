import { $ } from '@wdio/globals';

class CheckoutPage {
    public get checkoutBtn() { return $('~test-CHECKOUT'); }
    public get firstNameInput() { return $('~test-First Name'); }
    public get lastNameInput() { return $('~test-Last Name'); }
    public get zipInput() { return $('~test-Zip/Postal Code'); }
    public get continueBtn() { return $('~test-CONTINUE'); }
    public get finishBtn() { return $('~test-FINISH'); }
    public get thankYouMessage() { return $('//android.widget.TextView[@text="THANK YOU FOR YOU ORDER"]'); }

    async clickCheckoutButton() {
        await this.checkoutBtn.scrollIntoView();
        await this.checkoutBtn.click();
    }

    async typeFirstName(firstName: string) {
        await this.firstNameInput.setValue(firstName);
    }

    async typeLastName(lastName: string) {
        await this.lastNameInput.setValue(lastName);
    }

    async typeZip(zip: string) {
        await this.zipInput.setValue(zip);
    }

    async clickContinueButton() {
        await this.continueBtn.click();
    }

    async clickFinishButton() {
        await this.finishBtn.scrollIntoView();
        await this.finishBtn.click();
    }

    async isThankYouMessageVisible() {
        return this.thankYouMessage.isDisplayed();
    }
}

export default new CheckoutPage();