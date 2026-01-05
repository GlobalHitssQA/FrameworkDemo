package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchClearSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchClearSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the Acticenter dashboard")
    public void iAmOnTheActicenterDashboard() {
        page.navigate("https://actinver.atlassian.net/dashboard");
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be visible");
    }

    @When("I navigate to prospect search functionality")
    public void iNavigateToProspectSearchFunctionality() {
        prospectSearchPage.clickProspectSearchMenu();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @And("I enter {string} in the search field")
    public void iEnterTextInTheSearchField(String searchText) {
        prospectSearchPage.enterSearchText(searchText);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("search results should be displayed on screen")
    public void searchResultsShouldBeDisplayedOnScreen() {
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be visible");
        assertTrue(prospectSearchPage.getSearchResultsCount() > 0, "Search results count should be greater than 0");
    }

    @When("I clear the search field completely")
    public void iClearTheSearchFieldCompletely() {
        prospectSearchPage.clearSearchField();
    }

    @Then("the search field should be empty")
    public void theSearchFieldShouldBeEmpty() {
        assertEquals("", prospectSearchPage.getSearchFieldValue(), "Search field should be empty");
    }

    @And("the search results should be removed from screen")
    public void theSearchResultsShouldBeRemovedFromScreen() {
        assertFalse(prospectSearchPage.areSearchResultsVisible(), "Search results should not be visible");
    }

    @And("I should be on the dashboard where I can select new prospect function")
    public void iShouldBeOnTheDashboardWhereICanSelectNewProspectFunction() {
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be visible");
        assertTrue(prospectSearchPage.isNewProspectButtonVisible(), "New prospect button should be visible");
    }

    @When("I do not select any element from previous search results")
    public void iDoNotSelectAnyElementFromPreviousSearchResults() {
        // No action - validation step
    }

    @Then("the system should remain on dashboard without proceeding to any process")
    public void theSystemShouldRemainOnDashboardWithoutProceedingToAnyProcess() {
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should still be visible");
        assertFalse(prospectSearchPage.isProcessSelectionScreenVisible(), "Process selection screen should not be visible");
    }
}