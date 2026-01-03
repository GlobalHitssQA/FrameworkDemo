package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class SalesforceSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    
    public SalesforceSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }
    
    @Given("the advisor user has accessed the Acticenter dashboard")
    public void theAdvisorUserHasAccessedTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardDisplayed());
    }
    
    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue("Search screen should be visible", prospectSearchPage.isSearchScreenDisplayed());
    }
    
    @And("the advisor enters a search term with at least 2 characters")
    public void theAdvisorEntersASearchTermWithAtLeast2Characters() {
        prospectSearchPage.enterSearchTerm("Jo");
    }
    
    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }
    
    @Then("the search should be performed in Salesforce database")
    public void theSearchShouldBePerformedInSalesforceDatabase() {
        assertTrue("Search should query Salesforce database", 
            prospectSearchPage.verifySalesforceQueryExecution());
    }
    
    @And("the search results should include prospects from advisor's list or same financial center")
    public void theSearchResultsShouldIncludeProspectsFromAdvisorsListOrSameFinancialCenter() {
        assertTrue("Results should be displayed", prospectSearchPage.areResultsDisplayed());
        assertTrue("Results should be from advisor's scope", 
            prospectSearchPage.verifyResultsFromAdvisorScope());
    }
    
    @And("only prospects belonging to advisor's Salesforce list are returned")
    public void onlyProspectsBelongingToAdvisorsSalesforceListAreReturned() {
        assertTrue("All results should belong to advisor's Salesforce list", 
            prospectSearchPage.verifyAllResultsFromSalesforceList());
    }
}