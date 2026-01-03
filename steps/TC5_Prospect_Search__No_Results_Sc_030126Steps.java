package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchNoResultsSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchNoResultsSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is logged into Acticenter")
    public void theAdvisorUserIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
    }

    @And("the dashboard is displayed")
    public void theDashboardIsDisplayed() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
    }

    @And("the search field is displayed")
    public void theSearchFieldIsDisplayed() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @And("the advisor enters search criteria that returns no results from Salesforce")
    public void theAdvisorEntersSearchCriteriaThatReturnsNoResultsFromSalesforce() {
        prospectSearchPage.enterSearchCriteria("NONEXISTENT_PROSPECT_XYZ_999");
    }

    @And("the advisor executes the search by clicking the search icon")
    public void theAdvisorExecutesTheSearchByClickingTheSearchIcon() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system queries the Salesforce database")
    public void theSystemQueriesTheSalesforceDatabase() {
        prospectSearchPage.waitForSearchToComplete();
    }

    @And("a no results message is displayed to the user")
    public void aNoResultsMessageIsDisplayedToTheUser() {
        assertTrue("No results message should be visible", prospectSearchPage.isNoResultsMessageVisible());
    }

    @And("the message indicates that no prospects were found matching the search criteria")
    public void theMessageIndicatesThatNoProspectsWereFoundMatchingTheSearchCriteria() {
        String message = prospectSearchPage.getNoResultsMessageText();
        assertTrue("Message should indicate no prospects found", 
            message.toLowerCase().contains("no") && 
            (message.toLowerCase().contains("prospect") || message.toLowerCase().contains("result")));
    }
}