import { config } from "dotenv";

config({
    override: true
});

export class ENV {
    public static readonly HOST = process.env.APPIUM_HOST;
    public static readonly PORT = process.env.APPIUM_PORT;
    public static readonly DEVICE = process.env.DEVICE_NAME;
    public static readonly UDID = process.env.DEVICE_UDID;
    public static readonly DRIVER = process.env.AUTOMATION_NAME;
    public static readonly PACKAGE = process.env.APP_PACKAGE;
    public static readonly ACTIVITY = process.env.APP_ACTIVITY;
    public static readonly APP = process.env.APP;
}