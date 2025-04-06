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


}

