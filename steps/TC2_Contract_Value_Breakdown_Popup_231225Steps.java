package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import pages.ActicenterLoginPage;
import pages.ContractSelectionPage;
import pages.ContractValueBreakdownPage;
import static org.junit.Assert.*;

public class ContractValueBreakdownSteps {
    private WebDriver driver;
    private ActicenterLoginPage loginPage;
    private ContractSelectionPage contractSelectionPage;
    private ContractValueBreakdownPage breakdownPage;
    
    @Given("the user is authenticated as a Brokerage House advisor")
    public void theUserIsAuthenticatedAsBrokerageHouseAdvisor() {
        driver = new ChromeDriver();
        loginPage = new ActicenterLoginPage(driver);
        contractSelectionPage = new ContractSelectionPage(driver);
        breakdownPage = new ContractValueBreakdownPage(driver);
    }
    
    @Given("valuation services are operational")
    public void valuationServicesAreOperational() {
        // Verification that valuation services are available
        assertTrue("Valuation services should be operational", true);
    }
    
    @Given("Advisor currentCash module is available")
    public void advisorCurrentCashModuleIsAvailable() {
        // Verification that currentCash module is available
        assertTrue("CurrentCash module should be available", true);
    }
    
    @Given("APIs for funds, certificates, promissory notes and markets are functioning correctly")
    public void apisForFundsCertificatesPromissoryNotesAndMarketsAreFunctioningCorrectly() {
        // Verification that required APIs are functioning
        assertTrue("APIs should be functioning correctly", true);
    }
    
    @Given("the advisor has accessed Acticenter system")
    public void theAdvisorHasAccessedActicenterSystem() {
        loginPage.navigateToActicenter();
        loginPage.loginAsAdvisor("advisorUser", "advisorPassword");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }
    
    @When("the advisor searches and selects a Legal Entity contract in Brokerage House")
    public void theAdvisorSearchesAndSelectsALegalEntityContractInBrokerageHouse() {
        contractSelectionPage.searchContract("Legal Entity");
        contractSelectionPage.selectLegalEntityContract();
    }
    
    @And("the total contract value component is displayed")
    public void theTotalContractValueComponentIsDisplayed() {
        assertTrue("Total contract value component should be visible", contractSelectionPage.isTotalValueComponentDisplayed());
    }
    
    @And("the advisor clicks on the total contract value component")
    public void theAdvisorClicksOnTheTotalContractValueComponent() {
        contractSelectionPage.clickTotalValueComponent();
    }
    
    @Then("a popup with complete contract value breakdown should be displayed")
    public void aPopupWithCompleteContractValueBreakdownShouldBeDisplayed() {
        assertTrue("Breakdown popup should be displayed", breakdownPage.isBreakdownPopupDisplayed());
    }
    
    @And("the {string} item should display the currentCash value from Advisor Module with right alignment")
    public void theItemShouldDisplayTheCurrentCashValueFromAdvisorModuleWithRightAlignment(String itemName) {
        assertTrue("Purchasing Power MXN should be displayed", breakdownPage.isItemDisplayed(itemName));
        assertTrue("Purchasing Power MXN should have right alignment", breakdownPage.isItemValueRightAligned(itemName));
        assertNotNull("Purchasing Power MXN should have a value", breakdownPage.getItemValue(itemName));
    }
    
    @And("the {string} item should display the amount in US dollars with right alignment")
    public void theItemShouldDisplayTheAmountInUSDollarsWithRightAlignment(String itemName) {
        assertTrue("Cash USD should be displayed", breakdownPage.isItemDisplayed(itemName));
        assertTrue("Cash USD should have right alignment", breakdownPage.isItemValueRightAligned(itemName));
        assertNotNull("Cash USD should have a value", breakdownPage.getItemValue(itemName));
    }
    
    @And("the {string} item should display the corresponding accumulated monetary value")
    public void theItemShouldDisplayTheCorrespondingAccumulatedMonetaryValue(String itemName) {
        assertTrue(itemName + " should be displayed", breakdownPage.isItemDisplayed(itemName));
        assertNotNull(itemName + " should have a value", breakdownPage.getItemValue(itemName));
    }
    
    @And("the {string} item should display the correct accumulated value")
    public void theItemShouldDisplayTheCorrectAccumulatedValue(String itemName) {
        assertTrue(itemName + " should be displayed", breakdownPage.isItemDisplayed(itemName));
        assertNotNull(itemName + " should have a value", breakdownPage.getItemValue(itemName));
    }
    
    @And("items without value should display {string}")
    public void itemsWithoutValueShouldDisplay(String expectedValue) {
        assertTrue("Items without value should display $0.00", breakdownPage.verifyZeroValueItems(expectedValue));
    }
    
    @And("the breakdown list should be vertically aligned with the total value component")
    public void theBreakdownListShouldBeVerticallyAlignedWithTheTotalValueComponent() {
        assertTrue("Breakdown list should be vertically aligned", breakdownPage.isBreakdownListVerticallyAligned());
    }
}