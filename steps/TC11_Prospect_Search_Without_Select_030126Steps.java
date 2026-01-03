package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

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

    @Given("the advisor is logged into Acticenter as a Bank Advisor")
    public void theAdvisorIsLoggedIntoActicenterAsBankAdvisor() {
        dashboardPage.navigateToDashboard();
    }

    @And("the dashboard is displayed with all available options")
    public void theDashboardIsDisplayedWithAllAvailableOptions() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("the advisor enters at least 2 characters in the prospect search field")
    public void theAdvisorEntersAtLeastTwoCharactersInProspectSearchField() {
        prospectSearchPage.enterSearchText("Jo");
    }

    @Then("search results are displayed with matching prospects")
    public void searchResultsAreDisplayedWithMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
    }

    @When("the advisor reviews the list of search results without selecting any prospect")
    public void theAdvisorReviewsTheListOfSearchResultsWithoutSelectingAnyProspect() {
        int resultCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("Search results should be present", resultCount > 0);
    }

    @Then("the results remain visible on screen")
    public void theResultsRemainVisibleOnScreen() {
        assertTrue("Search results should remain visible", prospectSearchPage.areSearchResultsVisible());
    }

    @When("the advisor clicks outside the search results area")
    public void theAdvisorClicksOutsideTheSearchResultsArea() {
        initialDashboardUrl = page.url();
        prospectSearchPage.clickOutsideSearchArea();
    }

    @Then("the system remains on the dashboard screen")
    public void theSystemRemainsOnTheDashboardScreen() {
        assertTrue("Dashboard should still be visible", dashboardPage.isDashboardVisible());
    }

    @And("the advisor is still on the same dashboard where they initiated the search")
    public void theAdvisorIsStillOnTheSameDashboardWhereTheyInitiatedTheSearch() {
        String currentUrl = page.url();
        assertEquals("URL should not have changed", initialDashboardUrl, currentUrl);
    }

    @And("the dashboard state is preserved without navigation to any other screen")
    public void theDashboardStateIsPreservedWithoutNavigationToAnyOtherScreen() {
        assertTrue("Dashboard state should be preserved", dashboardPage.isDashboardInOriginalState());
    }
}