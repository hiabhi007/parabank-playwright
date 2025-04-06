import { Page, Locator } from "@playwright/test";
import { data, idpData } from "../TestData/data";
import { send } from "process";
export default class AccountsOverviewPage {

    readonly page: Page;
    static AccountOverviewPageELements: any;




    constructor(page: Page) {
        this.page = page

    }


    public accountServiceELements = {

        accountOverviewPageTitle: "//a[text()='Accounts Overview']",
        openNewAccountButton: "//a[text()='Open New Account']",
        logOutButton: "//a[text()='Log Out']",
        total_balance: "//td[b[text()='Total']]/following-sibling::td[1]/b",
        accountNumber: "//tbody//a",
        accountBalance: "//tbody//td[a]/following-sibling::td[1]",
        openNewAccountHeader: "//*[@id='openAccountForm']/h1",
        accountType: "//select[@id='type']",
        openNewAccount: "//*[@value='Open New Account']",
        accountOpenedSuccessText: "//h1[text()='Account Opened!']",
        createdAccountNumber: "//a[@id='newAccountId']",
        savingsAccountTypeDropDown: "//option[text()='SAVINGS']",
        transferFundButton: "//a[text()='Transfer Funds']",
        transferFundHeader: "//*[@id='showForm']/h1",
        transferFundAmmount: "//input[@id='amount']",
        transferFundFromAccount: "//select[@id='fromAccountId']",
        transferFundToAccount: "//select[@id='toAccountId']",
        transferButton: "//input[@value='Transfer']",
        transferCompleteText: "//*[@id='showResult']/h1[text()='Transfer Complete!']",
        transferAmmountResult: "//*[@id='amountResult']",
        transferFromAccountResult: "//*[@id='fromAccountIdResult']",
        transferToAccountResult: "//*[@id='toAccountIdResult']",
        showResults: "//*[@id='showResult']",
        billPayButton: "//a[text()='Bill Pay']",
        payeName: "//input[@name='payee.name']",
        payeAddress: "//input[@name='payee.address.street']",
        payeCity: "//input[@name='payee.address.city']",  
        payeState: "//input[@name='payee.address.state']",
        payeZip: "//input[@name='payee.address.zipCode']",
        payePhone: "//input[@name='payee.phoneNumber']",
        payeAccount: "//input[@name='payee.accountNumber']",
        payeVerifyAccount: "//input[@name='verifyAccount']",
        payeAmount: "//input[@name='amount']",
        payeFromAccount: "//select[@name='fromAccountId']",
        sendPaymentButton: "//input[@value='Send Payment']",
        billPaySuccessText: "//*[@id='billpayResult']/h1[text()='Bill Payment Complete']",
        billAmountResult: "//*[@id='amount']",
        billFromAccountResult: "//*[@id='fromAccountId']",


    }

