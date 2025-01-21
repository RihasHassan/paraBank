const { commonUtilities } = require('../utilities/commonUtilities')
const { POMmanager } = require("../pageObjects/POMmanager");

let POMmanagerObj
let homePageObj


async function login(page, username, password) {

  POMmanagerObj = new POMmanager(page);
  homePageObj = POMmanagerObj.getHomePageObj()



  await homePageObj.getUserNameField().type(username)
  await homePageObj.getPasswordField().type(password)
  await homePageObj.getLoginBtn().click()
  await Promise.all([
    page.waitForLoadState('domcontentloaded'),
    page.waitForLoadState('networkidle'),
    page.waitForLoadState('load'),

  ]);

}
module.exports = {
  login,
};