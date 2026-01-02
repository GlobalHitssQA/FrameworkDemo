package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
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

    @Given("I am logged in as an advisor on the Acticenter dashboard")
    public void iAmLoggedInAsAnAdvisorOnTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be displayed successfully");
    }

    @When("I access the prospect search functionality")
    public void iAccessTheProspectSearchFunctionality() {
        prospectSearchPage.accessSearchFunctionality();
        assertTrue(prospectSearchPage.isSearchFieldAvailable(), "Search field should be available");
    }

    @And("I enter valid search criteria for existing prospects")
    public void iEnterValidSearchCriteriaForExistingProspects() {
        prospectSearchPage.enterSearchCriteria("Juan Perez");
    }

    @And("I click the search icon to execute the search")
    public void iClickTheSearchIconToExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results should display matching prospects with name and email")
    public void theSearchResultsShouldDisplayMatchingProspectsWithNameAndEmail() {
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be displayed");
        assertTrue(prospectSearchPage.getResultsCount() > 0, "At least one prospect should be found");
    }

    @And("the first 5 matching prospects should be visible")
    public void theFirstFiveMatchingProspectsShouldBeVisible() {
        int displayedResults = prospectSearchPage.getDisplayedResultsCount();
        assertTrue(displayedResults <= 5, "No more than 5 results should be initially displayed");
        assertTrue(displayedResults > 0, "At least one result should be displayed");
    }

    @And("prospect names and emails should be highlighted where matches occur")
    public void prospectNamesAndEmailsShouldBeHighlightedWhereMatchesOccur() {
        assertTrue(prospectSearchPage.areMatchesHighlighted(), "Matches should be highlighted in results");
    }

    @When("I click on a specific prospect from the search results")
    public void iClickOnASpecificProspectFromTheSearchResults() {
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the selected prospect should be highlighted")
    public void theSelectedProspectShouldBeHighlighted() {
        assertTrue(prospectSearchPage.isProspectSelected(), "Selected prospect should be highlighted");
    }

    @And("the system should proceed to the AGAS-43 workflow process")
    public void theSystemShouldProceedToTheAGASWorkflowProcess() {
        assertTrue(prospectSearchPage.isWorkflowContinued(), "System should proceed to AGAS-43 workflow");
    }
}