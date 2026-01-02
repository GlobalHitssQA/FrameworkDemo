package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.LoginPage;
import pages.DatabaseMonitoringPage;
import static org.junit.Assert.*;

public class SalesforceQueryVerificationSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private DatabaseMonitoringPage databaseMonitoringPage;
    
    public SalesforceQueryVerificationSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.databaseMonitoringPage = new DatabaseMonitoringPage(page);
    }
    
    @Given("database query logging is configured and active")
    public void databaseQueryLoggingIsConfiguredAndActive() {
        databaseMonitoringPage.enableQueryLogging();
        assertTrue("Database logging should be active", databaseMonitoringPage.isLoggingActive());
    }
    
    @And("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@test.com", "password123");
        assertTrue("Dashboard should be visible", loginPage.isDashboardVisible());
    }
    
    @When("the advisor accesses the prospect search functionality")
    public void theAdvisorAccessesTheProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search interface should be available", prospectSearchPage.isSearchInterfaceVisible());
    }
    
    @And("the advisor enters search criteria in the search field")
    public void theAdvisorEntersSearchCriteriaInTheSearchField() {
        prospectSearchPage.enterSearchCriteria("john.doe@example.com");
        assertEquals("Search field should contain the entered criteria", 
                     "john.doe@example.com", 
                     prospectSearchPage.getSearchFieldValue());
    }
    
    @And("the advisor clicks the search icon to execute the search")
    public void theAdvisorClicksTheSearchIconToExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("a query should be logged showing execution against Salesforce database")
    public void aQueryShouldBeLoggedShowingExecutionAgainstSalesforceDatabase() {
        page.waitForTimeout(2000);
        assertTrue("Salesforce query should be logged", 
                   databaseMonitoringPage.isSalesforceQueryLogged());
        assertTrue("Query log should contain search criteria", 
                   databaseMonitoringPage.getLastQueryLog().contains("Salesforce"));
    }
    
    @And("the search results should match records from Salesforce database")
    public void theSearchResultsShouldMatchRecordsFromSalesforceDatabase() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        int resultCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("Search results should contain at least one record", resultCount > 0);
        assertTrue("Results should match Salesforce records", 
                   databaseMonitoringPage.validateResultsMatchDatabase(prospectSearchPage.getSearchResultsData()));
    }
}