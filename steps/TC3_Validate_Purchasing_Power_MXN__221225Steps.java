package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import pages.ContractSelectionPage;
import pages.ContractBreakdownPage;
import pages.AdvisorModulePage;
import static org.junit.Assert.*;

public class PurchasingPowerSteps {
    private WebDriver driver;
    private LoginPage loginPage;
    private ContractSelectionPage contractSelectionPage;
    private ContractBreakdownPage contractBreakdownPage;
    private AdvisorModulePage advisorModulePage;
    private String currentCashValue;

    public PurchasingPowerSteps(WebDriver driver) {
        this.driver = driver;
        this.loginPage = new LoginPage(driver);
        this.contractSelectionPage = new ContractSelectionPage(driver);
        this.contractBreakdownPage = new ContractBreakdownPage(driver);
        this.advisorModulePage = new AdvisorModulePage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        loginPage.navigateToActicenter();
        loginPage.performLogin();
    }

    @And("the user has access to Casa de Bolsa contracts")
    public void theUserHasAccessToCasaDeBolsaContracts() {
        assertTrue(contractSelectionPage.hasCasaDeBolsaContracts());
    }

    @Given("the user selects a Casa de Bolsa contract for an individual")
    public void theUserSelectsACasaDeBolsaContractForAnIndividual() {
        contractSelectionPage.selectCasaDeBolsaIndividualContract();
        currentCashValue = advisorModulePage.getCurrentCashValue();
    }

    @Given("the user selects a Casa de Bolsa contract for a corporation")
    public void theUserSelectsACasaDeBolsaContractForACorporation() {
        contractSelectionPage.selectCasaDeBolsaCorporateContract();
        currentCashValue = advisorModulePage.getCurrentCashValue();
    }

    @Given("the user selects a Bank contract")
    public void theUserSelectsABankContract() {
        contractSelectionPage.selectBankContract();
    }

    @When("the user clicks on the contract value component")
    public void theUserClicksOnTheContractValueComponent() {
        contractBreakdownPage.clickContractValueComponent();
    }

    @Then("the system displays the breakdown popup")
    public void theSystemDisplaysTheBreakdownPopup() {
        assertTrue(contractBreakdownPage.isBreakdownPopupDisplayed());
    }

    @And("the Purchasing Power MXN item is present in the breakdown")
    public void thePurchasingPowerMXNItemIsPresentInTheBreakdown() {
        assertTrue(contractBreakdownPage.isPurchasingPowerMXNPresent());
    }

    @And("the Purchasing Power MXN value matches the currentCash from advisor module")
    public void thePurchasingPowerMXNValueMatchesTheCurrentCashFromAdvisorModule() {
        String displayedValue = contractBreakdownPage.getPurchasingPowerMXNValue();
        assertEquals(currentCashValue, displayedValue);
    }

    @And("the Purchasing Power MXN item is not present in the breakdown")
    public void thePurchasingPowerMXNItemIsNotPresentInTheBreakdown() {
        assertFalse(contractBreakdownPage.isPurchasingPowerMXNPresent());
    }
}