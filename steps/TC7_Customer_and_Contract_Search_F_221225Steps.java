package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.SearchPage;
import pages.CustomerPage;
import pages.ContractPage;
import static org.junit.Assert.*;

public class SearchSteps {
    private WebDriver driver;
    private SearchPage searchPage;
    private CustomerPage customerPage;
    private ContractPage contractPage;

    public SearchSteps(WebDriver driver) {
        this.driver = driver;
        this.searchPage = new SearchPage(driver);
        this.customerPage = new CustomerPage(driver);
        this.contractPage = new ContractPage(driver);
    }

    @Given("the user is authenticated in Acticenter")
    public void theUserIsAuthenticatedInActicenter() {
        // Authentication logic handled in test setup
        assertTrue("User should be authenticated", searchPage.isUserAuthenticated());
    }

    @And("the customer and contract database is accessible")
    public void theCustomerAndContractDatabaseIsAccessible() {
        assertTrue("Database should be accessible", searchPage.isDatabaseAccessible());
    }

    @Given("the user is on the Acticenter desktop view")
    public void theUserIsOnTheActicenterDesktopView() {
        searchPage.navigateToDesktopView();
    }

    @When("the user locates the magnifying glass icon in the header")
    public void theUserLocatesTheMagnifyingGlassIconInTheHeader() {
        searchPage.locateMagnifyingGlassIcon();
    }

    @Then("the magnifying glass icon should be visible")
    public void theMagnifyingGlassIconShouldBeVisible() {
        assertTrue("Magnifying glass icon should be visible", searchPage.isMagnifyingGlassIconVisible());
    }

    @When("the user clicks on the magnifying glass icon")
    public void theUserClicksOnTheMagnifyingGlassIcon() {
        searchPage.clickMagnifyingGlassIcon();
    }

    @Then("the system displays the customer general screen or BP/contract search option")
    public void theSystemDisplaysTheCustomerGeneralScreenOrBPContractSearchOption() {
        assertTrue("Search screen should be displayed", searchPage.isSearchScreenDisplayed());
    }

    @When("the user enters search criteria for a specific customer")
    public void theUserEntersSearchCriteriaForASpecificCustomer() {
        searchPage.enterSearchCriteria("TestCustomer123");
    }

    @Then("the system displays search results matching the entered criteria")
    public void theSystemDisplaysSearchResultsMatchingTheEnteredCriteria() {
        assertTrue("Search results should be displayed", searchPage.areSearchResultsDisplayed());
    }

    @When("the user selects a customer from the search results")
    public void theUserSelectsACustomerFromTheSearchResults() {
        searchPage.selectFirstCustomerFromResults();
    }

    @Then("the system displays the general screen of the selected customer")
    public void theSystemDisplaysTheGeneralScreenOfTheSelectedCustomer() {
        assertTrue("Customer general screen should be displayed", customerPage.isCustomerGeneralScreenDisplayed());
    }

    @When("the user selects the contract to view or operate")
    public void theUserSelectsTheContractToViewOrOperate() {
        customerPage.selectContract();
    }

    @Then("the system loads the selected contract")
    public void theSystemLoadsTheSelectedContract() {
        assertTrue("Contract should be loaded", contractPage.isContractLoaded());
    }

    @And("the contract value component displays updated information")
    public void theContractValueComponentDisplaysUpdatedInformation() {
        assertTrue("Contract value component should display updated information", contractPage.isContractValueComponentUpdated());
    }

    @Given("the user is on the Acticenter application")
    public void theUserIsOnTheActicenterApplication() {
        searchPage.navigateToActicenter();
    }

    @When("the user switches to responsive landscape view")
    public void theUserSwitchesToResponsiveLandscapeView() {
        searchPage.switchToResponsiveLandscape();
    }

    @Then("the magnifying glass icon should be present and functional")
    public void theMagnifyingGlassIconShouldBePresentAndFunctional() {
        assertTrue("Magnifying glass icon should be present", searchPage.isMagnifyingGlassIconVisible());
        searchPage.clickMagnifyingGlassIcon();
        assertTrue("Magnifying glass should be functional", searchPage.isSearchScreenDisplayed());
    }

    @When("the user switches to responsive portrait view")
    public void theUserSwitchesToResponsivePortraitView() {
        searchPage.switchToResponsivePortrait();
    }

    @Given("the user has searched and selected a customer")
    public void theUserHasSearchedAndSelectedACustomer() {
        searchPage.clickMagnifyingGlassIcon();
        searchPage.enterSearchCriteria("TestCustomer123");
        searchPage.selectFirstCustomerFromResults();
    }

    @When("the user selects a contract using the magnifying glass search")
    public void theUserSelectsAContractUsingTheMagnifyingGlassSearch() {
        customerPage.selectContract();
    }

    @Then("the contract value component should reflect the newly selected contract information")
    public void theContractValueComponentShouldReflectTheNewlySelectedContractInformation() {
        assertTrue("Contract value component should reflect new contract", contractPage.isContractValueComponentUpdated());
        assertNotNull("Contract value should not be null", contractPage.getContractValue());
    }
}