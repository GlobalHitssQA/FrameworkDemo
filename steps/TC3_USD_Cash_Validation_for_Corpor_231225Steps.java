package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import pages.ContractSearchPage;
import pages.ValuationBreakdownPage;
import static org.junit.Assert.*;

public class USDCashValidationSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private ContractSearchPage contractSearchPage;
    private ValuationBreakdownPage valuationBreakdownPage;
    private String mexdolarBalance;

    public USDCashValidationSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new LoginPage(driver);
        this.contractSearchPage = new ContractSearchPage(driver);
        this.valuationBreakdownPage = new ValuationBreakdownPage(driver);
    }

    @Given("the advisor is authenticated in Acticenter")
    public void theAdvisorIsAuthenticatedInActicenter() {
        loginPage.navigateToActicenter();
        loginPage.loginAsAdvisor();
        assertTrue("Login failed", loginPage.isLoginSuccessful());
    }

    @Given("SAP Pasivos service is operational")
    public void sapPasivosServiceIsOperational() {
        // Validation that SAP service is available
        assertTrue("SAP Pasivos service not available", contractSearchPage.verifySAPServiceStatus());
    }

    @Given("a Corporate Bank contract with an associated Mexdolar account exists")
    public void aCorporateBankContractWithAssociatedMexdolarAccountExists() {
        assertTrue("No contracts with Mexdolar found", contractSearchPage.verifyContractWithMexdolarExists());
    }

    @Given("a Corporate Bank contract without Mexdolar account exists")
    public void aCorporateBankContractWithoutMexdolarAccountExists() {
        assertTrue("No contracts without Mexdolar found", contractSearchPage.verifyContractWithoutMexdolarExists());
    }

    @When("the advisor searches and selects the contract with Mexdolar account")
    public void theAdvisorSearchesAndSelectsTheContractWithMexdolarAccount() {
        contractSearchPage.searchContractWithMexdolar();
        contractSearchPage.selectFirstContract();
        mexdolarBalance = contractSearchPage.getMexdolarBalanceFromSAP();
        assertTrue("Contract not loaded", contractSearchPage.isContractLoaded());
    }

    @When("the advisor searches and selects the contract without Mexdolar account")
    public void theAdvisorSearchesAndSelectsTheContractWithoutMexdolarAccount() {
        contractSearchPage.searchContractWithoutMexdolar();
        contractSearchPage.selectFirstContract();
        assertTrue("Contract not loaded", contractSearchPage.isContractLoaded());
    }

    @When("the advisor clicks on the total valuation component")
    public void theAdvisorClicksOnTheTotalValuationComponent() {
        valuationBreakdownPage.clickTotalValuationComponent();
    }

    @When("the advisor clicks on the total valuation component to open breakdown")
    public void theAdvisorClicksOnTheTotalValuationComponentToOpenBreakdown() {
        valuationBreakdownPage.clickTotalValuationComponent();
    }

    @Then("the valuation breakdown popup is displayed")
    public void theValuationBreakdownPopupIsDisplayed() {
        assertTrue("Valuation breakdown popup not displayed", valuationBreakdownPage.isBreakdownPopupVisible());
    }

    @And("the USD Cash field is visible in the breakdown")
    public void theUSDCashFieldIsVisibleInTheBreakdown() {
        assertTrue("USD Cash field not visible", valuationBreakdownPage.isUSDCashFieldVisible());
    }

    @And("the USD Cash amount matches the Mexdolar account balance from SAP")
    public void theUSDCashAmountMatchesTheMexdolarAccountBalanceFromSAP() {
        String displayedUSDCash = valuationBreakdownPage.getUSDCashAmount();
        assertEquals("USD Cash amount does not match Mexdolar balance", mexdolarBalance, displayedUSDCash);
    }

    @And("the USD Cash amount is displayed without currency conversion")
    public void theUSDCashAmountIsDisplayedWithoutCurrencyConversion() {
        assertTrue("USD Cash shows conversion", valuationBreakdownPage.verifyUSDCashNoCurrencyConversion(mexdolarBalance));
    }

    @And("the USD Cash field is not present in the breakdown")
    public void theUSDCashFieldIsNotPresentInTheBreakdown() {
        assertFalse("USD Cash field should not be visible", valuationBreakdownPage.isUSDCashFieldVisible());
    }
}