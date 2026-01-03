package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;

import static org.junit.Assert.*;

public class ProspectSearchWithoutSelectionSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchWithoutSelectionSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is logged into the Acticenter dashboard")
    public void theAdvisorUserIsLoggedIntoTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be displayed", dashboardPage.isDashboardVisible());
    }

    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenVisible());
    }

    @And("the advisor enters a search term with at least 2 characters")
    public void theAdvisorEntersASearchTermWithAtLeast2Characters() {
        prospectSearchPage.enterSearchTerm("John");
        prospectSearchPage.clickSearchButton();
    }

    @And("the advisor reviews the search results without selecting any prospect")
    public void theAdvisorReviewsTheSearchResultsWithoutSelectingAnyProspect() {
        prospectSearchPage.scrollThroughResults();
    }

    @Then("the search results should remain visible on screen")
    public void theSearchResultsShouldRemainVisibleOnScreen() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsVisible());
    }

    @And("the system should remain on the current dashboard")
    public void theSystemShouldRemainOnTheCurrentDashboard() {
        String currentUrl = page.url();
        assertTrue("System should remain on dashboard", dashboardPage.isOnDashboard(currentUrl));
    }
}