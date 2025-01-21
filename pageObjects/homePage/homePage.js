


export class homePage {

  constructor(page) {
    this.page = page;

    this.globalNavigationMenuItems = this.page.locator("//ul[@class='leftmenu']//li")
    this.paraBankLogo = this.page.locator("//img[contains(@src,'images/logo.gif')]")

    this.registerationLink = this.page.locator("//a[.='Register']")

    this.userNameField = this.page.locator("//input[@name='username']")
    this.passwordField = this.page.locator("//input[@name='password']")
    this.loginBtn = this.page.locator("//input[@value='Log In']")

  }

  getParaBankLogo() {

    return this.paraBankLogo
  }

  getGlobalNavigationMenuItems() {
    return this.globalNavigationMenuItems
  }
  getRegiterationLink() {
    return this.registerationLink
  }

  getUserNameField() {

    return this.userNameField
  }

  getPasswordField() {
    return this.passwordField
  }

  getLoginBtn() {
    return this.loginBtn
  }}
