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
    private static final String VALID_PROSPECT_NAME = "Juan Pérez";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        // Login logic would be implemented here or in a separate LoginPage
        page.navigate("https://actinver.atlassian.net");
        // Assume login is performed via LoginPage or pre-authenticated session
    }

    @And("the advisor is on the prospect search page")
    public void theAdvisorIsOnTheProspectSearchPage() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the advisor enters a valid prospect name in the search field")
    public void theAdvisorEntersAValidProspectNameInTheSearchField() {
        prospectSearchPage.enterProspectName(VALID_PROSPECT_NAME);
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results are displayed")
    public void theSearchResultsAreDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
    }

    @And("the prospect name field is visible in each search result entry")
    public void theProspectNameFieldIsVisibleInEachSearchResultEntry() {
        int resultCount = prospectSearchPage.getSearchResultCount();
        assertTrue("At least one search result should be present", resultCount > 0);
        
        for (int i = 0; i < resultCount; i++) {
            assertTrue(
                "Prospect name should be visible in result entry " + (i + 1),
                prospectSearchPage.isProspectNameVisibleInResult(i)
            );
        }
    }
}