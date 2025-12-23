package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.ActicenterLoginPage;
import pages.AdvisorModulePage;
import pages.ContractBreakdownPage;
import static org.junit.Assert.*;

public class PurchasingPowerMXNSteps {
    private WebDriver driver;
    private ActicenterLoginPage loginPage;
    private AdvisorModulePage advisorPage;
    private ContractBreakdownPage breakdownPage;
    private String currentCashValue;

    public PurchasingPowerMXNSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new ActicenterLoginPage(driver);
        this.advisorPage = new AdvisorModulePage(driver);
        this.breakdownPage = new ContractBreakdownPage(driver);
    }

    @Given("the advisor user is authenticated in Acticenter with wealth management profile")
    public void theAdvisorUserIsAuthenticatedInActicenter() {
        loginPage.navigateToActicenter();
        loginPage.loginAsAdvisor();
        assertTrue("Login was not successful", loginPage.isLoginSuccessful());
    }

    @And("a Brokerage House contract is available with balance in currentCash")
    public void aBrokerageHouseContractIsAvailableWithBalance() {
        assertTrue("No Brokerage House contract available", advisorPage.hasBrokerageHouseContract());
    }

    @And("the Advisor module is correctly displaying the currentCash value")
    public void theAdvisorModuleIsCorrectlyDisplayingCurrentCash() {
        assertTrue("CurrentCash value is not displayed", advisorPage.isCurrentCashDisplayed());
    }

    @And("integration with Acticenter services is working")
    public void integrationWithActicenterServicesIsWorking() {
        assertTrue("Acticenter services integration failed", advisorPage.isActicenterIntegrationActive());
    }

    @When("the user selects a Brokerage House contract from the Advisor module")
    public void theUserSelectsBrokerageHouseContract() {
        advisorPage.selectBrokerageHouseContract();
    }

    @Then("the Brokerage House contract loads correctly in Acticenter")
    public void theBrokerageHouseContractLoadsCorrectly() {
        assertTrue("Contract did not load correctly", advisorPage.isContractLoaded());
    }

    @When("the user verifies the currentCash value displayed in the Advisor module for the selected contract")
    public void theUserVerifiesCurrentCashValue() {
        currentCashValue = advisorPage.getCurrentCashValue();
        assertNotNull("CurrentCash value is null", currentCashValue);
    }

    @Then("the Advisor module shows the currentCash value correctly")
    public void theAdvisorModuleShowsCurrentCashCorrectly() {
        assertTrue("CurrentCash value is not valid", advisorPage.isCurrentCashValueValid(currentCashValue));
    }

    @When("the user clicks on the total valuation component of the contract to open the breakdown")
    public void theUserClicksOnTotalValuationComponent() {
        advisorPage.clickTotalValuationComponent();
    }

    @Then("a pop-up with detailed contract value breakdown is displayed")
    public void aPopupWithDetailedBreakdownIsDisplayed() {
        assertTrue("Breakdown popup is not displayed", breakdownPage.isBreakdownPopupDisplayed());
    }

    @When("the user locates the Purchasing Power MXN item in the breakdown")
    public void theUserLocatesPurchasingPowerMXNItem() {
        breakdownPage.scrollToPurchasingPowerMXN();
    }

    @Then("the Purchasing Power MXN item appears in the breakdown list")
    public void thePurchasingPowerMXNItemAppears() {
        assertTrue("Purchasing Power MXN item not found", breakdownPage.isPurchasingPowerMXNDisplayed());
    }

    @And("the value shown in Purchasing Power MXN exactly matches the currentCash value from the Advisor module")
    public void theValueMatchesCurrentCash() {
        String purchasingPowerValue = breakdownPage.getPurchasingPowerMXNValue();
        assertEquals("Purchasing Power MXN does not match currentCash", currentCashValue, purchasingPowerValue);
    }

    @And("the monetary value is displayed on the right side of the item name")
    public void theMonetaryValueIsDisplayedOnRightSide() {
        assertTrue("Value is not aligned to the right", breakdownPage.isPurchasingPowerValueRightAligned());
    }

    @When("the user verifies this item only appears for Brokerage House contracts and not for Bank contracts")
    public void theUserVerifiesItemOnlyForBrokerageHouse() {
        breakdownPage.closeBreakdownPopup();
        advisorPage.selectBankContract();
        advisorPage.clickTotalValuationComponent();
    }

    @Then("the Purchasing Power MXN item is exclusive to Brokerage House contracts and does not appear in Bank type contracts")
    public void theItemIsExclusiveToBrokerageHouse() {
        assertFalse("Purchasing Power MXN should not appear for Bank contracts", breakdownPage.isPurchasingPowerMXNDisplayed());
    }
}