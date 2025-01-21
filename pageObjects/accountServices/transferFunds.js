export class transferFunds {

  constructor(page) {
    this.page = page;
    this.amountField = this.page.locator("//input[@id='amount']")
    this.fromAccountDropDown = this.page.locator("//select[@id='fromAccountId']")
    this.transferbtn = this.page.locator("//input[@value='Transfer']")
    this.successMsg = this.page.locator("//div[@id='showResult']//h1")



  }

  getAmountField() {
    return this.amountField
  }

  getFromAccountDropDown() {

    return this.fromAccountDropDown
  }

  getTransferbtn() {

    return this.transferbtn

  }

  getSuccessMsg() {
    return this.successMsg
  }
}