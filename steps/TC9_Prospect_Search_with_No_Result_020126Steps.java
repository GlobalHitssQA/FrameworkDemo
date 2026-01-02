package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.assertTrue;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in as an advisor on the Acticenter dashboard")
    public void iAmLoggedInAsAnAdvisorOnTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("I access the prospect search functionality")
    public void iAccessTheProspectSearchFunctionality() {
        prospectSearchPage.accessSearchFunctionality();
        assertTrue("Search field should be available", prospectSearchPage.isSearchFieldVisible());
    }

    @When("I enter search criteria that matches no existing prospects")
    public void iEnterSearchCriteriaThatMatchesNoExistingProspects() {
        String nonExistingProspect = "XXXXNONEXISTINGPROSPECT999XXXX";
        prospectSearchPage.enterSearchCriteria(nonExistingProspect);
    }

    @When("I click the search button")
    public void iClickTheSearchButton() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("I should see a message indicating no prospects were found")
    public void iShouldSeeAMessageIndicatingNoProspectsWereFound() {
        assertTrue("No results message should be displayed", prospectSearchPage.isNoResultsMessageVisible());
        String noResultsText = prospectSearchPage.getNoResultsMessageText();
        assertTrue("Message should indicate no results found", 
            noResultsText.toLowerCase().contains("no") && 
            (noResultsText.toLowerCase().contains("found") || 
             noResultsText.toLowerCase().contains("result") ||
             noResultsText.toLowerCase().contains("prospect")));
    }
}