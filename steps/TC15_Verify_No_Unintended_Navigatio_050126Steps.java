package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String currentUrl;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net/dashboard");
        // Assume login is handled by pre-authentication or session management
    }

    @And("the advisor has access to the dashboard")
    public void theAdvisorHasAccessToTheDashboard() {
        dashboardPage.verifyDashboardIsVisible();
    }

    @When("the advisor enters a prospect name in the search field")
    public void theAdvisorEntersAProspectNameInTheSearchField() {
        prospectSearchPage.enterProspectName("John Doe");
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        currentUrl = page.url();
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results are displayed")
    public void theSearchResultsAreDisplayed() {
        prospectSearchPage.verifySearchResultsAreVisible();
    }

    @And("the advisor reviews the results without selecting any prospect")
    public void theAdvisorReviewsTheResultsWithoutSelectingAnyProspect() {
        prospectSearchPage.verifyResultsListIsVisible();
        // No action performed - just verification
    }

    @And("the system remains on the dashboard screen")
    public void theSystemRemainsOnTheDashboardScreen() {
        String newUrl = page.url();
        if (!newUrl.equals(currentUrl) && !newUrl.contains("/dashboard")) {
            throw new AssertionError("Navigation occurred: Expected to remain on dashboard, but URL changed to " + newUrl);
        }
        dashboardPage.verifyDashboardIsVisible();
    }

    @And("no process selection screen is opened")
    public void noProcessSelectionScreenIsOpened() {
        prospectSearchPage.verifyProcessSelectionNotVisible();
    }

    @And("no prospect detail screen is opened")
    public void noProspectDetailScreenIsOpened() {
        prospectSearchPage.verifyProspectDetailNotVisible();
    }
}