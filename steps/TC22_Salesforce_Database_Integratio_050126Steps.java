package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the Salesforce database connection is established and active")
    public void verifySalesforceConnection() {
        assertTrue(prospectSearchPage.isDatabaseConnectionActive(), "Salesforce DB connection should be active");
    }

    @When("the advisor navigates to the prospect search screen")
    public void navigateToProspectSearch() {
        prospectSearchPage.navigateToSearchScreen();
        assertTrue(prospectSearchPage.isSearchInterfaceVisible(), "Search interface should be accessible");
    }

    @And("the advisor enters valid search criteria")
    public void enterSearchCriteria() {
        prospectSearchPage.enterSearchCriteria("test@example.com");
    }

    @And("the advisor executes the search")
    public void executeSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system queries the Salesforce database for matching prospects")
    public void verifyDatabaseQuery() {
        prospectSearchPage.waitForSearchResults();
        assertTrue(prospectSearchPage.isSearchExecuted(), "Search query should be executed");
    }

    @And("the results are filtered to show only prospects from the advisor's cell or financial center")
    public void verifyResultsFiltering() {
        assertTrue(prospectSearchPage.areResultsFilteredByAdvisorCell(), "Results should be filtered by advisor's cell or financial center");
    }

    @And("prospects without email addresses are excluded from the results")
    public void verifyEmailValidation() {
        assertTrue(prospectSearchPage.allResultsHaveEmail(), "All results should have valid email addresses");
    }

    @And("the database consultation is executed in Salesforce DB successfully")
    public void verifySalesforceDbExecution() {
        assertTrue(prospectSearchPage.isSalesforceDbQuerySuccessful(), "Salesforce DB query should be successful");
    }
}