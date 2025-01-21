const { test, expect,request } = require("@playwright/test");
const environment=require('../Envdetails/envdetails.json')
const { POMmanager } = require("../pageObjects/POMmanager");
const{userCreation}=require('../commonFunctions/createNewUser')
const{login}=require('../commonFunctions/login')
const{billPayeeDetails}=require('../commonFunctions/billPayeeDetails')
test.describe("ParaBank UI Test Scenarios", () => {

        let page;
        let homePageObj
        let NewaccountNumber
        let defaultAccountNumber
        let POMmanagerObj
        let transferAmount
        let NewAccountbalance
        let userDetails={}
        let context
        let accountServicesPageObj
        let openNewAccountpageObj
        let accountOverViewpageObj
        let transferFundspageObj
        let billPaypageObj
        let defaultAccountStartingBalance
        let defaultAccountStartingAvailableAmount
        
    test.beforeAll(async ({browser}) => {
      
      context = await browser.newContext();
      page = await context.newPage()
       await context.clearCookies(); 
       await context.clearPermissions();

        POMmanagerObj = new POMmanager(page);
        homePageObj = POMmanagerObj.getHomePageObj()
        accountServicesPageObj=POMmanagerObj.getAccountServicesPage()
        openNewAccountpageObj=POMmanagerObj.getOpenNewAccountpage()
        accountOverViewpageObj=POMmanagerObj.getAccountOverViewpage()
        transferFundspageObj=POMmanagerObj.getTransferFundspage()
        billPaypageObj=POMmanagerObj.getBillPay()
      await page.goto(environment.baseURL)
      await Promise.all([
          page.waitForLoadState('domcontentloaded'),
          page.waitForLoadState('networkidle'),
          page.waitForLoadState('load'),
          
        ]);


    });


    test.beforeEach(async()=>{

        
        console.log('Test case execution started')

    })

    test.afterAll( async()=>{

        await page.close()
      })
      
    test.afterEach(async() => {


        console.log('Test case execution completed')
        
    })


test('Navigate to Para bank application',async()=>{

        
        await expect(await homePageObj.getParaBankLogo()).toBeVisible()
        await page.waitForTimeout(2000)


})

test('Create a new user from user registration page (Ensure username is generated randomly and it is unique in every test execution)',async()=>{


  await homePageObj.getRegiterationLink().click()
  await page.waitForTimeout(2000)
  userDetails=await userCreation(page)

await expect.soft(await accountServicesPageObj.getLogineduserWelomeMsg()).toHaveText(`Welcome ${userDetails.fName} ${userDetails.lName}`)
await accountServicesPageObj.getLogoutBtn().click()


})

 test('Login to the application with the user created',async()=>{

    await homePageObj.getRegiterationLink().click()
    await page.waitForTimeout(2000)
    userDetails=await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page,userDetails.userName,userDetails.password)

  await expect.soft(await accountServicesPageObj.getLogineduserWelomeMsg()).toHaveText(`Welcome ${userDetails.fName} ${userDetails.lName}`)
  await accountServicesPageObj.getLogoutBtn().click()

 })   


 

 test('Create a Savings account from “Open New Account Page” and capture the account number.',async()=>{

  
    await homePageObj.getRegiterationLink().click()
    await page.waitForTimeout(2000)
    userDetails=await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page,userDetails.userName,userDetails.password)

  const responsePromise =page.waitForResponse(response => response.url().includes('/accounts'),{ timeout: 120000 });
  await accountServicesPageObj.getAccountOverViewlink().click()
  await responsePromise;
  
     await accountOverViewpageObj.getDefaultAccountNumber().screenshot({ path: 'defaultAccount.png', fullPage: true });
     defaultAccountNumber = await (await accountOverViewpageObj.getDefaultAccountNumber()).textContent()
     defaultAccountStartingBalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)
     defaultAccountStartingAvailableAmount = await accountOverViewpageObj.getAvailableAmount(defaultAccountNumber)
     await accountServicesPageObj.getOpenNewAccountlink().click()
     const responsePromiseNewAccount = page.waitForResponse(response => response.url().endsWith('/accounts'), { timeout: 120000 });
     await accountServicesPageObj.getOpenNewAccountlink().click()
     await responsePromiseNewAccount;
     await page.waitForLoadState('domcontentloaded'),
         await page.waitForLoadState('networkidle'),
         await page.waitForLoadState('load'),


         await openNewAccountpageObj.getAccountTypeDropDown().selectOption('SAVINGS')
     await openNewAccountpageObj.getExistingAccountDropDown().selectOption(defaultAccountNumber)
     await openNewAccountpageObj.getOpenNewAccountBtn().waitFor()
     await openNewAccountpageObj.getOpenNewAccountBtn().dblclick()
     await page.waitForTimeout(5000)
     await openNewAccountpageObj.getAccountId().waitFor()
     NewaccountNumber = await openNewAccountpageObj.getAccountId().textContent()
     await expect.soft(await openNewAccountpageObj.getSuccessMsg()).toHaveText("Account Opened!")
     await accountServicesPageObj.getLogoutBtn().click()

 })

    
     
