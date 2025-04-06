const { expect, browser, test } = require('@playwright/test');
import { Page } from "@playwright/test";
import LoginPage from "../../Pages/LoginPage";
import AccointServicePage from "../../Pages/AccountServicePage";
import { idpData , data } from "../../TestData/data";

const authFile = 'user.json';
let page, newContext, page1, newContext1;
let loginPage: LoginPage;
let accountServicePage: AccointServicePage;
let output: any;
let totalBalance: string;
let fromSavingsAccountNumber: string;
let toCurrentAccountNumber: string;

test.describe.serial('use the same page', () => {
  let username: string;
  let password: string;
/*this below line is created so it will reduce time to create new account*/
  test.beforeAll(async ({ browser }) => {
    newContext = await browser.newContext({storageState: "./user.json"});
    page = await newContext.newPage();
    await page.goto("https://parabank.parasoft.com/", 5000);
    loginPage = new LoginPage(page);
    accountServicePage = new AccointServicePage(page);
   

   
  });
/*------------------------------------------------------------------*/

/* this below line is created when indivisual script needs to test*/

  // test.beforeAll(async ({ browser }) => {
  //   newContext = await browser.newContext();
  //   newContext1 = await browser.newContext();
  //   page = await newContext.newPage();
  //   await page.goto("https://parabank.parasoft.com/", 5000);
  //   loginPage = new LoginPage(page);
  //   username =  loginPage.generateParabankUsername();
  //   console.log("username::::::" + username);
  //   password = idpData.password;
  // await loginPage.userRegistration(username, password);
    // await loginPage.waitForRegisteredSuccessMessage();
   
  // });

 

  






  test('create a savings account', async () => {
    await page.locator(accountServicePage.accountServiceELements.accountOverviewPageTitle).click();
    toCurrentAccountNumber= await page.locator(accountServicePage.accountServiceELements.accountNumber).first().textContent();
    console.log("toSavingsAccountNumber::::::"+toCurrentAccountNumber);
    await page.locator(accountServicePage.accountServiceELements.total_balance).waitFor({state: "visible",timeout: 30000});
     totalBalance = await page.locator(accountServicePage.accountServiceELements.total_balance).textContent();
    console.log("Total Balance::::::"+totalBalance);
      output = (await accountServicePage.selectSavingsAccountType());
    console.log("savingsAccountNumber::::::"+output.savingAccountNumber);
    fromSavingsAccountNumber= output.savingAccountNumber;
    console.log("fromSavingsAccountNumber::::::"+fromSavingsAccountNumber);

    expect(await output.successText).toBeTruthy();


    // await page.pause();
    
   
  });

  test('verify the account number and balance in account verify page', async () => {
    await page.locator(accountServicePage.accountServiceELements.accountOverviewPageTitle).click();
    await page.locator(accountServicePage.accountServiceELements.accountNumber).first().waitFor({ state: 'visible' });
    console.log("Account Number::::::"+await page.locator(accountServicePage.accountServiceELements.accountNumber).allTextContents());
    expect(await page.locator(accountServicePage.accountServiceELements.accountNumber).allTextContents()).toContain(output.savingAccountNumber);
    console.log("Account Balance::::::"+await page.locator(accountServicePage.accountServiceELements.accountBalance).allTextContents());
    const accountBalance = await page.locator(accountServicePage.accountServiceELements.accountBalance).allTextContents();
    console.log("Account Balance::::::"+accountBalance);
    // console.log("Account Balance::::::"+accountServicePage.IndivisualAccountBalanceCheckWithTotal());
    expect(await accountServicePage.IndivisualAccountBalanceCheckWithTotal()).toBeTruthy();
    
   // expect(await page.locator(accountServicePage.accountServiceELements.accountBalance).textContents()).toContain(totalBalance);
    
    
  });


  
  test('verify the transfer money from savings account number', async () => {
  //   fromSavinngsAccountNumber and toSavingsAccountNumber fetched from the previous test case  "create a savings account" //
  const output = (await accountServicePage.transferAccountToAccount(fromSavingsAccountNumber , toCurrentAccountNumber , data.transferAmount));
  console.log("output::::::::::"+output.successText);
    console.log("output::::::::::"+output.ammountResult);
    console.log("output::::::::::"+output.fromAccountResult);
    console.log("output::::::::::"+output.toAccountResult); 
  expect(await output.successText).toBeTruthy();
    expect(await output.ammountResult).toContain(data.transferAmount);
    expect(await output.toAccountResult).toContain(toCurrentAccountNumber);
    expect(await output.fromAccountResult).toContain(fromSavingsAccountNumber);

    
  });


  test('verify the bill pay functionality ', async () => {
    const output = (await accountServicePage.payTheBill(toCurrentAccountNumber , fromSavingsAccountNumber));
    console.log("output::::::::::"+output.successText);
    console.log("output::::::::::"+output.billAmountResult);
    console.log("output::::::::::"+output.billFromAccountResult);
    expect(await output.successText).toBeTruthy();
    expect(await output.billAmountResult.replace(/[^0-9.]/g, '')).toEqual(data.payeAmount);
    expect(await output.billFromAccountResult).toEqual(fromSavingsAccountNumber);
   
    


});



test('verify the transactions API call by the ammount ', async () => {

  const url = "https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/" + fromSavingsAccountNumber + "/transactions/amount/" + data.transferAmount + "?timeout=30000";

 console.log("url::::::::::"+url);
  await page.goto(url , { timeout: 5000 });
  const response = await page.waitForResponse(url, { timeout: 15000 });
  const responseBody = await response.json();
  console.log("responseBody::::::"+responseBody);
  expect(responseBody).toBeTruthy();
  expect(responseBody.transactionType).toEqual("Debit");



});






});

// await page.context().storageState({ path: authFile });









