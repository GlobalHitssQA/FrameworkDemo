package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ContractCompositionPage;
import static org.junit.Assert.*;

public class USDCashVerificationSteps {
    private WebDriver driver;
    private ContractCompositionPage compositionPage;
    
    public USDCashVerificationSteps(WebDriver driver) {
        this.driver = driver;
        this.compositionPage = new ContractCompositionPage(driver);
    }
    
    @Given("the system has brokerage house contracts with USD balances")
    public void systemHasBrokerageContractsWithUSD() {
        // Precondition verification - can be implemented based on API or DB validation
    }
    
    @And("the system has corporate bank contracts with and without related Mexdolar accounts")
    public void systemHasBankContractsWithMexdolar() {
        // Precondition verification
    }
    
    @And("SAP integration is available for Mexdolar balance retrieval")
    public void sapIntegrationIsAvailable() {
        // Verify SAP integration status
    }
    
    @Given("I have selected a brokerage house contract")
    public void selectBrokerageHouseContract() {
        compositionPage.selectContractByType("BROKERAGE_HOUSE");
    }
    
    @Given("I have selected a corporate bank contract with related Mexdolar account")
    public void selectBankContractWithMexdolar() {
        compositionPage.selectContractByType("BANK_CORPORATE_WITH_MEXDOLAR");
    }
    
    @Given("I have selected a bank contract without Mexdolar account")
    public void selectBankContractWithoutMexdolar() {
        compositionPage.selectContractByType("BANK_WITHOUT_MEXDOLAR");
    }
    
    @Given("I have selected a contract with no USD balance")
    public void selectContractWithNoUSDBalance() {
        compositionPage.selectContractByType("ZERO_USD_BALANCE");
    }
    
    @When("I expand the composition breakdown")
    public void expandCompositionBreakdown() {
        compositionPage.expandBreakdown();
    }
    
    @Then("the pop-up shows the breakdown with all applicable items for brokerage house contract")
    public void verifyBreakdownPopupForBrokerage() {
        assertTrue("Breakdown popup should be displayed", compositionPage.isBreakdownPopupDisplayed());
        assertTrue("Brokerage items should be present", compositionPage.hasBrokerageItems());
    }
    
    @And("the USD Cash item is present")
    public void verifyUSDCashItemPresent() {
        assertTrue("USD Cash item should be present", compositionPage.isUSDCashItemPresent());
    }
    
    @And("the USD Cash item displays the contract amount in US dollars without conversion")
    public void verifyUSDAmountWithoutConversion() {
        String usdAmount = compositionPage.getUSDCashAmount();
        assertTrue("USD amount should be displayed", usdAmount.startsWith("USD"));
        assertFalse("Should not contain MXN conversion", usdAmount.contains("MXN"));
    }
    
    @And("the USD Cash item displays the Mexdolar account balance from SAP")
    public void verifyMexdolarBalanceFromSAP() {
        String usdAmount = compositionPage.getUSDCashAmount();
        assertTrue("Mexdolar balance should be from SAP", compositionPage.isMexdolarBalanceFromSAP());
    }
    
    @And("the USD balance is shown without exchange rate conversion to MXN")
    public void verifyNoExchangeRateConversion() {
        String usdAmount = compositionPage.getUSDCashAmount();
        assertFalse("Should not show MXN conversion", compositionPage.hasExchangeRateConversion());
    }
    
    @Then("the USD Cash item is not present in the breakdown")
    public void verifyUSDCashItemNotPresent() {
        assertFalse("USD Cash item should not be present", compositionPage.isUSDCashItemPresent());
    }
    
    @Then("the USD Cash item displays \"USD $0.00\"")
    public void verifyUSDCashDisplaysZero() {
        String usdAmount = compositionPage.getUSDCashAmount();
        assertTrue("USD Cash should display zero", usdAmount.contains("USD $0.00") || usdAmount.contains("USD 0.00"));
    }
}