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
    private static final int EXPECTED_VISIBLE_PROSPECTS = 5;
    private int initialProspectCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as an advisor")
    public void theUserIsLoggedInAsAnAdvisor() {
        // Precondition: User authentication handled by test setup
        // This step assumes login has been completed in a Before hook
    }

    @And("the Salesforce database contains more than 5 prospects matching the search criteria")
    public void theSalesforceDatabaseContainsMoreThan5ProspectsMatchingTheSearchCriteria() {
        // Precondition: Database state verified externally
        // This is a data precondition that should be ensured by test data setup
    }

    @Given("the user is on the prospect search screen in Acticenter")
    public void theUserIsOnTheProspectSearchScreenInActicenter() {
        prospectSearchPage.navigateToProspectSearchScreen();
    }

    @And("the search field is available")
    public void theSearchFieldIsAvailable() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the user enters a search term that returns more than 5 matching prospects")
    public void theUserEntersASearchTermThatReturnsMoreThan5MatchingProspects() {
        String searchTerm = "test";
        prospectSearchPage.enterSearchTerm(searchTerm);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search is executed and returns multiple matching results")
    public void theSearchIsExecutedAndReturnsMultipleMatchingResults() {
        assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
        assertTrue("Should have more than 5 total results", prospectSearchPage.getTotalResultsCount() > EXPECTED_VISIBLE_PROSPECTS);
    }

    @And("the system displays only the first 5 matching prospects on the screen")
    public void theSystemDisplaysOnlyTheFirst5MatchingProspectsOnTheScreen() {
        int visibleProspects = prospectSearchPage.getVisibleProspectsCount();
        assertEquals("Should display exactly 5 prospects initially", EXPECTED_VISIBLE_PROSPECTS, visibleProspects);
        initialProspectCount = visibleProspects;
    }

    @And("a scroll mechanism is available to view additional prospects")
    public void aScrollMechanismIsAvailableToViewAdditionalProspects() {
        assertTrue("Scroll mechanism should be available", prospectSearchPage.isScrollableResultsListVisible());
    }

    @When("the user scrolls down to view additional prospects")
    public void theUserScrollsDownToViewAdditionalProspects() {
        prospectSearchPage.scrollDownResultsList();
    }

    @Then("additional matching prospects are displayed as the user scrolls down")
    public void additionalMatchingProspectsAreDisplayedAsTheUserScrollsDown() {
        int currentVisibleProspects = prospectSearchPage.getVisibleProspectsCount();
        assertTrue("Additional prospects should be visible after scrolling", currentVisibleProspects > initialProspectCount || prospectSearchPage.hasNewProspectsLoaded());
    }
}