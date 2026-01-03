package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.jupiter.api.Assertions.*;

public class SalesforceProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String prospectName = "John Smith";

    public SalesforceProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in to Acticenter as a Wealth Management Advisor")
    public void userIsLoggedInAsAdvisor() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@acticenter.com", "password123");
        assertTrue(loginPage.isLoginSuccessful(), "User should be successfully logged in");
    }

    @When("the user navigates to the prospect search section")
    public void userNavigatesToProspectSearch() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isProspectSearchDisplayed(), "Prospect search interface should be displayed");
    }

    @And("the user enters a prospect name with more than 2 characters")
    public void userEntersProspectName() {
        prospectSearchPage.enterProspectName(prospectName);
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search query should be executed against Salesforce database")
    public void searchQueryExecutedAgainstSalesforce() {
        assertTrue(prospectSearchPage.isSearchExecuted(), "Search query should be executed");
        assertTrue(prospectSearchPage.waitForResults(), "Search results should be loaded");
    }

    @And("the search results should correspond to records stored in Salesforce")
    public void resultsCorrespondToSalesforceRecords() {
        assertTrue(prospectSearchPage.hasSearchResults(), "Search results should be displayed");
        assertTrue(prospectSearchPage.validateResultsFromSalesforce(), "Results should contain Salesforce data attributes");
    }

    @And("the system should confirm the query was performed in Salesforce database")
    public void systemConfirmsSalesforceQuery() {
        assertTrue(prospectSearchPage.verifySalesforceIntegration(), "System should confirm Salesforce database query");
    }
}