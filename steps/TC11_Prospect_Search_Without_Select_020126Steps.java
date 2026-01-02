package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;

import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String initialDashboardUrl;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in as an advisor on the Acticenter dashboard")
    public void iAmLoggedInAsAnAdvisorOnTheActicenterDashboard() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible");
        initialDashboardUrl = page.url();
    }

    @When("I access the prospect search functionality")
    public void iAccessTheProspectSearchFunctionality() {
        dashboardPage.clickProspectSearchButton();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be available");
    }

    @And("I enter valid search criteria and execute the search")
    public void iEnterValidSearchCriteriaAndExecuteTheSearch() {
        prospectSearchPage.enterSearchCriteria("Test Prospect");
        prospectSearchPage.clickSearchButton();
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should be displayed");
    }

    @And("I review the search results without selecting any prospect")
    public void iReviewTheSearchResultsWithoutSelectingAnyProspect() {
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should remain visible");
        prospectSearchPage.scrollThroughResults();
    }

    @And("I close the search results without making a selection")
    public void iCloseTheSearchResultsWithoutMakingASelection() {
        prospectSearchPage.closeSearchResults();
    }

    @Then("the system should remain on the current dashboard")
    public void theSystemShouldRemainOnTheCurrentDashboard() {
        String currentUrl = page.url();
        assertTrue(currentUrl.contains(initialDashboardUrl) || dashboardPage.isDashboardVisible(),
                "Should remain on the dashboard");
    }

    @And("no navigation to new prospect creation should occur")
    public void noNavigationToNewProspectCreationShouldOccur() {
        assertFalse(page.url().contains("/prospect/new") || page.url().contains("/create"),
                "Should not navigate to prospect creation");
    }

    @And("the dashboard state should be maintained")
    public void theDashboardStateShouldBeMaintained() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard state should be maintained");
        assertFalse(prospectSearchPage.isSearchFieldVisible(), "Search dialog should be closed");
    }
}