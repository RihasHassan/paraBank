const { commonUtilities } = require('../utilities/commonUtilities')
const { POMmanager } = require("../pageObjects/POMmanager");



let commonUtilitiesObj
let userDetails = {}
let firstName
let lastName
let address
let city
let state
let zipCode
let POMmanagerObj
let billPayPageObj
let phonenumber

async function billPayeeDetails(page, payeeAccountNumber, accountNumber, amount) {
  commonUtilitiesObj = new commonUtilities(page)
  POMmanagerObj = new POMmanager(page);
  billPayPageObj = POMmanagerObj.getBillPay()


  firstName = await commonUtilitiesObj.RandomStringGenratorWithLength(5)
  lastName = await commonUtilitiesObj.RandomStringGenratorWithLength(5)
  address = await commonUtilitiesObj.RandomStringGenratorWithLength(5)
  city = 'Thrissur'
  state = 'kerala'
  zipCode = '680685'
  phonenumber = await commonUtilitiesObj.RandomNumberGenratorWithLength(8)
  await billPayPageObj.getPayeeNameFiled().type(firstName)

  await billPayPageObj.getAddressFiled().type(address)
  await billPayPageObj.getCityField().type(city)
  await billPayPageObj.getStateField().type(state)
  await billPayPageObj.getZipcodeField().type(zipCode)


  await billPayPageObj.getPoneNumberField().type(phonenumber.toString())
  await billPayPageObj.getAccountnumberField().type(payeeAccountNumber.toString())
  await billPayPageObj.getVerifyaccountField().type(payeeAccountNumber.toString())
  await billPayPageObj.getAmountField().type(amount.toString())
  await billPayPageObj.getFromaccountIdDropDown().selectOption(accountNumber)

  await billPayPageObj.getSendpaymentBtn().click()




  return userDetails

}
module.exports = {
  billPayeeDetails,
};