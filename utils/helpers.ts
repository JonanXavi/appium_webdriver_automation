import allure from '@wdio/allure-reporter';

export async function restartApp(app: string) {
    // @ts-ignore
    await driver.terminateApp(app);
    await driver.activateApp(app);
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