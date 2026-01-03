package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged into Acticenter as an authenticated advisor")
    public void iAmLoggedIntoActicenterAsAuthenticatedAdvisor() {
        page.navigate("https://actinver.atlassian.net");
        // Authentication logic should be handled in hooks or separate login steps
    }

    @And("the main dashboard is accessible")
    public void theMainDashboardIsAccessible() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
    }

    @And("I enter a valid search term with at least 2 characters")
    public void iEnterValidSearchTermWithAtLeastTwoCharacters() {
        prospectSearchPage.enterSearchTerm("John");
    }

    @And("I trigger the search")
    public void iTriggerTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system should process the search and return matching results")
    public void theSystemShouldProcessSearchAndReturnMatchingResults() {
        prospectSearchPage.waitForSearchResults();
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
    }

    @And("each prospect entry should clearly display the prospect name field")
    public void eachProspectEntryShouldClearlyDisplayProspectNameField() {
        assertTrue("Prospect names should be displayed", prospectSearchPage.areProspectNamesDisplayed());
    }

    @And("the prospect name should be visible and properly formatted for each result")
    public void theProspectNameShouldBeVisibleAndProperlyFormattedForEachResult() {
        assertTrue("All prospect names should be visible and non-empty", prospectSearchPage.validateProspectNamesFormatting());
    }
}