import { Page, Locator } from "@playwright/test";
import { data, idpData } from "../TestData/data";
export default class LoginPage {

    readonly page: Page;




    constructor(page: Page) {
        this.page = page

    }


    public loginPageElements = {
       //paraBankHyperText: "//*[@title='ParaBank']",
        paraBankHyperText: "//*[@id='topPanel']//img[@class='logo']",
        userName: "//input[@name='username']",
        loginButton: "//input[@value='Log In']",
        usernameButton: "//input[@name='username']",
        passwordButton: "//input[@name='password']",
        logOutButton: "//a[text()='Log Out']",
        homeButton: "//a[text()='Home']",
        firstName: "//input[@name='customer.firstName']",
        lastName: "//input[@name='customer.lastName']",
        address: "//input[@name='customer.address.street']",
        city: "//input[@name='customer.address.city']",
        state: "//input[@name='customer.address.state']",       
        zip: "//input[@name='customer.address.zipCode']",
        ssn: "//input[@name='customer.ssn']",
        username: "//input[@name='customer.username']",
        password: "//input[@name='customer.password']",
        confirmPassword: "//input[@name='repeatedPassword']",
        registerationButton: "//a[text()='Register']",
        registerButton: "//input[@value='Register']",
        registerusernameText: "//*[@id='rightPanel']",
        registerSuccessText: "//h1[contains(text(), 'Welcome')]",
        registerSuccessText1: "//p[text()='Your account was created successfully. You are now logged in.']",
        AboutButton: "//*[@id='footerPanel']//a[text()='About Us']",


    }


    async userRegistration(username: string, password: string) {  
        await this.page.locator(this.loginPageElements.registerationButton).click();
        await this.page.locator(this.loginPageElements.firstName).fill(data.firstName);
        await this.page.locator(this.loginPageElements.lastName).fill(data.lastName);
        await this.page.locator(this.loginPageElements.address).fill(data.address);
        await this.page.locator(this.loginPageElements.city).fill(data.city);
        await this.page.locator(this.loginPageElements.state).fill(data.state);
        await this.page.locator(this.loginPageElements.zip).fill(data.zip);
        await this.page.locator(this.loginPageElements.ssn).fill(data.ssn);
        await this.page.locator(this.loginPageElements.username).fill(username);
        await this.page.locator(this.loginPageElements.password).fill(password);
        await this.page.locator(this.loginPageElements.confirmPassword).fill(password);
        await this.page.locator(this.loginPageElements.registerButton).click();



    }

async validateLoginPage() {
    await  this.page.locator(this.loginPageElements.loginButton).waitFor({state: "visible",timeout: 5000});
    const boolean = await this.page.locator(this.loginPageElements.paraBankHyperText).isVisible();
    console.log("boolean:::" + boolean);
    if (boolean) {
        
        return {
            pageTitle: await this.page.locator(this.loginPageElements.paraBankHyperText),
            loginButton: await this.page.locator(this.loginPageElements.loginButton),
        }
    }
    else {
        console.log("not present:::::");
    }
}



public generateParabankUsername(): string {
    const randomDigits = Math.floor(Math.random() * 100) // Generates number from 0–99
      .toString()
      .padStart(3, '0'); // Ensures two digits, e.g., "07" instead of "7"
    return `parabank-${randomDigits}`;
  }


  async loginWithRandomCredential(randomUsername , password) {
    //const randomUsername = this.generateParabankUsername();
    console.log("Random username::::::::::::::: ", randomUsername);
    await this.page.locator(this.loginPageElements.usernameButton).fill(randomUsername);
    await this.page.locator(this.loginPageElements.passwordButton).fill(password);
    await this.page.locator(this.loginPageElements.loginButton).click();
    await this.page.waitForTimeout(2000);
    const boolean = await this.page.locator(this.loginPageElements.logOutButton).isVisible();
    console.log("boolean:::" + boolean);
    return boolean;

  }




