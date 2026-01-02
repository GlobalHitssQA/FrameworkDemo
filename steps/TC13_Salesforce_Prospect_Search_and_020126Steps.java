package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ActicenterDashboardPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    
    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("I am on the Acticenter dashboard as an advisor")
    public void iAmOnTheActicenterDashboardAsAnAdvisor() {
        dashboardPage.navigateToDashboard();
        assertTrue(dashboardPage.isDashboardDisplayed(), "Dashboard should be displayed");
    }
    
    @When("I access the prospect search functionality")
    public void iAccessTheProspectSearchFunctionality() {
        dashboardPage.clickProspectSearchButton();
        assertTrue(prospectSearchPage.isSearchInterfaceAvailable(), "Search interface should be available");
    }
    
    @And("I enter search criteria for an existing Salesforce prospect")
    public void iEnterSearchCriteriaForAnExistingSalesforceProspect() {
        prospectSearchPage.enterProspectSearchCriteria("Test Prospect");
    }
    
    @And("I click the search icon to execute the search")
    public void iClickTheSearchIconToExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }
    
    @Then("search results display prospects from Salesforce database")
    public void searchResultsDisplayProspectsFromSalesforceDatabase() {
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should be displayed");
        assertTrue(prospectSearchPage.getSearchResultsCount() > 0, "Search results should contain at least one prospect");
    }
    
    @When("I select a specific Salesforce prospect from the results")
    public void iSelectASpecificSalesforceProspectFromTheResults() {
        prospectSearchPage.selectFirstProspectFromResults();
    }
    
    @Then("the prospect is selected and highlighted")
    public void theProspectIsSelectedAndHighlighted() {
        assertTrue(prospectSearchPage.isProspectSelected(), "Prospect should be selected and highlighted");
    }
    
    @And("the system navigates to the process flow defined in AGAS-43")
    public void theSystemNavigatesToTheProcessFlowDefinedInAGAS43() {
        assertTrue(prospectSearchPage.isProcessFlowTriggered(), "Process flow AGAS-43 should be triggered");
    }
    
    @And("the process continues successfully without errors")
    public void theProcessContinuesSuccessfullyWithoutErrors() {
        assertFalse(prospectSearchPage.hasErrors(), "No errors should be present");
        assertTrue(prospectSearchPage.isProcessContinuing(), "Process should continue successfully");
    }
}