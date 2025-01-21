export class accountServices {

  constructor(page) {
    this.page = page;


    this.logineduserWelomeMsg = this.page.locator("//h2[.='Account Services']//parent::div//p")
    this.openNewAccountlink = this.page.locator("//a[.='Open New Account']")
    this.accountOverViewlink = this.page.locator("//a[.='Accounts Overview']")
    this.logoutBtn = this.page.locator("//a[.='Log Out']")
    this.fundTransferLink = this.page.locator("//a[.='Transfer Funds']")
    this.billPayLink = this.page.locator("//a[.='Bill Pay']")

  }

  getLogineduserWelomeMsg() {
    return this.logineduserWelomeMsg
  }

  getOpenNewAccountlink() {
    return this.openNewAccountlink
  }

  getAccountOverViewlink() {
    return this.accountOverViewlink
  }
  getFundTransferLink() {
    return this.fundTransferLink
  }

  getBillPayLink() {
    return this.billPayLink
  }
  getLogoutBtn() {

    return this.logoutBtn
  }
}