  async waitForRegisteredSuccessMessage() {
    // await this.page.waitForTimeout(3000);

    
     await this.page.locator(this.loginPageElements.registerSuccessText).waitFor({state: "visible",timeout: 10000});
   
    if(await this.page.locator(this.loginPageElements.logOutButton).count() > 0){
      console.log("inside if condition of waitForDashboardLoad")
      return true;
    }else{
      console.log("skip if condition of waitForDashboardLoad")
      return false;
    }
    
   
  }


//   async registerAndLogin( password) {
//     const randomUsername = this.generateParabankUsername();
//     await this.userRegistration(randomUsername , password);
//     console.log("Random username::::::::::::::: ", randomUsername);
//     await this.page.locator(this.loginPageElements.usernameButton).fill(randomUsername);
//     await this.page.locator(this.loginPageElements.passwordButton).fill(password);
//     await this.page.locator(this.loginPageElements.loginButton).click();
//     await this.page.waitForTimeout(2000);
//     const boolean = await this.page.locator(this.loginPageElements.logOutButton).isVisible();
//     console.log("boolean:::" + boolean);
//     return boolean;

//   }





    async validLogin(userame, password) {
        await this.page.locator(this.loginPageElements._idpUserName).fill(userame);
        await this.page.locator(this.loginPageElements._idpPassword).fill(password);


        await this.page.locator(this.loginPageElements.logintext).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.loginPageElements.loginId).click();
        await this.page.waitForTimeout(7000);
        //await this.page.locator(this.loginPageElements.page.waitForLoadState('networkidle');
        const boolean = await this.page.locator(this.loginPageElements._goToInvoicePage).isVisible();
        console.log("boolean:::" + boolean);

    }

    async hardlogout() {

        await this.page.locator(this.loginPageElements.usepanelExpand).click();
        await this.page.locator(this.loginPageElements.logoutButton).waitFor({ state: "visible" });
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.loginPageElements.logoutButton).click();
        await this.page.locator(this.loginPageElements._logoutRedirect).waitFor({ state: "visible" });
        await this.page.locator(this.loginPageElements._logoutRedirect).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.loginPageElements._logoutSignBtn).waitFor({ state: "visible" });
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.loginPageElements._logoutSignBtn).click();



    }

    async goViewInvoicePage() {

        await this.page.locator(this.loginPageElements._goToInvoicePage).click();
        await this.page.waitForTimeout(4000);

    }



    async mouseHover() {
        await this.page.locator(this.loginPageElements.loginId).hover();
    }

    async invoiceClick(invoicename) {
        // const xpath1 = "//igx-expandable-grid-cell[@title='";
        // const xpath2 = "']";
        // const newXpath = xpath1 + invoicename + xpath2;
        // console.log("neXpath::::" + newXpath);
        // const boolean = await this.page.locator(newXpath).isVisible();
        // console.log("boolean:::" + boolean);
        // await this.page.locator(newXpath).click();

        const xpath1 ="//*[@title='";
        const xpath2 = "']/ancestor::igx-grid-row/following::div[1]//*[text()='Invoice Journey']";
        const newXpath = xpath1 + invoicename + xpath2;
        console.log("neXpath::::" + newXpath);   // this xpath actully verify one level up that TEST1/TET2 invoice open or not.
        const count = await this.page.locator(this.loginPageElements._invoices_number_coloum).count();
        console.log("count::::" + count);
        for (let i = 0; i < count; i++) {
            const output = await this.page.locator(this.loginPageElements._invoices_number_coloum).nth(i).textContent();
       
        console.log(output+" :::::: approve and reject::"+i);
       
        if(output==invoicename){
          console.log("enter the if condition"+output);
      
      await this.page.locator(this.loginPageElements._invoices_number_coloum).nth(i).click({ force: true });
     
      
    
     
       //   await list.click();
       await this.page.waitForTimeout(2000);
       if( await this.page.locator(newXpath).isVisible())  //  **second level check 
          break;
        
          
        }
      }


    }


    async invoiceClickMob(invoicename) {
        // const xpath1 = "//igx-expandable-grid-cell[@title='";
        // const xpath2 = "']";
        // const newXpath = xpath1 + invoicename + xpath2;
        // console.log("neXpath::::" + newXpath);
        // const boolean = await this.page.locator(newXpath).isVisible();
        // console.log("boolean:::" + boolean);
        // await this.page.locator(newXpath).click();

        const xpath1 ="//*[@titl//*[@class='invoice-title']/..//div[text()='";
        const xpath2 = "']";
        const newXpath = xpath1 + invoicename + xpath2;
        console.log("neXpath::::" + newXpath);   // this xpath actully verify one level up that TEST1/TET2 invoice open or not.
        const count = await this.page.locator(this.loginPageElements._invoices_number_coloum).count();
        console.log("count::::" + count);
        for (let i = 0; i < count; i++) {
            const output = await this.page.locator(this.loginPageElements._invoices_number_coloum).nth(i).textContent();
       
        console.log(output+" :::::: approve and reject::"+i);
       
        if(output==invoicename){
          console.log("enter the if condition"+output);
      
      await this.page.locator(this.loginPageElements._invoices_number_coloum).nth(i).click({ force: true });
     
      
    
     
       //   await list.click();
       await this.page.waitForTimeout(2000);
       if( await this.page.locator(newXpath).isVisible())  //  **second level check 
          break;
        
          
        }
      }


    }

    // const count = await this.page.locator(options).count();
    // for (let i = 0; i < count; i++) {
    //   const text = await this.page.locator(options).nth(i).textContent();
    //   if (text.includes(textContains)) {
    //     await this.page.locator(options).nth(i).click();

    //     const invoiceQueueList = await this.page.locator(this.loginPageElements._invoices_number_coloum).allTextContents();

        async selectAnInvoicebByPropNewCode(headerValue: any) {
            //div[text()='Test2
            const xpath1 ="//*[@title='";
            const xpath2 = "']/ancestor::igx-grid-row/following::div[1]//*[text()='Invoice Journey']";
            const newXpath = xpath1 + headerValue + xpath2;
            console.log("neXpath::::" + newXpath);
            const count = await this.page.locator(this.loginPageElements._invoices_number_coloum).count();
            console.log("count::::" + count);
            for (let i = 0; i < count; i++) {
                const output = await this.page.locator(this.loginPageElements._invoices_number_coloum).nth(i).textContent();
           
            console.log(output+" :::::: approve and reject::"+i);
           
            if(output==headerValue){
              console.log("enter the if condition"+output);
             //  await browser.actions().mouseMove(list.getWebElement()).perform();
               
          // await browser.actions().click().perform();
          await this.page.locator(this.loginPageElements._invoices_number_coloum).nth(i).click({ force: true });
         
          
          //await WaitUtil.waitUntilElementInVisible(this._invoiceApproveButton1, 40000);
         
           //   await list.click();
           await this.page.waitForTimeout(2000);
           if( await this.page.locator(newXpath).isVisible())
              break;
              //await WaitUtil.waitUntilElementInVisible(this._matSpinner, 20000);
              
            }
          }
        }

    // async ispresent(element){

    // }

    async invoiceSelectCheck() {
        const boolean = await this.page.locator(this.loginPageElements._selectApproveButton).isVisible();
        console.log("boolean:::" + boolean);
        if (boolean) {
            console.log("present::::::::");
            const text = await this.page.locator(this.loginPageElements._selectApproveButton).textContent();
            return text;
        }
        else {
            console.log("not present:::::");
        }

    }
    async clickApprovedButton() {
        await this.page.locator(this.loginPageElements._selectApproveButton).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(this.loginPageElements._selectApproveButtonFromPopUP).click();
        await this.page.locator(this.loginPageElements._approvedToastMessage).waitFor({ state: "visible" });

    }

    async clickRejectdButton() {
        await this.page.locator(this.loginPageElements.selectRejectButton).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(this.loginPageElements._selectRejectButtonFromPopUp).click();
        await this.page.locator(this.loginPageElements._RjectToastMessage).waitFor({ state: "visible" });
        console.log("_RjectToastMessage  visble boolean:::" + await this.page.locator(this.loginPageElements._RjectToastMessage).waitFor({ state: "visible" }));

    }

    async approveTostMessageCheck() {
        const text = await this.page.locator(this.loginPageElements._approvedToastMessage).textContent();
        console.log("approveTostMessageCheck ::::::" + text);
        return text;
    }

    async rejectTostMessageCheck() {
        const text = await this.page.locator(this.loginPageElements._RjectToastMessage).textContent();
        console.log("_RjectToastMessage ::::::" + text);
        return text;
    }

    async clickapprovebuttonandgetapprovemessage(){
        await this.page.locator(this.loginPageElements._selectApproveButton).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(this.loginPageElements._selectApproveButtonFromPopUP).click();
        await this.page.locator(this.loginPageElements._approvedToastMessage).waitFor({ state: "visible" });
        const text = await this.page.locator(this.loginPageElements._approvedToastMessage).textContent();
        console.log("approveTostMessageCheck ::::::" + text);
        return text;

    }



}

