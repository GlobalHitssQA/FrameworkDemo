package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import io.cucumber.datatable.DataTable;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ContractSearchPage;
import pages.ContractValuePage;
import org.junit.Assert;

import java.util.List;
import java.util.Map;

public class ContractValueBreakdownSteps {

    private Page page;
    private LoginPage loginPage;
    private ContractSearchPage contractSearchPage;
    private ContractValuePage contractValuePage;

    public ContractValueBreakdownSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.contractSearchPage = new ContractSearchPage(page);
        this.contractValuePage = new ContractValuePage(page);
    }

    @Given("the user has advisor credentials and is on the Acticenter login page")
    public void theUserHasAdvisorCredentialsAndIsOnTheActicenterLoginPage() {
        loginPage.navigateToLoginPage();
        Assert.assertTrue("Login page should be displayed", loginPage.isLoginPageDisplayed());
    }

    @When("the user logs in with valid advisor credentials")
    public void theUserLogsInWithValidAdvisorCredentials() {
        String advisorUsername = System.getenv("ADVISOR_USERNAME");
        String advisorPassword = System.getenv("ADVISOR_PASSWORD");
        loginPage.login(advisorUsername, advisorPassword);
    }

    @Then("the user successfully logs in to the Acticenter platform")
    public void theUserSuccessfullyLogsInToTheActicenterPlatform() {
        Assert.assertTrue("User should be logged in and dashboard visible", loginPage.isDashboardDisplayed());
    }

    @When("the user searches for a Casa de Bolsa individual account contract")
    public void theUserSearchesForACasaDeBolsaIndividualAccountContract() {
        contractSearchPage.clickSearchButton();
        contractSearchPage.enterSearchCriteria("Casa de Bolsa");
        contractSearchPage.selectAccountType("Persona Fisica");
        contractSearchPage.executeSearch();
    }

    @And("the user selects the Persona Fisica contract from search results")
    public void theUserSelectsThePersonaFisicaContractFromSearchResults() {
        contractSearchPage.selectFirstContractFromResults();
    }

    @Then("the contract is selected and main view displays contract information")
    public void theContractIsSelectedAndMainViewDisplaysContractInformation() {
        Assert.assertTrue("Contract header should be visible", contractValuePage.isContractHeaderVisible());
        Assert.assertTrue("Contract information should be displayed", contractValuePage.isContractInfoDisplayed());
    }

    @When("the user locates the contract value component in the operations flow")
    public void theUserLocatesTheContractValueComponentInTheOperationsFlow() {
        contractValuePage.scrollToContractValueComponent();
    }

    @Then("the contract value component is visible with total contract value displayed")
    public void theContractValueComponentIsVisibleWithTotalContractValueDisplayed() {
        Assert.assertTrue("Contract value component should be visible", contractValuePage.isContractValueComponentVisible());
        Assert.assertTrue("Total contract value should be displayed", contractValuePage.isTotalValueDisplayed());
    }

    @When("the user clicks on the contract value component")
    public void theUserClicksOnTheContractValueComponent() {
        contractValuePage.clickContractValueComponent();
    }

    @Then("the breakdown popup displays with the following items:")
    public void theBreakdownPopupDisplaysWithTheFollowingItems(DataTable dataTable) {
        Assert.assertTrue("Breakdown popup should be visible", contractValuePage.isBreakdownPopupVisible());
        List<Map<String, String>> items = dataTable.asMaps(String.class, String.class);
        for (Map<String, String> item : items) {
            String itemName = item.get("item");
            Assert.assertTrue("Breakdown item '" + itemName + "' should be visible", 
                contractValuePage.isBreakdownItemVisible(itemName));
        }
    }

    @And("the Poder de compra MXN displays the currentcash value from Modulo asesor")
    public void thePoderDeCompraMXNDisplaysTheCurrentcashValueFromModuloAsesor() {
        String poderDeCompraValue = contractValuePage.getPoderDeCompraMXNValue();
        Assert.assertNotNull("Poder de compra MXN should have a value", poderDeCompraValue);
        Assert.assertTrue("Poder de compra MXN should display a valid monetary value", 
            contractValuePage.isValidMonetaryFormat(poderDeCompraValue));
    }

    @And("all breakdown items display monetary values aligned to the right")
    public void allBreakdownItemsDisplayMonetaryValuesAlignedToTheRight() {
        Assert.assertTrue("All breakdown values should be right-aligned", 
            contractValuePage.areAllValuesRightAligned());
    }

    @And("items with no value show zero amount")
    public void itemsWithNoValueShowZeroAmount() {
        Assert.assertTrue("Items with no value should show $0.00", 
            contractValuePage.doEmptyItemsShowZeroValue());
    }

    @When("the user clicks outside the breakdown component area")
    public void theUserClicksOutsideTheBreakdownComponentArea() {
        contractValuePage.clickOutsideBreakdownPopup();
    }

    @Then("the popup closes and returns to main contract view")
    public void thePopupClosesAndReturnsToMainContractView() {
        Assert.assertFalse("Breakdown popup should not be visible", contractValuePage.isBreakdownPopupVisible());
        Assert.assertTrue("Main contract view should be displayed", contractValuePage.isMainContractViewDisplayed());
    }
}