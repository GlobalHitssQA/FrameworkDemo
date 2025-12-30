package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ContractValueBreakdownPage;
import pages.LoginPage;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ContractValueBreakdownSteps {

    private Page page;
    private LoginPage loginPage;
    private ContractValueBreakdownPage contractValueBreakdownPage;

    public ContractValueBreakdownSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.contractValueBreakdownPage = new ContractValueBreakdownPage(page);
    }

    @Given("user is logged into Acticenter with valid credentials")
    public void userIsLoggedIntoActicenterWithValidCredentials() {
        loginPage.navigateToLoginPage();
        loginPage.login(System.getenv("ACTICENTER_USER"), System.getenv("ACTICENTER_PASSWORD"));
        assertTrue(loginPage.isLoggedIn(), "User should be logged in successfully");
    }

    @And("a contract is loaded and displayed in the contract view")
    public void aContractIsLoadedAndDisplayedInTheContractView() {
        contractValueBreakdownPage.navigateToContractView();
        assertTrue(contractValueBreakdownPage.isContractViewDisplayed(), "Contract view should be displayed");
    }

    @And("the contract value component is visible and interactive")
    public void theContractValueComponentIsVisibleAndInteractive() {
        assertTrue(contractValueBreakdownPage.isContractValueComponentVisible(), "Contract value component should be visible");
        assertTrue(contractValueBreakdownPage.isContractValueComponentInteractive(), "Contract value component should be interactive");
    }

    @When("user clicks on the contract value component")
    public void userClicksOnTheContractValueComponent() {
        contractValueBreakdownPage.clickContractValueComponent();
    }

    @Then("the breakdown popup opens displaying all applicable contract value items")
    public void theBreakdownPopupOpensDisplayingAllApplicableContractValueItems() {
        assertTrue(contractValueBreakdownPage.isBreakdownPopupVisible(), "Breakdown popup should be visible");
        assertTrue(contractValueBreakdownPage.areAllContractValueItemsDisplayed(), "All contract value items should be displayed");
    }

    @And("the breakdown list is vertically aligned with the contract value component")
    public void theBreakdownListIsVerticallyAlignedWithTheContractValueComponent() {
        assertTrue(contractValueBreakdownPage.isBreakdownListVerticallyAligned(), "Breakdown list should be vertically aligned with component");
    }

    @When("user clicks anywhere outside the contract value component and breakdown area")
    public void userClicksAnywhereOutsideTheContractValueComponentAndBreakdownArea() {
        contractValueBreakdownPage.clickOutsideBreakdownArea();
    }

    @Then("the breakdown popup closes and returns to main contract view")
    public void theBreakdownPopupClosesAndReturnsToMainContractView() {
        assertTrue(contractValueBreakdownPage.isBreakdownPopupClosed(), "Breakdown popup should be closed");
        assertTrue(contractValueBreakdownPage.isContractViewDisplayed(), "Main contract view should be displayed");
    }

    @When("user clicks on the contract value component again")
    public void userClicksOnTheContractValueComponentAgain() {
        contractValueBreakdownPage.clickContractValueComponent();
    }

    @Then("the breakdown popup opens again with all items displayed")
    public void theBreakdownPopupOpensAgainWithAllItemsDisplayed() {
        assertTrue(contractValueBreakdownPage.isBreakdownPopupVisible(), "Breakdown popup should be visible again");
        assertTrue(contractValueBreakdownPage.areAllContractValueItemsDisplayed(), "All contract value items should be displayed");
    }

    @When("user clicks on the contract value component while breakdown is open")
    public void userClicksOnTheContractValueComponentWhileBreakdownIsOpen() {
        contractValueBreakdownPage.clickContractValueComponent();
    }

    @Then("the breakdown popup toggles appropriately based on design specification")
    public void theBreakdownPopupTogglesAppropriatelyBasedOnDesignSpecification() {
        assertTrue(contractValueBreakdownPage.isBreakdownPopupToggledCorrectly(), "Breakdown popup should toggle correctly");
    }

    @When("user navigates to Casa de Bolsa contract type")
    public void userNavigatesToCasaDeBolsaContractType() {
        contractValueBreakdownPage.selectContractType("Casa de Bolsa");
    }

    @When("user navigates to Bank individual contract type")
    public void userNavigatesToBankIndividualContractType() {
        contractValueBreakdownPage.selectContractType("Bank individual");
    }

    @When("user navigates to Bank corporate contract type")
    public void userNavigatesToBankCorporateContractType() {
        contractValueBreakdownPage.selectContractType("Bank corporate");
    }

    @Then("the breakdown popup toggle functionality works correctly")
    public void theBreakdownPopupToggleFunctionalityWorksCorrectly() {
        assertTrue(contractValueBreakdownPage.isBreakdownPopupVisible(), "Breakdown popup should be visible");
        assertTrue(contractValueBreakdownPage.areAllContractValueItemsDisplayed(), "All contract value items should be displayed");
        contractValueBreakdownPage.clickOutsideBreakdownArea();
        assertTrue(contractValueBreakdownPage.isBreakdownPopupClosed(), "Breakdown popup should close when clicking outside");
    }
}