package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.DashboardPage;
import pages.LoginPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchHighlightingSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String searchQuery = "Jo";

    public ProspectSearchHighlightingSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
    }

    @And("the advisor is on the dashboard")
    public void theAdvisorIsOnTheDashboard() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor enters at least 2 characters matching existing prospect names")
    public void theAdvisorEntersAtLeastTwoCharactersMatchingExistingProspectNames() {
        prospectSearchPage.enterSearchQuery(searchQuery);
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays a list of matching prospects")
    public void theSystemDisplaysAListOfMatchingProspects() {
        assertTrue("Results list should be visible", prospectSearchPage.isResultsListVisible());
        assertTrue("At least one prospect should be displayed", prospectSearchPage.getProspectCount() > 0);
    }

    @And("the matching characters in prospect names are highlighted")
    public void theMatchingCharactersInProspectNamesAreHighlighted() {
        assertTrue("Highlighted elements should be present", prospectSearchPage.areHighlightedElementsPresent());
    }

    @And("all matching characters across all prospects are consistently highlighted")
    public void allMatchingCharactersAcrossAllProspectsAreConsistentlyHighlighted() {
        assertTrue("All matching characters should be highlighted consistently", 
                   prospectSearchPage.verifyConsistentHighlighting(searchQuery));
    }
}