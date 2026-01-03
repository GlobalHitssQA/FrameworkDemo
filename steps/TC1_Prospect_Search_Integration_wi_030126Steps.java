package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.LoginPage;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is authenticated in Acticenter")
    public void theAdvisorUserIsAuthenticatedInActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible after login");
    }

    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("the advisor enters a valid prospect name in the search field")
    public void theAdvisorEntersAValidProspectNameInTheSearchField() {
        prospectSearchPage.enterProspectName("Juan Perez");
    }

    @When("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results display prospect information from Salesforce")
    public void theSearchResultsDisplayProspectInformationFromSalesforce() {
        assertTrue(prospectSearchPage.areResultsVisible(), "Search results should be visible");
        assertTrue(prospectSearchPage.getResultsCount() > 0, "At least one result should be displayed");
    }

    @Then("the prospect details include name and email address")
    public void theProspectDetailsIncludeNameAndEmailAddress() {
        assertTrue(prospectSearchPage.isProspectNameDisplayed(), "Prospect name should be displayed");
        assertTrue(prospectSearchPage.isProspectEmailDisplayed(), "Prospect email should be displayed");
        assertNotNull(prospectSearchPage.getProspectName(), "Prospect name should not be null");
        assertNotNull(prospectSearchPage.getProspectEmail(), "Prospect email should not be null");
    }
}