package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchQuery = "John Doe";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.performLogin();
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should be visible after login");
    }

    @When("the advisor accesses the prospect search field")
    public void theAdvisorAccessesTheProspectSearchField() {
        prospectSearchPage.accessProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("the advisor enters valid search criteria with more than 2 characters")
    public void theAdvisorEntersValidSearchCriteriaWithMoreThan2Characters() {
        prospectSearchPage.enterSearchCriteria(searchQuery);
    }

    @When("the system executes the search query")
    public void theSystemExecutesTheSearchQuery() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchExecution();
    }

    @Then("the system should query the Salesforce database")
    public void theSystemShouldQueryTheSalesforceDatabase() {
        boolean salesforceQueryDetected = prospectSearchPage.verifySalesforceConnection();
        assertTrue(salesforceQueryDetected, "System should query Salesforce database");
    }

    @Then("the search results should be retrieved from Salesforce database")
    public void theSearchResultsShouldBeRetrievedFromSalesforceDatabase() {
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed");
        assertTrue(prospectSearchPage.verifyResultsFromSalesforce(), "Results should match Salesforce records");
    }
}