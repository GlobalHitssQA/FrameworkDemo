package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.AdvisorDashboardPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private AdvisorDashboardPage dashboardPage;
    private String initialUrl;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new AdvisorDashboardPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@test.com", "password123");
        dashboardPage.waitForDashboardToLoad();
        initialUrl = page.url();
    }

    @When("the advisor enters at least {int} characters in the prospect search field")
    public void theAdvisorEntersCharactersInProspectSearchField(int minChars) {
        dashboardPage.enterProspectSearchText("Jo");
    }

    @Then("the system displays a list of matching prospects")
    public void theSystemDisplaysListOfMatchingProspects() {
        assertTrue("Search results should be visible", dashboardPage.areSearchResultsVisible());
        assertTrue("At least one prospect should be displayed", dashboardPage.getProspectResultsCount() > 0);
    }

    @When("the advisor reviews the search results without clicking any prospect")
    public void theAdvisorReviewsSearchResultsWithoutClicking() {
        int resultsCount = dashboardPage.getProspectResultsCount();
        dashboardPage.scrollThroughResults();
    }

    @And("the advisor clicks outside the search results area")
    public void theAdvisorClicksOutsideSearchResultsArea() {
        dashboardPage.clickOutsideSearchArea();
    }

    @Then("the system remains on the current dashboard")
    public void theSystemRemainsOnCurrentDashboard() {
        String currentUrl = page.url();
        assertEquals("URL should not have changed", initialUrl, currentUrl);
        assertTrue("Dashboard should still be visible", dashboardPage.isDashboardVisible());
    }

    @And("no navigation to other screens occurs")
    public void noNavigationToOtherScreensOccurs() {
        assertFalse("No process selection screen should appear", dashboardPage.isProcessSelectionVisible());
        assertFalse("No prospect detail screen should appear", dashboardPage.isProspectDetailVisible());
    }
}