package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.AdvisorDashboardPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchWithoutSelectionSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private AdvisorDashboardPage dashboardPage;
    private String dashboardStateBefore;

    public ProspectSearchWithoutSelectionSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.dashboardPage = new AdvisorDashboardPage(page);
    }

    @Given("the advisor is on the prospect search screen from the dashboard")
    public void theAdvisorIsOnTheProspectSearchScreenFromTheDashboard() {
        dashboardPage.navigateToProspectSearch();
        assertTrue("Prospect search interface should be displayed", 
                   prospectSearchPage.isSearchInterfaceDisplayed());
        assertTrue("Dashboard should remain accessible", 
                   dashboardPage.isDashboardAccessible());
    }

    @When("the advisor enters valid search criteria and executes the search")
    public void theAdvisorEntersValidSearchCriteriaAndExecutesTheSearch() {
        prospectSearchPage.enterSearchCriteria("test@example.com");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays matching prospects with up to 5 results")
    public void theSystemDisplaysMatchingProspectsWithUpTo5Results() {
        assertTrue("Search results should be displayed", 
                   prospectSearchPage.areSearchResultsDisplayed());
        int resultCount = prospectSearchPage.getResultCount();
        assertTrue("Result count should be between 1 and 5", 
                   resultCount >= 1 && resultCount <= 5);
    }

    @When("the advisor reviews the search results without selecting any prospect")
    public void theAdvisorReviewsTheSearchResultsWithoutSelectingAnyProspect() {
        assertTrue("Search results should remain displayed", 
                   prospectSearchPage.areSearchResultsDisplayed());
        dashboardStateBefore = dashboardPage.getCurrentDashboardState();
    }

    @And("the advisor clears the search or navigates away")
    public void theAdvisorClearsTheSearchOrNavigatesAway() {
        prospectSearchPage.clearSearchOrNavigateBack();
    }

    @Then("the system returns to the dashboard view")
    public void theSystemReturnsToDashboardView() {
        assertTrue("Dashboard should be displayed", 
                   dashboardPage.isDashboardDisplayed());
    }

    @And("no prospect information is loaded or displayed")
    public void noProspectInformationIsLoadedOrDisplayed() {
        assertFalse("Prospect details should not be displayed", 
                    prospectSearchPage.isProspectDetailsDisplayed());
    }

    @And("the dashboard remains in its previous state")
    public void theDashboardRemainsInItsPreviousState() {
        String dashboardStateAfter = dashboardPage.getCurrentDashboardState();
        assertEquals("Dashboard state should remain unchanged", 
                     dashboardStateBefore, dashboardStateAfter);
    }
}