const { expect, browser, test } = require('@playwright/test');
import { Page } from "@playwright/test";
import LoginPage from "../../Pages/LoginPage";
import { idpData } from "../../TestData/data";

const authFile = 'user.json';
let page, newContext, page1, newContext1;
let loginPage: LoginPage;
const authTest2 = 'user.json';



test.describe.serial('use the same page', () => {

  
    test.beforeAll(async ({ browser }) => {
     newContext = await browser.newContext({storageState: "./user.json"});
    //   newContext1 = await browser.newContext();
      page = await newContext.newPage();
      await page.goto("https://parabank.parasoft.com/", 5000);
      loginPage = new LoginPage(page);
    
     
    });


    test('verify the global Nevigation Menu - Home', async () => {
        await page.locator(loginPage.loginPageElements.homeButton).click();
        await page.locator(loginPage.loginPageElements.logOutButton).waitFor({state: "visible",timeout: 30000});
    
        // await page.waitForTimeout(5000);
        const currentUrl = page.url();
        expect(currentUrl).toEqual('https://parabank.parasoft.com/parabank/index.htm');
       
      });
    
      test('verify the global Nevigation Menu - About', async () => {
        await page.locator(loginPage.loginPageElements.AboutButton).click();
        await page.locator(loginPage.loginPageElements.logOutButton).waitFor({state: "visible",timeout: 30000});
        const currentUrl = page.url();
        expect(currentUrl).toEqual('https://parabank.parasoft.com/parabank/about.htm');
       
      });


});

