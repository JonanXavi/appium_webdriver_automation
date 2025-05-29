//!import { expect } from '@wdio/globals'
import { AllureHelper } from '../../utils/helpers.ts'

describe('Test the configuration - AVD', () => {
    it('Test environment - PASS', async () => {
        await AllureHelper.step('Enter the required information in the "Login" form', async () => {
            await $('~test-Username').setValue('standard_user');
            await $('~test-Password').setValue('secret_sauce');
        })

        await AllureHelper.step('Click the "Login" button in the form', async () => {
            await $('~test-LOGIN').click();
        })

        await new Promise(resolve => setTimeout(resolve, 5000));
    })

    it('Test environment - FAIL', async () => {
        await AllureHelper.step('Enter the required information in the "Login" form', async () => {
            await $('~test-Username').setValue('standard_user');
            await $('~test-Password').setValue('secret_sauce');
        })

        await AllureHelper.step('Click the "Login" button in the form', async () => {
            await $('~test-LOGIN').click();
        })

        await AllureHelper.step('Clic titulo', async () => {
            await $('~test-title').click();
        })
    })
})

