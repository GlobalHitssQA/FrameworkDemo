package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchResults;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user accesses the prospect search functionality in Acticenter")
    public void userAccessesProspectSearchFunctionality() {
        prospectSearchPage.navigateToSearchPage();
    }

    @And("the search screen loads with input field active")
    public void searchScreenLoadsWithInputFieldActive() {
        assertTrue("Search input field should be visible", prospectSearchPage.isSearchInputVisible());
        assertTrue("Search input field should be enabled", prospectSearchPage.isSearchInputEnabled());
    }

    @When("the user enters valid search criteria with minimum 3 characters")
    public void userEntersValidSearchCriteria() {
        prospectSearchPage.enterSearchCriteria("Test");
    }

    @And("the user presses the Enter key on keyboard")
    public void userPressesEnterKey() {
        prospectSearchPage.pressEnterOnSearchField();
    }

    @Then("the system triggers search execution immediately")
    public void systemTriggersSearchExecution() {
        prospectSearchPage.waitForSearchExecution();
    }

    @And("search results are returned and displayed")
    public void searchResultsAreReturnedAndDisplayed() {
        assertTrue("Results container should be visible", prospectSearchPage.isResultsContainerVisible());
    }

    @And("prospect matches from Salesforce are shown or no results message appears")
    public void prospectMatchesOrNoResultsMessageAppears() {
        boolean hasResults = prospectSearchPage.hasSearchResults();
        boolean hasNoResultsMessage = prospectSearchPage.isNoResultsMessageVisible();
        assertTrue("Either results or no results message should be displayed", hasResults || hasNoResultsMessage);
    }

    @And("Enter key behavior is consistent with clicking magnifying glass icon")
    public void enterKeyBehaviorConsistentWithIconClick() {
        String resultsFromEnter = prospectSearchPage.getResultsText();
        prospectSearchPage.clearSearchInput();
        prospectSearchPage.enterSearchCriteria("Test");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchExecution();
        String resultsFromClick = prospectSearchPage.getResultsText();
        assertEquals("Results from Enter key and icon click should be identical", resultsFromEnter, resultsFromClick);
    }
}