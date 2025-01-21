export class openNewAccountpage {

  constructor(page) {
    this.page = page;

    this.accountTypeDropDown = this.page.locator("//select[@id='type']")
    this.existingAccountDropDown = this.page.locator("//select[@id='fromAccountId']")
    this.openNewAccountBtn = this.page.getByRole('button', { name: 'Open New Account' })
    this.accountId = this.page.locator("//a[@id='newAccountId']")
    this.successMsg = this.page.locator("//div[@id='openAccountResult']//h1")
  }


  getAccountTypeDropDown() {
    return this.accountTypeDropDown
  }

  getExistingAccountDropDown() {
    return this.existingAccountDropDown
  }
  getOpenNewAccountBtn() {
    this.page.waitForLoadState('load')
    return this.openNewAccountBtn
  }

  getAccountId() {
    this.page.waitForLoadState('load')

    return this.accountId
  }

  getSuccessMsg() {

    return this.successMsg

  }
}