test ('Validate if Accounts overview page is displaying the balance details as expected.',async()=>{

    await homePageObj.getRegiterationLink().click()
    await page.waitForTimeout(2000)
    userDetails = await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page, userDetails.userName, userDetails.password)

    const responsePromise = page.waitForResponse(response => response.url().includes('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getAccountOverViewlink().click()
    await responsePromise;

    await accountOverViewpageObj.getDefaultAccountNumber().screenshot({ path: 'defaultAccount.png', fullPage: true });
    defaultAccountNumber = await (await accountOverViewpageObj.getDefaultAccountNumber()).textContent()
    defaultAccountStartingBalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)
    defaultAccountStartingAvailableAmount = await accountOverViewpageObj.getAvailableAmount(defaultAccountNumber)
    await accountServicesPageObj.getOpenNewAccountlink().click()



    const responsePromiseNewAccount = page.waitForResponse(response => response.url().endsWith('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getOpenNewAccountlink().click()
    await responsePromiseNewAccount;

    await page.waitForLoadState('domcontentloaded'),
        await page.waitForLoadState('networkidle'),
        await page.waitForLoadState('load'),


        await openNewAccountpageObj.getAccountTypeDropDown().selectOption('SAVINGS')
    await openNewAccountpageObj.getExistingAccountDropDown().selectOption(defaultAccountNumber)
    await openNewAccountpageObj.getOpenNewAccountBtn().waitFor()
    await openNewAccountpageObj.getOpenNewAccountBtn().dblclick()
    await openNewAccountpageObj.getAccountId().waitFor()
    NewaccountNumber = await openNewAccountpageObj.getAccountId().textContent()

    await accountServicesPageObj.getAccountOverViewlink().click()
    let defaultAccountCurrentbalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)

    NewAccountbalance = await accountOverViewpageObj.getBalance(NewaccountNumber)
    await expect(defaultAccountCurrentbalance).toBe((defaultAccountStartingBalance - NewAccountbalance).toFixed(2))
    await expect.soft(NewAccountbalance).toBe('100.00')
    await accountServicesPageObj.getLogoutBtn().click()



})



test('Transfer funds from account created in step 5 to another account.',async()=>{

    await homePageObj.getRegiterationLink().click()
    await page.waitForTimeout(2000)
    userDetails = await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page, userDetails.userName, userDetails.password)

    const responsePromise = page.waitForResponse(response => response.url().includes('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getAccountOverViewlink().click()
    await responsePromise;
    await accountOverViewpageObj.getDefaultAccountNumber().screenshot({ path: 'defaultAccount.png', fullPage: true });
    defaultAccountNumber = await (await accountOverViewpageObj.getDefaultAccountNumber()).textContent()
    defaultAccountStartingBalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)


    defaultAccountStartingAvailableAmount = await accountOverViewpageObj.getAvailableAmount(defaultAccountNumber)
    await accountServicesPageObj.getOpenNewAccountlink().click()
    const responsePromiseNewAccount = page.waitForResponse(response => response.url().endsWith('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getOpenNewAccountlink().click()
    await responsePromiseNewAccount;

    await page.waitForLoadState('domcontentloaded'),
        await page.waitForLoadState('networkidle'),
        await page.waitForLoadState('load'),


        await openNewAccountpageObj.getAccountTypeDropDown().selectOption('SAVINGS')
    await openNewAccountpageObj.getExistingAccountDropDown().selectOption(defaultAccountNumber)
    await openNewAccountpageObj.getOpenNewAccountBtn().waitFor()
    await openNewAccountpageObj.getOpenNewAccountBtn().dblclick()
    await openNewAccountpageObj.getAccountId().waitFor()
    NewaccountNumber = await openNewAccountpageObj.getAccountId().textContent()

    await accountServicesPageObj.getAccountOverViewlink().click()
    await page.waitForTimeout(2000)
    let defaultAccountCurrentbalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)

    NewAccountbalance = await accountOverViewpageObj.getBalance(NewaccountNumber)

    await accountServicesPageObj.getFundTransferLink().click()
    transferAmount = Math.floor(Math.random() * (NewAccountbalance - 1 + 1)) + 1

    await transferFundspageObj.getAmountField().type(transferAmount.toString())
    await transferFundspageObj.getFromAccountDropDown().selectOption(NewaccountNumber)

    await transferFundspageObj.getTransferbtn().click()


    await expect.soft(await transferFundspageObj.getSuccessMsg()).toHaveText("Transfer Complete!")
    await accountServicesPageObj.getLogoutBtn().click()

})

test('Pay the bill with account created',async()=>{

    await homePageObj.getRegiterationLink().click()
    await page.waitForTimeout(2000)
    userDetails = await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page, userDetails.userName, userDetails.password)

    const responsePromise = page.waitForResponse(response => response.url().includes('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getAccountOverViewlink().click()
    await responsePromise;

    await accountOverViewpageObj.getDefaultAccountNumber().screenshot({ path: 'defaultAccount.png', fullPage: true });
    defaultAccountNumber = await (await accountOverViewpageObj.getDefaultAccountNumber()).textContent()
    defaultAccountStartingBalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)


    defaultAccountStartingAvailableAmount = await accountOverViewpageObj.getAvailableAmount(defaultAccountNumber)
    await accountServicesPageObj.getOpenNewAccountlink().click()
    const responsePromiseNewAccount = page.waitForResponse(response => response.url().endsWith('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getOpenNewAccountlink().click()
    await responsePromiseNewAccount;

    await page.waitForLoadState('domcontentloaded'),
        await page.waitForLoadState('networkidle'),
        await page.waitForLoadState('load'),


        await openNewAccountpageObj.getAccountTypeDropDown().selectOption('SAVINGS')
    await openNewAccountpageObj.getExistingAccountDropDown().selectOption(defaultAccountNumber)
    await openNewAccountpageObj.getOpenNewAccountBtn().waitFor()
    await openNewAccountpageObj.getOpenNewAccountBtn().dblclick()
    await openNewAccountpageObj.getAccountId().waitFor()
    NewaccountNumber = await openNewAccountpageObj.getAccountId().textContent()

    await accountServicesPageObj.getAccountOverViewlink().click()
    NewAccountbalance = await accountOverViewpageObj.getBalance(NewaccountNumber)
    let amount = Math.floor(Math.random() * (NewAccountbalance - 1 + 1)) + 1
    let payeeAccountNumber = defaultAccountNumber
    await accountServicesPageObj.getBillPayLink().click()
    await billPayeeDetails(page, payeeAccountNumber, NewaccountNumber, amount)
    await expect.soft(await billPaypageObj.getSuccessMsg()).toHaveText("Bill Payment Complete")
    await accountServicesPageObj.getLogoutBtn().click()


})

test('Search the transactions using “Find transactions” API call by amount for the payment transactions made in Step 8. Validate the details displayed in Json response',async()=>{

    await homePageObj.getRegiterationLink().click()
    await page.waitForTimeout(2000)
    userDetails = await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page, userDetails.userName, userDetails.password)

    const responsePromise = page.waitForResponse(response => response.url().includes('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getAccountOverViewlink().click()
    await responsePromise;

    await accountOverViewpageObj.getDefaultAccountNumber().screenshot({ path: 'defaultAccount.png', fullPage: true });
    defaultAccountNumber = await (await accountOverViewpageObj.getDefaultAccountNumber()).textContent()
    defaultAccountStartingBalance = await accountOverViewpageObj.getBalance(defaultAccountNumber)
    defaultAccountStartingAvailableAmount = await accountOverViewpageObj.getAvailableAmount(defaultAccountNumber)
    await accountServicesPageObj.getOpenNewAccountlink().click()
    const responsePromiseNewAccount = page.waitForResponse(response => response.url().endsWith('/accounts'), { timeout: 120000 });
    await accountServicesPageObj.getOpenNewAccountlink().click()
    await responsePromiseNewAccount;

    await page.waitForLoadState('domcontentloaded'),
        await page.waitForLoadState('networkidle'),
        await page.waitForLoadState('load'),


        await openNewAccountpageObj.getAccountTypeDropDown().selectOption('SAVINGS')
    await openNewAccountpageObj.getExistingAccountDropDown().selectOption(defaultAccountNumber)
    await openNewAccountpageObj.getOpenNewAccountBtn().waitFor()
    await openNewAccountpageObj.getOpenNewAccountBtn().dblclick()
    await openNewAccountpageObj.getAccountId().waitFor()
    NewaccountNumber = await openNewAccountpageObj.getAccountId().textContent()


    await accountServicesPageObj.getAccountOverViewlink().click()
    NewAccountbalance = await accountOverViewpageObj.getBalance(NewaccountNumber)
    console.log("New account current balance :" + NewAccountbalance)


    await accountServicesPageObj.getFundTransferLink().click()
    console.log(NewAccountbalance)
    transferAmount = Math.floor(Math.random() * (NewAccountbalance - 1 + 1)) + 1
    console.log("transfer amount random genartod:" + transferAmount)
    await transferFundspageObj.getAmountField().type(transferAmount.toString())
    await transferFundspageObj.getFromAccountDropDown().selectOption(NewaccountNumber)
    await transferFundspageObj.getTransferbtn().click()
    let apiRequest = await request.newContext()
    let jsessionId
    const cookies = await context.cookies();
    const jsessionIdCookie = cookies.find(cookie => cookie.name === 'JSESSIONID');

    if (jsessionIdCookie) {
        jsessionId = jsessionIdCookie.value;


    } else {
        console.log('JSESSIONID cookie not found.');
    }


    let response = await apiRequest.get(`${environment.baseURL}/services_proxy/bank/accounts/${NewaccountNumber}/transactions/amount/${transferAmount}?timeout=30000`,
        {
            headers: {
                'Conten-Type': 'application/json',
                'Cookie': `JSESSIONID=${jsessionId}`

            },


        });

    const responseBodyJson = await response.json()
    console.log("Status code :" + response.status())
    await expect.soft(response.status()).toBe(200)
    console.log("Response JSON :\n" + JSON.stringify(responseBodyJson, null, 2))
    await expect.soft(responseBodyJson[0].accountId.toString()).toBe(NewaccountNumber)
    await expect.soft(responseBodyJson[0].amount).toBe(transferAmount)

    await accountServicesPageObj.getLogoutBtn().click()

})

test('Verify if the Global navigation menu in home page is working as expected.',async()=>{

    await homePageObj.getRegiterationLink().click()
    userDetails = await userCreation(page)
    await accountServicesPageObj.getLogoutBtn().click()
    await login(page, userDetails.userName, userDetails.password)
    const itemCount = await homePageObj.getGlobalNavigationMenuItems().count();
    for (let i = 0; i < itemCount; i++) {
        const listItemText = await homePageObj.getGlobalNavigationMenuItems().nth(i).textContent();
        console.log(`Processing link ${i + 1}: ${listItemText}`);

        try {

            const anchor = await homePageObj.getGlobalNavigationMenuItems().nth(i).locator('a');
            await expect.soft(anchor).toHaveCount(1);

            if (await anchor.count() > 0) {

                const href = await anchor.getAttribute('href');
                console.log(`Link: ${href}`);


                await expect.soft(href).not.toBeNull();
                await expect.soft(href).not.toBe('');
                let url = environment.baseURL;
                const absoluteUrl = new URL(href, url).toString();
                console.log(`Absolute URL: ${absoluteUrl}`);
                // Check if the link is working
                const response = await page.request.get(absoluteUrl);
                // Soft assertion for response status
                await expect.soft(response.ok()).toBeTruthy(); // Ensure the response status is 200-299
                console.log(`Link ${i + 1} is valid with status: ${response.status()}`);

            }
        }

        catch (error) {
            // Log the specific error for the current link
            console.error(`Error with link ${i + 1}: ${error.message}`);
            // Continue with the next link even if there's an error in the current iteration
        }
    }


  })
  
})
