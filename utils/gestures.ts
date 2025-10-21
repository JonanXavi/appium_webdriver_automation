export const Gestures = {
    async dragAndDrop(source: ChainablePromiseElement, target: ChainablePromiseElement) {
        const sourceEl = await source;
        const targetEl = await target;

        await sourceEl.waitForEnabled();
        await targetEl.waitForEnabled();

        await sourceEl.dragAndDrop(targetEl);
    },

    async swipe(element: ChainablePromiseElement, direction: "left" | "right" | "up" | "down", percent = 0.75) {
        await element.waitForEnabled();

        await driver.execute('mobile: swipeGesture', {
            elementId: await element.elementId,
            direction,
            percent,
        });
    },

    async longPress(element: WebdriverIO.Element, duration = 3000) {
        await driver.execute('mobile: longClickGesture', {
            elementId: element.elementId,
            duration,
        });
    },
};