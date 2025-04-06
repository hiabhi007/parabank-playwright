const { expect, browser, test } = require('@playwright/test');
import { Page } from "@playwright/test";
import LoginPage from "../../Pages/LoginPage";
import { idpData } from "../../TestData/data";

const authFile = 'user.json';
let page, newContext, page1, newContext1;
let loginPage: LoginPage;
const authTest2 = 'user.json';

test.describe.serial('use the same page', () => {
  let username: string;
  let password: string;

  test.beforeAll(async ({ browser }) => {
    newContext = await browser.newContext();
    newContext1 = await browser.newContext();
    page = await newContext.newPage();
    await page.goto("https://parabank.parasoft.com/", 5000);
    loginPage = new LoginPage(page);
    username =  loginPage.generateParabankUsername();
    console.log("username::::::" + username);
    password = idpData.password;
   
  });

 

  
  test('verify the login page open successfully', async () => {
    // await page.locator(loginPage.loginPageElements.registerSuccessText).waitFor({state: "visible",timeout: 30000});

    expect((await loginPage.validateLoginPage()).pageTitle).toHaveAttribute('title', idpData.title);
    expect((await loginPage.validateLoginPage()).loginButton).toBeVisible();
    console.log("Title: ", await page.title());
  });

  test('create new user from registration page', async () => {
    await loginPage.userRegistration(username, password);
    console.log("username::::::" + username);
    // await page.waitForTimeout(5000);
    //await page.locator(loginPage.loginPageElements.registerSuccessText).isVisible({ timeout: 5000 })
    expect(await page.locator(loginPage.loginPageElements.registerSuccessText).isVisible({ timeout: 5000 })).toBeTruthy();
    expect(await page.locator(loginPage.loginPageElements.registerSuccessText1).isVisible({ timeout: 2000 })).toBeTruthy();
    console.log("value ::::"+ await page.locator(loginPage.loginPageElements.registerusernameText).textContent());
    expect(await page.locator(loginPage.loginPageElements.registerusernameText).textContent()).toContain(username);
    // expect(await page.locator(loginPage.loginPageElements.registerusernameText).containsText(username));

    await page.locator(loginPage.loginPageElements.logOutButton).click();

  });

  test('verify the login functionality', async () => {
    await loginPage.loginWithRandomCredential(username, password);
    expect(await page.locator(loginPage.loginPageElements.logOutButton).isVisible({ timeout: 2000 })).toBeTruthy();
    await page.context().storageState({ path: authFile });
  });

  // test('verify the global Nevigation Menu - Home', async () => {
  //   await page.locator(loginPage.loginPageElements.homeButton).click();
  //   await page.locator(loginPage.loginPageElements.logOutButton).waitFor({state: "visible",timeout: 30000});

  //   // await page.waitForTimeout(5000);
  //   const currentUrl = page.url();
  //   expect(currentUrl).toEqual('https://parabank.parasoft.com/parabank/index.htm');
   
  // });

  // test('verify the global Nevigation Menu - About', async () => {
  //   await page.locator(loginPage.loginPageElements.AboutButton).click();
  //   await page.locator(loginPage.loginPageElements.logOutButton).waitFor({state: "visible",timeout: 30000});
  //   const currentUrl = page.url();
  //   expect(currentUrl).toEqual('https://parabank.parasoft.com/parabank/about.htm');
   
  // });
});

// await page.context().storageState({ path: authFile });









