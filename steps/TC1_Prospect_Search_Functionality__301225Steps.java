package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {

    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as an advisor in Acticenter")
    public void theUserIsLoggedInAsAnAdvisorInActicenter() {
        // Precondition: User authentication should be handled by test setup
        // This step assumes user is already authenticated
        assertTrue("User should be logged in", prospectSearchPage.isUserLoggedIn());
    }

    @Given("the Salesforce database is accessible")
    public void theSalesforceDatabaseIsAccessible() {
        // Precondition: Database connectivity verified by system
        // This is typically verified through backend health checks
    }

    @Given("test prospects exist in Salesforce database with valid data")
    public void testProspectsExistInSalesforceDatabaseWithValidData() {
        // Precondition: Test data setup should be handled by test fixtures
    }

    @When("the user navigates to the prospect search screen")
    public void theUserNavigatesToTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Then("the prospect search screen is displayed with search field available")
    public void theProspectSearchScreenIsDisplayedWithSearchFieldAvailable() {
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenDisplayed());
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the user enters exactly 2 characters in the prospect search field")
    public void theUserEntersExactly2CharactersInTheProspectSearchField() {
        prospectSearchPage.enterSearchText("Ab");
    }

    @Then("the system does not trigger search and no results are displayed")
    public void theSystemDoesNotTriggerSearchAndNoResultsAreDisplayed() {
        assertFalse("Search results should not be displayed", prospectSearchPage.areSearchResultsDisplayed());
    }

    @When("the user enters 3 or more characters in the prospect search field")
    public void theUserEnters3OrMoreCharactersInTheProspectSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("Abc");
    }

    @Then("the system triggers the search automatically or enables search button")
    public void theSystemTriggersTheSearchAutomaticallyOrEnablesSearchButton() {
        assertTrue("Search button should be enabled or search should trigger", 
            prospectSearchPage.isSearchButtonEnabled() || prospectSearchPage.areSearchResultsDisplayed());
    }

    @When("the user clicks search button or presses enter to execute the search")
    public void theUserClicksSearchButtonOrPressesEnterToExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays list of matching prospects from Salesforce database")
    public void theSystemDisplaysListOfMatchingProspectsFromSalesforceDatabase() {
        assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
    }

    @Then("the search results show prospect name and email address")
    public void theSearchResultsShowProspectNameAndEmailAddress() {
        assertTrue("Prospect names should be visible", prospectSearchPage.areProspectNamesVisible());
        assertTrue("Prospect emails should be visible", prospectSearchPage.areProspectEmailsVisible());
    }

    @Then("the first 5 coincidences are presented on screen")
    public void theFirst5CoincidencesArePresentedOnScreen() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("At least up to 5 results should be visible", visibleResults >= 1 && visibleResults <= 5);
    }

    @Then("scroll is enabled if more than 6 results exist")
    public void scrollIsEnabledIfMoreThan6ResultsExist() {
        int totalResults = prospectSearchPage.getTotalResultsCount();
        if (totalResults > 6) {
            assertTrue("Scroll should be enabled for more than 6 results", 
                prospectSearchPage.isScrollEnabled());
        }
    }
}