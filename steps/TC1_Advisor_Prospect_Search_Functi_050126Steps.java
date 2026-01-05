package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String searchedProspectName;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is logged into Acticenter")
    public void theAdvisorUserIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "SecurePassword123");
    }

    @And("the advisor is on the dashboard page")
    public void theAdvisorIsOnTheDashboardPage() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible after login");
    }

    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
    }

    @Then("the search field should be displayed and available for input")
    public void theSearchFieldShouldBeDisplayedAndAvailableForInput() {
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled");
    }

    @When("the advisor enters a prospect name with more than 2 characters")
    public void theAdvisorEntersAProspectNameWithMoreThanTwoCharacters() {
        searchedProspectName = "John";
        prospectSearchPage.enterProspectSearchTerm(searchedProspectName);
    }

    @And("the advisor triggers the search")
    public void theAdvisorTriggersTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system should query the Salesforce database")
    public void theSystemShouldQueryTheSalesforceDatabase() {
        prospectSearchPage.waitForSearchResults();
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed after query");
    }

    @And("the search results should display prospects owned by the advisor")
    public void theSearchResultsShouldDisplayProspectsOwnedByTheAdvisor() {
        assertTrue(prospectSearchPage.getResultsCount() > 0, "At least one prospect should be displayed");
        assertTrue(prospectSearchPage.getResultsCount() <= 5, "First 5 matches should be displayed initially");
    }

    @And("only prospects matching the advisor's cell or financial center schema should be shown")
    public void onlyProspectsMatchingTheAdvisorsCellOrFinancialCenterSchemaShouldBeShown() {
        assertTrue(prospectSearchPage.validateProspectsOwnership(), "All displayed prospects should belong to the advisor");
    }
}