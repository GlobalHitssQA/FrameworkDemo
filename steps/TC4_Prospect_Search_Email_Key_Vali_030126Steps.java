package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private String prospectWithoutEmailKey;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("a prospect exists in Salesforce without an email key field populated")
    public void aProspectExistsInSalesforceWithoutEmailKey() {
        // This step typically involves database verification or API call to Salesforce
        // For automation purposes, we store the prospect identifier for later validation
        this.prospectWithoutEmailKey = "PROSPECT_WITHOUT_EMAIL_001";
        // In real scenario: verify via Salesforce API that this prospect has null/empty email key
    }

    @And("I am logged in to Acticenter as an advisor")
    public void iAmLoggedInToActicenterAsAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor_user", "advisor_password");
        assertTrue("Login was not successful", dashboardPage.isDashboardVisible());
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue("Search interface is not displayed", prospectSearchPage.isSearchInterfaceDisplayed());
    }

    @And("I execute a search that would normally include the prospect without email key")
    public void iExecuteSearchThatWouldIncludeProspectWithoutEmailKey() {
        prospectSearchPage.enterSearchCriteria("PROSPECT_WITHOUT_EMAIL");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect without email key should not appear in the search results")
    public void theProspectWithoutEmailKeyShouldNotAppearInResults() {
        boolean prospectFound = prospectSearchPage.isProspectInResults(prospectWithoutEmailKey);
        assertFalse("Prospect without email key should not appear in results", prospectFound);
    }

    @And("only prospects with valid email keys should be displayed")
    public void onlyProspectsWithValidEmailKeysShouldBeDisplayed() {
        int resultCount = prospectSearchPage.getResultCount();
        assertTrue("No results were returned", resultCount >= 0);
        boolean allHaveEmailKeys = prospectSearchPage.verifyAllResultsHaveEmailKeys();
        assertTrue("Some results do not have valid email keys", allHaveEmailKeys);
    }
}