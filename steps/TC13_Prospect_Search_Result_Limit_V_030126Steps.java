package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user has accessed the Acticenter dashboard")
    public void theAdvisorUserHasAccessedTheActicenterDashboard() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenVisible());
    }

    @And("the advisor enters a search term that returns more than 5 results")
    public void theAdvisorEntersASearchTermThatReturnsMoreThanFiveResults() {
        prospectSearchPage.enterSearchTerm("test");
        prospectSearchPage.clickSearchButton();
    }

    @Then("exactly 5 prospect matches should be displayed on the initial screen")
    public void exactlyFiveProspectMatchesShouldBeDisplayedOnTheInitialScreen() {
        int resultCount = prospectSearchPage.getDisplayedResultsCount();
        assertEquals("Expected exactly 5 results to be displayed", 5, resultCount);
    }

    @And("each result should display the prospect name and email key")
    public void eachResultShouldDisplayTheProspectNameAndEmailKey() {
        for (int i = 0; i < 5; i++) {
            assertTrue("Result " + (i + 1) + " should have prospect name", 
                prospectSearchPage.isProspectNameVisible(i));
            assertTrue("Result " + (i + 1) + " should have email key", 
                prospectSearchPage.isEmailKeyVisible(i));
        }
    }
}