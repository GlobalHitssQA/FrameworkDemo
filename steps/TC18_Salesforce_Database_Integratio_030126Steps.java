package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class SalesforceIntegrationSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private DashboardPage dashboardPage;
    private String expectedProspectName;
    private String expectedProspectEmail;
    private String expectedProspectAssignment;
    private String searchResultName;
    private String searchResultEmail;
    private String searchResultAssignment;

    public SalesforceIntegrationSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    @Given("Salesforce database connectivity is established for test environment")
    public void salesforceDatabaseConnectivityIsEstablished() {
        // Verify connection status through application health endpoint or UI indicator
        assertTrue("Salesforce connection should be active", 
            prospectSearchPage.isSalesforceConnectionActive());
    }

    @And("test prospect records exist in Salesforce with known attributes")
    public void testProspectRecordsExistInSalesforce() {
        // Set expected test data from Salesforce test records
        this.expectedProspectName = "John Smith Test";
        this.expectedProspectEmail = "john.smith.test@example.com";
        this.expectedProspectAssignment = "Financial Center A";
    }

    @When("I search for a known test prospect in Acticenter")
    public void searchForKnownTestProspect() {
        prospectSearchPage.navigateToProspectSearch();
        prospectSearchPage.enterSearchQuery(expectedProspectName);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results should match Salesforce records exactly")
    public void searchResultsShouldMatchSalesforceRecords() {
        assertTrue("Search results should be displayed", 
            prospectSearchPage.areSearchResultsVisible());
        int resultCount = prospectSearchPage.getSearchResultCount();
        assertTrue("At least one result should be returned", resultCount > 0);
    }

    @And("prospect name should match Salesforce data")
    public void prospectNameShouldMatchSalesforceData() {
        searchResultName = prospectSearchPage.getFirstResultName();
        assertEquals("Prospect name should match Salesforce record", 
            expectedProspectName, searchResultName);
    }

    @And("prospect email should match Salesforce data")
    public void prospectEmailShouldMatchSalesforceData() {
        searchResultEmail = prospectSearchPage.getFirstResultEmail();
        assertEquals("Prospect email should match Salesforce record", 
            expectedProspectEmail, searchResultEmail);
    }

    @And("prospect assignment should match Salesforce data")
    public void prospectAssignmentShouldMatchSalesforceData() {
        searchResultAssignment = prospectSearchPage.getFirstResultAssignment();
        assertEquals("Prospect assignment should match Salesforce record", 
            expectedProspectAssignment, searchResultAssignment);
    }

    @When("I update prospect information in Salesforce")
    public void updateProspectInformationInSalesforce() {
        // Simulate Salesforce update (in real scenario, this would update via API or direct DB)
        this.expectedProspectEmail = "john.smith.updated@example.com";
    }

    @And("I re-run the search in Acticenter")
    public void reRunSearchInActicenter() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchQuery(expectedProspectName);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the updated information should be reflected in search results")
    public void updatedInformationShouldBeReflected() {
        String updatedEmail = prospectSearchPage.getFirstResultEmail();
        assertEquals("Updated email should be reflected in search results", 
            expectedProspectEmail, updatedEmail);
    }

    @When("Salesforce database connection is unavailable")
    public void salesforceDatabaseConnectionIsUnavailable() {
        // Simulate connection failure (in real scenario, this would disable connection or use mock)
        // This step assumes test environment capability to simulate connection failure
    }

    @And("I attempt to search for a prospect")
    public void attemptToSearchForProspect() {
        prospectSearchPage.navigateToProspectSearch();
        prospectSearchPage.enterSearchQuery("Test Prospect");
        prospectSearchPage.clickSearchButton();
    }

    @Then("an appropriate error message should be displayed indicating database connection issue")
    public void appropriateErrorMessageShouldBeDisplayed() {
        assertTrue("Error message should be visible", 
            prospectSearchPage.isErrorMessageVisible());
        String errorMessage = prospectSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate database connection issue", 
            errorMessage.toLowerCase().contains("database") || 
            errorMessage.toLowerCase().contains("connection") ||
            errorMessage.toLowerCase().contains("salesforce"));
    }
}