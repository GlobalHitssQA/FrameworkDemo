package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchQuery;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into the Acticenter dashboard as an authorized advisor")
    public void iAmLoggedIntoActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
    }

    @And("the dashboard is displayed with search functionality enabled")
    public void dashboardIsDisplayedWithSearchFunctionality() {
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be visible");
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("I enter an alphanumeric search query {string} in the search field")
    public void iEnterAlphanumericSearchQuery(String query) {
        searchQuery = query;
        prospectSearchPage.enterSearchQuery(query);
    }

    @Then("the alphanumeric string is accepted in the search field")
    public void alphanumericStringIsAccepted() {
        String currentValue = prospectSearchPage.getSearchFieldValue();
        assertEquals(searchQuery, currentValue, "Search field should contain the alphanumeric query");
    }

    @When("I execute the search")
    public void iExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search processes the alphanumeric input correctly")
    public void searchProcessesAlphanumericInputCorrectly() {
        prospectSearchPage.waitForSearchResults();
        assertTrue(prospectSearchPage.areResultsOrNoResultsMessageDisplayed(), 
            "Search results or no results message should be displayed");
    }

    @And("matching results are displayed or a no results message is shown")
    public void matchingResultsOrNoResultsMessageDisplayed() {
        assertTrue(prospectSearchPage.areResultsOrNoResultsMessageDisplayed(),
            "Either results or no results message must be visible");
    }

    @When("I enter a search query with special characters {string}")
    public void iEnterSearchQueryWithSpecialCharacters(String query) {
        searchQuery = query;
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchQuery(query);
    }

    @Then("the special characters are accepted in the search field without validation errors")
    public void specialCharactersAreAcceptedWithoutErrors() {
        String currentValue = prospectSearchPage.getSearchFieldValue();
        assertEquals(searchQuery, currentValue, "Search field should contain the query with special characters");
        assertFalse(prospectSearchPage.isValidationErrorDisplayed(), "No validation error should be displayed");
    }

    @When("I execute the search with special characters")
    public void iExecuteSearchWithSpecialCharacters() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search processes the input and returns appropriate results")
    public void searchProcessesInputAndReturnsResults() {
        prospectSearchPage.waitForSearchResults();
        assertTrue(prospectSearchPage.areResultsOrNoResultsMessageDisplayed(),
            "Search should process and return results or no results message");
    }

    @And("the system validates that only alphanumeric characters are accepted as per business rules")
    public void systemValidatesAlphanumericCharactersPerBusinessRules() {
        assertTrue(prospectSearchPage.isSearchFunctionalityWorking(),
            "Search functionality should be working according to business rules");
    }
}