    async selectSavingsAccountType() {
        await this.page.locator(this.accountServiceELements.openNewAccountButton).click();  
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.accountServiceELements.openNewAccountHeader).waitFor({state: "visible",timeout: 3000}); 
       await this.page.locator(this.accountServiceELements.accountType).selectOption({ label: "SAVINGS" });
       await this.page.locator(this.accountServiceELements.savingsAccountTypeDropDown).waitFor({state: "hidden",timeout: 3000}); 
       console.log("clicking in open new account button::::::::::::::::::");
        await this.page.locator(this.accountServiceELements.openNewAccount).click();
        await this.page.locator(this.accountServiceELements.accountOpenedSuccessText).waitFor({state: "visible",timeout: 3000}); 
        return {
          savingAccountNumber: await this.page.locator(this.accountServiceELements.createdAccountNumber).textContent(),
          successText: await this.page.locator(this.accountServiceELements.accountOpenedSuccessText).isVisible({ timeout: 3000 })
         
      }
  }




  async payTheBill( AccountNumber  , selectAccountNumber) {
      await this.page.locator(this.accountServiceELements.billPayButton).click();
      await this.page.locator(this.accountServiceELements.payeName).fill(data.payeName);
      await this.page.locator(this.accountServiceELements.payeAddress).fill(data.payeAddress);
      await this.page.locator(this.accountServiceELements.payeCity).fill(data.payeCity);
      await this.page.locator(this.accountServiceELements.payeState).fill(data.payeState);
      await this.page.locator(this.accountServiceELements.payeZip).fill(data.payeZip);
      await this.page.locator(this.accountServiceELements.payePhone).fill(data.payePhone);
      await this.page.locator(this.accountServiceELements.payeAccount).fill(AccountNumber);
      await this.page.locator(this.accountServiceELements.payeVerifyAccount).fill(AccountNumber);
      await this.page.locator(this.accountServiceELements.payeAmount).fill(data.payeAmount);
      await this.page.locator(this.accountServiceELements.payeFromAccount).selectOption({ label: selectAccountNumber });
      await this.page.locator(this.accountServiceELements.sendPaymentButton).click();
      await this.page.locator(this.accountServiceELements.billPaySuccessText).waitFor({state: "visible",timeout: 3000});
      await this.page.waitForTimeout(5000);
      await this.page.locator(this.accountServiceELements.billAmountResult).isVisible({ timeout: 3000 });
      return {
          successText: await this.page.locator(this.accountServiceELements.billPaySuccessText).isVisible({ timeout: 3000 }),
          billAmountResult: await this.page.locator(this.accountServiceELements.billAmountResult).textContent(),
          billFromAccountResult: await this.page.locator(this.accountServiceELements.billFromAccountResult).textContent()
     
  }
}


  async transferAccountToAccount( fromAccountNumber , ToAccountNumber ,ammount) { 
    await this.page.locator(this.accountServiceELements.transferFundButton).click();  
    await this.page.locator(this.accountServiceELements.transferFundHeader).waitFor({state: "visible",timeout: 3000}); 
    await this.page.locator(this.accountServiceELements.transferFundAmmount).fill(ammount);
    await this.page.locator(this.accountServiceELements.transferFundFromAccount).selectOption({ label: fromAccountNumber });
    await this.page.locator(this.accountServiceELements.transferFundToAccount).selectOption({ label: ToAccountNumber });
    console.log("clicking in transfer fund button::::::::::::::::::");
    await this.page.locator(this.accountServiceELements.transferButton).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.accountServiceELements.transferCompleteText).isVisible({ timeout: 3000 });
    await this.page.locator(this.accountServiceELements.transferToAccountResult).isVisible({ timeout: 5000 });
    // console.log("transferToAccountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).isVisible({ timeout: 5000 }));
    // console.log("transferToAccountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).isEnabled({ timeout: 5000 }));
    // console.log("transferToAccountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).isDisabled({ timeout: 5000 }));  
    // console.log("transferToAccountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).isHidden({ timeout: 5000 }));

    // console.log("transferAmmountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferAmmountResult).isVisible({ timeout: 5000 }));
    // console.log("transferAmmountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferAmmountResult).isEnabled({ timeout: 5000 }));
    // console.log("transferAmmountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferAmmountResult).isDisabled({ timeout: 5000 }));
    // console.log("transferAmmountResult::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferAmmountResult).isHidden({ timeout: 5000 }));
    

    
    // console.log("attached::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).waitFor({ state: 'attached' }));
    // console.log("visible::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).isVisible({ timeout: 5000 }));
    // console.log("Transfer Complete Text::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).evaluate(el => el.textContent?.trim()));
    // console.log("Transfer Complete Text::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).textContent());
    // console.log("Transfer Ammount Result::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).getAttribute('amountResult'));
    // console.log("Transfer From Account Result  innertext::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).innerHTML());
    // console.log("Transfer To Account Result  innerHTML::::::::::::::::::"+await this.page.locator(this.accountServiceELements.transferToAccountResult).textContent());
    // await this.page.locator(this.accountServiceELements.transferCompleteText).waitFor({state: "visible",timeout: 3000});
   
   // await this.page.locator(this.accountServiceELements.accountOpenedSuccessText).waitFor({state: "visible",timeout: 3000}); 
   return {
      successText: await this.page.locator(this.accountServiceELements.transferCompleteText).isVisible({ timeout: 3000 }),
      ammountResult: await this.page.locator(this.accountServiceELements.transferAmmountResult).textContent(),
      fromAccountResult: await this.page.locator(this.accountServiceELements.transferFromAccountResult).textContent(),
      toAccountResult: await this.page.locator(this.accountServiceELements.transferToAccountResult).textContent()


  }


}
 

    async waitForAccountServiceage() {
        // await this.page.waitForTimeout(3000);

        
         await this.page.locator(this.accountServiceELements.logOutButton).waitFor({state: "visible",timeout: 10000});
       
        if(await this.page.locator(this.accountServiceELements.logOutButton).count() > 0){
          console.log("inside if condition of waitForDashboardLoad")
          return true;
        }else{
          console.log("skip if condition of waitForDashboardLoad")
          return false;
        }
        
       
      }



 async IndivisualAccountBalanceCheckWithTotal() {
  let sum=0;
  const count = await this.page.locator(this.accountServiceELements.accountBalance).count();
  for (let i = 0; i < count; i++) {
    const accountBalance = await this.page.locator(this.accountServiceELements.accountBalance).nth(i).textContent();
  sum = sum+ parseFloat(accountBalance.replace(/[^0-9.]/g, ''));
  console.log("Account Balance:::::: sum::::::::::"+sum);
    // const totalBalance = await this.page.locator(this.accountServiceELements.total_balance).textContent();
   
  }
  console.log("total sum::::::::::"+sum);
  const totalBalance = await this.page.locator(this.accountServiceELements.total_balance).textContent();
  if (sum == parseFloat(totalBalance.replace(/[^0-9.]/g, ''))) {
    return true;
    
}else {
    return false;
    
  }
 }

}




 







