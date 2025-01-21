import { request } from "@playwright/test";
import { homePage } from "./homePage/homepage";
import { registrationForm } from "./registratinFormpage/registrationForm";
import { accountServices } from "./accountServices/accountServices";
import { openNewAccountpage } from "./accountServices/openNewAccount";
import { accountOverViewpage } from "./accountServices/accountoverView";
import { transferFunds } from "./accountServices/transferFunds";
import { billPay } from "./accountServices/billPay";

export class POMmanager {
  constructor(page) {
    this.page = page;
    this.homePage = new homePage(this.page);
    this.registrationFormPage = new registrationForm(this.page)
    this.accountServicesPage = new accountServices(this.page)
    this.openNewAccountpage = new openNewAccountpage(this.page)
    this.accountOverViewpage = new accountOverViewpage(this.page)
    this.transferFundspage = new transferFunds(this.page)
    this.billPaypage = new billPay(this.page)
  }

  getHomePageObj() {
    return this.homePage;
  }

  getRegistrationFormPage() {
    return this.registrationFormPage
  }

  getAccountServicesPage() {
    return this.accountServicesPage
  }


  getOpenNewAccountpage() {
    return this.openNewAccountpage
  }

  getAccountOverViewpage() {
    return this.accountOverViewpage
  }

  getTransferFundspage() {
    return this.transferFundspage
  }

  getBillPay() {
    return this.billPaypage
  }
}

