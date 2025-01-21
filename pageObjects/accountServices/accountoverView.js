export class accountOverViewpage {

  constructor(page) {
    this.page = page;

    this.defaultAccountNumber = this.page.locator("(//table[@id='accountTable']//tbody//tr)[1]//td//a")
    this.total = this.page.locator("//b[.='Total']//parent::td//following-sibling::td//b")

  }


  getDefaultAccountNumber() {

    return this.defaultAccountNumber
  }


  async getBalance(accountNumber) {

    let balance = await this.page.locator("(//a[.='" + accountNumber + "']//ancestor::tr//td)[2]").textContent()
    balance = balance.replace('$', '');

    return balance
  }

  async getAvailableAmount(accountNumber) {
    let availableAmount = await this.page.locator("(//a[.='" + accountNumber + "']//ancestor::tr//td)[3]").textContent()
    availableAmount = availableAmount.replace('$', '');
    return availableAmount
  }

  async getTotal() {

    let total = await this.total.textContent()
    total = total.replace('$', '');
    return total
  }
}