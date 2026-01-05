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
    private String searchCriteria = "John";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is on the prospect search screen in Acticenter")
    public void advisorIsOnProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search icon should be visible", prospectSearchPage.isSearchIconVisible());
    }

    @When("the advisor enters valid search criteria with more than 2 characters")
    public void advisorEntersValidSearchCriteria() {
        prospectSearchPage.enterSearchCriteria(searchCriteria);
        String enteredText = prospectSearchPage.getSearchFieldValue();
        assertEquals("Search field should contain entered text", searchCriteria, enteredText);
    }

    @And("the advisor clicks the search icon")
    public void advisorClicksSearchIcon() {
        prospectSearchPage.clickSearchIcon();
    }

    @Then("the system displays matching prospects with highlighted search terms")
    public void systemDisplaysMatchingProspectsWithHighlights() {
        assertTrue("Search results should be visible", prospectSearchPage.isSearchResultsVisible());
        assertTrue("Results should contain highlighted matches", prospectSearchPage.hasHighlightedMatches());
    }

    @And("the first 5 coincidences are shown")
    public void firstFiveCoincidencesAreShown() {
        int resultsCount = prospectSearchPage.getVisibleResultsCount();
        assertTrue("Should display at least 1 result", resultsCount > 0);
        assertTrue("Should display maximum 5 results initially", resultsCount <= 5);
    }

    @And("the search only executes on icon click not while typing")
    public void searchOnlyExecutesOnIconClick() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchCriteriaWithoutSearching("Test");
        assertFalse("Results should not appear while typing", prospectSearchPage.isSearchResultsVisible());
    }
}