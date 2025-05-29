import 'dotenv/config';
import { resolve } from 'path';
import fs from 'fs';
import allure from '@wdio/allure-reporter';
import { restartApp } from './utils/helpers.ts';

const videoDir = resolve(__dirname, 'videos');
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}

export const config: WebdriverIO.Config = {

    runner: 'local',
    tsConfigPath: './tsconfig.json',

    hostname: process.env.APPIUM_HOST,
    port: parseInt(process.env.APPIUM_PORT || '4723'),

    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': process.env.DEVICE_NAME,
        'appium:udid': process.env.DEVICE_UDID,
        'appium:automationName': process.env.AUTOMATION_NAME,
        'appium:appPackage': process.env.APP_PACKAGE,
        'appium:appWaitPackage': process.env.APP_PACKAGE,
        'appium:appActivity': process.env.APP_ACTIVITY,
        'appium:avd': process.env.DEVICE_NAME,
        'appium:avdLaunchTimeout': 120000,
        'appium:app': resolve(__dirname, 'apps', process.env.APP || 'android-saucelabs.apk'),
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
        timeout: 60000
    },

    beforeTest: async function () {
        await restartApp(process.env.APP_PACKAGE);
        await driver.startRecordingScreen();
    },

    afterTest: async function (test, context, { passed }) {
        const videoBase64 = await driver.stopRecordingScreen();

        if (!passed && videoBase64) {
            const buffer = Buffer.from(videoBase64, 'base64');
            const filePath = `./videos/${test.title.replace(/\s+/g, '_')}.mp4`;
            fs.writeFileSync(filePath, buffer);
            allure.addAttachment('Execution video', buffer, 'video/mp4');
        }
    },
}
