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
    private static final String SEARCH_QUERY = "Martinez";
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the advisor is authenticated and on the Acticenter dashboard")
    public void advisorIsAuthenticatedAndOnDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }
    
    @And("the prospect search field is available")
    public void prospectSearchFieldIsAvailable() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }
    
    @When("the advisor enters a search query that returns more than 5 prospects")
    public void advisorEntersSearchQuery() {
        prospectSearchPage.enterSearchQuery(SEARCH_QUERY);
    }
    
    @And("the advisor executes the search")
    public void advisorExecutesSearch() {
        prospectSearchPage.executeSearch();
    }
    
    @Then("the first 5 matching prospects are displayed with highlighted characters")
    public void firstFiveProspectsAreDisplayed() {
        prospectSearchPage.waitForSearchResults();
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("At least 5 results should be visible", visibleResults >= 5);
        assertTrue("Results should have highlighted text", prospectSearchPage.hasHighlightedMatches());
    }
    
    @And("a scroll option is available for additional results")
    public void scrollOptionIsAvailable() {
        assertTrue("Scroll should be available", prospectSearchPage.isScrollAvailable());
    }
    
    @When("the advisor scrolls down to view more results")
    public void advisorScrollsDown() {
        prospectSearchPage.scrollToViewMoreResults();
    }
    
    @Then("additional prospects beyond the initial 5 are displayed")
    public void additionalProspectsAreDisplayed() {
        int totalResults = prospectSearchPage.getTotalResultsCount();
        assertTrue("More than 5 results should be available after scrolling", totalResults > 5);
    }
    
    @And("all scrolled results maintain consistent formatting with name and email")
    public void allResultsMaintainConsistentFormatting() {
        assertTrue("All results should have prospect names", prospectSearchPage.allResultsHaveNames());
        assertTrue("All results should have emails", prospectSearchPage.allResultsHaveEmails());
        assertTrue("All results should have consistent format", prospectSearchPage.hasConsistentFormatting());
    }
}