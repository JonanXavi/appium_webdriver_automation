import { ENV } from './env';
import allure from '@wdio/allure-reporter';

export async function restartApp() {
    const appPackage = ENV.PACKAGE;

    // @ts-ignore
    await driver.terminateApp(appPackage);
    // @ts-ignore
    await driver.activateApp(appPackage);
}

export class AllureHelper {
    static async step(description: string, fn: () => Promise<void>) {
        allure.startStep(description);
        try {
            await fn();
            // @ts-ignore
            allure.endStep('passed');
        } catch (err) {
            // @ts-ignore
            allure.endStep('failed');
            throw err;
        }
    }
}