package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
importio.cucumber.java.en.When;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is on the Acticenter dashboard prospect search interface")
    public void theAdvisorIsOnTheActicenterDashboardProspectSearchInterface() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Prospect search interface should be displayed");
    }

    @When("the advisor enters {int} character in the prospect search field")
    public void theAdvisorEntersCharacterInTheProspectSearchField(Integer characterCount) {
        String searchText = "A";
        prospectSearchPage.enterSearchText(searchText);
    }

    @Then("the system does not trigger search execution")
    public void theSystemDoesNotTriggerSearchExecution() {
        assertFalse(prospectSearchPage.isSearchTriggered(), "Search should not be triggered with single character");
    }

    @Then("no search results are displayed")
    public void noSearchResultsAreDisplayed() {
        assertFalse(prospectSearchPage.areResultsDisplayed(), "No search results should be displayed");
    }

    @Then("a message indicating insufficient characters for search is shown")
    public void aMessageIndicatingInsufficientCharactersForSearchIsShown() {
        assertTrue(prospectSearchPage.isNoResultsMessageVisible(), "No results message should be visible");
        String message = prospectSearchPage.getNoResultsMessageText();
        assertTrue(message.contains("insufficient") || message.contains("minimum") || message.contains("caracteres"),
                "Message should indicate insufficient characters");
    }

    @Then("the last {int} searches performed by the advisor are displayed")
    public void theLastSearchesPerformedByTheAdvisorAreDisplayed(Integer searchCount) {
        assertTrue(prospectSearchPage.isRecentSearchesVisible(), "Recent searches should be visible");
        int displayedSearches = prospectSearchPage.getRecentSearchesCount();
        assertTrue(displayedSearches <= searchCount, "Should display up to " + searchCount + " recent searches");
    }

    @When("the advisor clicks the search icon button")
    public void theAdvisorClicksTheSearchIconButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system prevents search execution and maintains the no results state")
    public void theSystemPreventsSearchExecutionAndMaintainsTheNoResultsState() {
        assertFalse(prospectSearchPage.isSearchTriggered(), "Search should remain prevented");
        assertFalse(prospectSearchPage.areResultsDisplayed(), "No results state should be maintained");
    }
}