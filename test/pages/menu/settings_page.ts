import { $ } from '@wdio/globals';

class SettingsPage {
    public get logoutOption() { return $('~test-LOGOUT'); }

    async clickLogoutOption() {
        await this.logoutOption.click();
    }
}

export default new SettingsPage();