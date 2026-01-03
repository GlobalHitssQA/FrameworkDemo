package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchScrollSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private int totalResultsCount;

    public ProspectSearchScrollSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user has accessed Acticenter and navigated to the prospect search screen")
    public void userAccessedProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search screen should be ready", prospectSearchPage.isSearchScreenReady());
    }

    @When("the user performs a search that returns more than 5 prospect matches")
    public void userPerformsSearchWithMultipleResults() {
        prospectSearchPage.performSearch("test");
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the system displays the first 5 results on screen")
    public void systemDisplaysFirstFiveResults() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue("Should display at least 5 results initially", visibleResults >= 5);
    }

    @And("a scroll mechanism is available for navigating through results")
    public void scrollMechanismIsAvailable() {
        assertTrue("Scroll container should be present", prospectSearchPage.isScrollContainerVisible());
        assertTrue("Results should be scrollable", prospectSearchPage.isResultsScrollable());
    }

    @When("the user scrolls down through the results list")
    public void userScrollsDownThroughResults() {
        prospectSearchPage.scrollToBottomOfResults();
    }

    @Then("additional results beyond the fifth are displayed")
    public void additionalResultsAreDisplayed() {
        int totalResults = prospectSearchPage.getTotalResultsCount();
        assertTrue("Should display more than 5 results after scrolling", totalResults > 5);
        totalResultsCount = totalResults;
    }

    @And("the sixth and subsequent results display prospect name and email")
    public void sixthAndSubsequentResultsDisplayRequiredInfo() {
        for (int i = 5; i < totalResultsCount && i < 10; i++) {
            String prospectName = prospectSearchPage.getProspectNameAtIndex(i);
            String prospectEmail = prospectSearchPage.getProspectEmailAtIndex(i);
            
            assertNotNull("Prospect name should be present at index " + i, prospectName);
            assertFalse("Prospect name should not be empty at index " + i, prospectName.isEmpty());
            assertNotNull("Prospect email should be present at index " + i, prospectEmail);
            assertFalse("Prospect email should not be empty at index " + i, prospectEmail.isEmpty());
        }
    }

    @And("all matching prospects are accessible through scrolling")
    public void allProspectsAccessibleThroughScrolling() {
        prospectSearchPage.scrollToTopOfResults();
        prospectSearchPage.scrollToBottomOfResults();
        
        int finalCount = prospectSearchPage.getTotalResultsCount();
        assertEquals("All results should remain accessible", totalResultsCount, finalCount);
        assertTrue("Should have accessed all prospects through scrolling", finalCount > 5);
    }
}