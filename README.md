# WebdriverIO Appium Automation
This project uses the WebdriverIO framework with Appium and TypeScript to perform end-to-end (E2E) testing. The goal is to provide a scalable, efficient, and easily maintainable solution for validating functionalities.

## 📋 Requirements
To run the project, the following requirements must be met:
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [allure-npm](https://github.com/allure-framework/allure-npm)
- [Android Studio](https://developer.android.com/studio) (Virtual Device)
- [Appium Server](https://github.com/appium/appium)

## ⚙️ Installation
To install the project dependencies, run the following command in the root of the repository:
```bash
npm install
```

## 🌎 Environment Configuration
To configure the device that will execute the project, it is necessary to define the execution environment `.env` file.

Example of `.env`:
```ini
APPIUM_HOST=127.0.0.1
APPIUM_PORT=4723
DEVICE_NAME=Pixel_7a
DEVICE_UDID=emulator-5554
AUTOMATION_NAME=UiAutomator2
APP_PACKAGE=com.swaglabsmobileapp
APP_ACTIVITY=.MainActivity
APP=android-saucelabs.apk
```

## 🚀 Running Tests
> [!CAUTION]
> Test execution requires either an active emulator or a physical device connected to the computer with debugging mode enabled.

### Run Tests
```bash
npm run test:ui-headed
```

## 📊 Generating Reports
To generate and view the test report with **Allure**, run:
```bash
npm run test:report
```
This will generate the reports in the `allure-results` folder.

## 📂 Project Structure
```bash
📁 appium_webdriver_automation
├── 📁 allure-report
├── 📁 allure-results
├── 📁 apps
├── 📁 data
├── 📁 test
│   ├── 📁 pages
│   └── 📁 specs
├── 📁 utils
├── 📁 videos
├── 🔐 .env
├── 🚫 .gitignore
├── 📦 package.json
├── 📦 package-lock.json
├── 📃 README.md
├── 🔧 tsconfig.json
└── 🔧 wdio.conf.ts
```

## Author
- [@jonanxavi](https://www.github.com/jonanxavi)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jonathan-fernandez-/)