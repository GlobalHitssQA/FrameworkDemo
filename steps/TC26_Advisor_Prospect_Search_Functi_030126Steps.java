package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ActicenterDashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private String searchTerm = "Jo";

    @Given("the advisor user is logged into Acticenter dashboard")
    public void advisorUserIsLoggedIntoActicenterDashboard() {
        dashboardPage = new ActicenterDashboardPage(page);
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be loaded", dashboardPage.isDashboardLoaded());
    }

    @And("the search field is accessible")
    public void searchFieldIsAccessible() {
        assertTrue("Search field should be visible", dashboardPage.isSearchFieldVisible());
    }

    @When("the advisor enters a search term with at least 2 characters")
    public void advisorEntersSearchTermWithAtLeastTwoCharacters() {
        dashboardPage.enterSearchTerm(searchTerm);
    }

    @Then("the search query is sent to Salesforce database")
    public void searchQueryIsSentToSalesforceDatabase() {
        // Verify network request or API call to Salesforce
        assertTrue("Search should trigger Salesforce query", dashboardPage.isSearchExecuted());
    }

    @And("the search is performed within the advisor's assigned prospect list")
    public void searchIsPerformedWithinAdvisorsAssignedProspectList() {
        // Verify search scope is limited to advisor's cell/financial center
        assertTrue("Search should be scoped to advisor's prospects", dashboardPage.isSearchScopedToAdvisor());
    }

    @And("the results include prospect name and electronic email from Salesforce")
    public void resultsIncludeProspectNameAndElectronicEmailFromSalesforce() {
        assertTrue("Results should be visible", dashboardPage.areSearchResultsVisible());
        assertTrue("Results should contain name", dashboardPage.doResultsContainNames());
        assertTrue("Results should contain email", dashboardPage.doResultsContainEmails());
    }

    @And("prospects without electronic email are not presented in results")
    public void prospectsWithoutElectronicEmailAreNotPresentedInResults() {
        // Verify all displayed prospects have valid email
        assertTrue("All results should have email", dashboardPage.doAllResultsHaveEmail());
    }

    @And("the last 5 searches are displayed when typing begins")
    public void lastFiveSearchesAreDisplayedWhenTypingBegins() {
        int searchHistoryCount = dashboardPage.getSearchHistoryCount();
        assertTrue("Search history should show up to 5 items", searchHistoryCount <= 5 && searchHistoryCount >= 0);
    }
}