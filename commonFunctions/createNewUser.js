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
let ssn
let passwordd
let POMmanagerObj
let registrationFormPageObj
let accountServicesPageObj

async function userCreation(page) {
  commonUtilitiesObj = new commonUtilities(page)
  POMmanagerObj = new POMmanager(page);
  registrationFormPageObj = POMmanagerObj.getRegistrationFormPage()
  accountServicesPageObj = POMmanagerObj.getAccountServicesPage()

  firstName = await commonUtilitiesObj.RandomStringGenratorWithLength(5)
  lastName = await commonUtilitiesObj.RandomStringGenratorWithLength(5)
  address = await commonUtilitiesObj.RandomStringGenratorWithLength(5)
  city = 'Thrissur'
  state = 'kerala'
  zipCode = '680685'
  ssn = await commonUtilitiesObj.RandomStringGenratorWithLength(8)
  console.log(ssn)

  let userNames = await commonUtilitiesObj.RandomStringGenratorWithLength(10)
  console.log(userNames)
  passwordd = await commonUtilitiesObj.generateRandomPassword(8)



  await registrationFormPageObj.getFirstNameField().type(firstName)
  await registrationFormPageObj.getLastNameField().type(lastName)
  await registrationFormPageObj.getAddressField().type(address)
  await registrationFormPageObj.getCityField().type(city)
  await registrationFormPageObj.getStateField().type(state)
  await registrationFormPageObj.getZipcodeField().type(zipCode)


  await registrationFormPageObj.getSsnField().type(ssn)
  await registrationFormPageObj.getUserNameField().type(userNames)
  await registrationFormPageObj.getPasswordField().type(passwordd)
  await registrationFormPageObj.getRepeatpasswordField().type(passwordd)
  await registrationFormPageObj.getRegistorBtn().click()

  userDetails.fName = firstName
  userDetails.lName = lastName
  userDetails.userName = userNames
  userDetails.password = passwordd

  return userDetails

}
module.exports = {
  userCreation,
};