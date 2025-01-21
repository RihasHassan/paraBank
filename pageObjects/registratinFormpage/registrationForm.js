export class registrationForm {

    constructor(page) {
        this.page = page;

        this.paraBankLogo = this.page.locator("//img[contains(@src,'images/logo.gif')]")

        this.firstNameField = this.page.locator("//input[@id='customer.firstName']")
        this.lastNameField = this.page.locator("//input[@id='customer.lastName']")
        this.addressField = this.page.locator("//input[@id='customer.address.street']")
        this.cityField = this.page.locator("//input[@id='customer.address.city']")
        this.stateField = this.page.locator("//input[@id='customer.address.state']")
        this.zipcodeField = this.page.locator("//input[@id='customer.address.zipCode']")
        this.ssnField = this.page.locator("//input[@id='customer.ssn']")
        this.userNameField = this.page.locator("//input[@id='customer.username']")
        this.passwordField = this.page.locator("//input[@id='customer.password']")
        this.repeatpasswordField = this.page.locator("//input[@id='repeatedPassword']")
        this.registorBtn = this.page.locator("//input[@value='Register']")


    }

    getFirstNameField() {
        return this.firstNameField
    }

    getLastNameField() {
        return this.lastNameField
    }

    getAddressField() {
        return this.addressField
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

    getSsnField() {
        return this.ssnField
    }

    getUserNameField() {
        return this.userNameField
    }

    getPasswordField() {
        return this.passwordField
    }

    getRepeatpasswordField() {
        return this.repeatpasswordField
    }
    getRegistorBtn() {
        return this.registorBtn
    }

}  