export class billPay {

    constructor(page) {
        this.page = page;
        this.payeeNameFiled = this.page.locator("//input[@name='payee.name']")
        this.addressFiled = this.page.locator("//input[@name='payee.address.street']")
        this.cityField = this.page.locator("//input[@name='payee.address.city']")
        this.stateField = this.page.locator("//input[@name='payee.address.state']")
        this.zipcodeField = this.page.locator("//input[@name='payee.address.zipCode']")

        this.phoneNumberField = this.page.locator("//input[@name='payee.phoneNumber']")
        this.accountnumberField = this.page.locator("//input[@name='payee.accountNumber']")
        this.verifyaccountField = this.page.locator("//input[@name='verifyAccount']")
        this.amountField = this.page.locator("//input[@name='amount']")
        this.fromaccountIdDropDown = this.page.locator("//select[@name='fromAccountId']")
        this.sendpaymentBtn = this.page.getByRole('button', { name: 'Send Payment' })
        this.successMsg = this.page.locator("//div[@id='billpayResult']//h1")


    }
    getPayeeNameFiled() {

        return this.payeeNameFiled

    }

    getAddressFiled() {
        return this.addressFiled

    }

    getCityField() {

        return this.cityField
    }

    getStateField() {

        return this.stateField
    }

    getZipcodeField() {
        return this.zipcodeField
    }


    getPoneNumberField() {
        return this.phoneNumberField
    }

    getAccountnumberField() {

        return this.accountnumberField
    }

    getVerifyaccountField() {
        return this.verifyaccountField
    }

    getAmountField() {
        return this.amountField
    }

    getFromaccountIdDropDown() {
        return this.fromaccountIdDropDown
    }

    getSendpaymentBtn() {
        return this.sendpaymentBtn
    }
    getSuccessMsg() {
        return this.successMsg
    }
}