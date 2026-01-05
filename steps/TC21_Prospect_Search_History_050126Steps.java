package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchHistorySteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is on the prospect search screen in Acticenter")
    public void theAdvisorIsOnProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Prospect search interface should be displayed");
    }

    @When("the advisor starts typing in the search field")
    public void theAdvisorStartsTypingInSearchField() {
        prospectSearchPage.focusOnSearchField();
    }

    @Then("the system displays the last 5 searches performed")
    public void theSystemDisplaysLast5Searches() {
        int searchHistoryCount = prospectSearchPage.getSearchHistoryCount();
        assertTrue(searchHistoryCount <= 5, "Search history should display at most 5 searches");
        assertTrue(searchHistoryCount > 0, "Search history should display previous searches");
    }

    @Then("the searches are ordered chronologically with the most recent first")
    public void theSearchesAreOrderedChronologically() {
        assertTrue(prospectSearchPage.isSearchHistoryOrderedChronologically(), 
                   "Search history should be ordered with most recent first");
    }

    @When("the advisor performs a new search with different criteria")
    public void theAdvisorPerformsNewSearch() {
        String newSearchCriteria = "test.prospect@email.com";
        prospectSearchPage.performSearch(newSearchCriteria);
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should be displayed");
    }

    @When("the advisor returns to the search field and begins typing")
    public void theAdvisorReturnsToSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.focusOnSearchField();
    }

    @Then("the search history updates with the most recent search at the top")
    public void theSearchHistoryUpdatesWithMostRecent() {
        String mostRecentSearch = prospectSearchPage.getMostRecentSearchFromHistory();
        assertNotNull(mostRecentSearch, "Most recent search should be displayed at the top");
    }

    @Then("only the last 5 searches are displayed")
    public void onlyLast5SearchesAreDisplayed() {
        int searchHistoryCount = prospectSearchPage.getSearchHistoryCount();
        assertTrue(searchHistoryCount <= 5, "Only the last 5 searches should be displayed");
    }

    @Then("the search history persists throughout the user session")
    public void theSearchHistoryPersistsThroughoutSession() {
        prospectSearchPage.navigateAwayFromSearch();
        prospectSearchPage.navigateToProspectSearch();
        prospectSearchPage.focusOnSearchField();
        int searchHistoryCount = prospectSearchPage.getSearchHistoryCount();
        assertTrue(searchHistoryCount > 0, "Search history should persist across navigation within the session");
    }
}