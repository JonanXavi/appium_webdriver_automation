import { ENV } from './utils/env';
import { resolve } from 'path';
import fs from 'fs';
import allure from '@wdio/allure-reporter';

const videoDir = resolve(__dirname, 'videos');
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}

export const config: WebdriverIO.Config = {

    runner: 'local',
    tsConfigPath: './tsconfig.json',

    hostname: ENV.HOST,
    port: parseInt(ENV.PORT || '4723'),

    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': ENV.DEVICE,
        'appium:udid': ENV.UDID,
        'appium:automationName': ENV.DRIVER,
        'appium:appPackage': ENV.PACKAGE,
        'appium:appWaitPackage': ENV.PACKAGE,
        'appium:appActivity': ENV.ACTIVITY,
        'appium:avd': ENV.DEVICE,
        'appium:avdLaunchTimeout': 120000,
        'appium:app': resolve(__dirname, 'apps', ENV.APP || 'android-saucelabs.apk'),
        'appium:autoGrantPermissions': true,
        'appium:noReset': false
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        retries: 1,
        bail: false
    },

    beforeTest: async function () {
        await driver.startRecordingScreen();
    },

    afterTest: async function (test, _context, { passed }) {
        const videoBase64 = await driver.stopRecordingScreen();

        if (!passed && videoBase64) {
            const buffer = Buffer.from(videoBase64, 'base64');
            const filePath = `./videos/${test.title.replace(/\s+/g, '_')}.mp4`;
            fs.writeFileSync(filePath, buffer);
            allure.addAttachment('Execution video', buffer, 'video/mp4');
        }
    },
}
