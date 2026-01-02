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

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is on the Acticenter dashboard")
    public void theAdvisorIsOnTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue(prospectSearchPage.isDashboardDisplayed(), "Dashboard should be displayed");
        assertTrue(prospectSearchPage.isSearchFieldAvailable(), "Search field should be available");
    }

    @When("the advisor enters a search query with no matching prospects")
    public void theAdvisorEntersASearchQueryWithNoMatchingProspects() {
        prospectSearchPage.enterSearchQuery("NONEXISTENT_PROSPECT_XYZ123");
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.executeSearch();
    }

    @Then("a no results message is displayed")
    public void aNoResultsMessageIsDisplayed() {
        assertTrue(prospectSearchPage.isNoResultsMessageVisible(), "No results message should be displayed");
        String message = prospectSearchPage.getNoResultsMessageText();
        assertFalse(message.isEmpty(), "No results message should contain text");
    }

    @And("the dashboard remains functional for new searches")
    public void theDashboardRemainsFunctionalForNewSearches() {
        assertTrue(prospectSearchPage.isDashboardDisplayed(), "Dashboard should remain displayed");
        assertTrue(prospectSearchPage.isSearchFieldAvailable(), "Search field should be available for new queries");
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled");
    }
}