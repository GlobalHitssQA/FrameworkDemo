package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ActicenterDashboardPage;
import pages.PitchbookPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {

    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private PitchbookPage pitchbookPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.pitchbookPage = new PitchbookPage(page);
    }

    @Given("the user is logged in as an advisor with Pitchbook access")
    public void theUserIsLoggedInAsAdvisorWithPitchbookAccess() {
        // Precondition: User authentication handled by test setup
        // This step assumes the user session is already established
        dashboardPage.verifyUserIsLoggedIn();
    }

    @Given("the Salesforce database is accessible")
    public void theSalesforceDatabaseIsAccessible() {
        // Precondition: Salesforce connectivity verified
        // This is typically validated through backend health checks
    }

    @Given("the user is on the Acticenter dashboard")
    public void theUserIsOnTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be displayed", dashboardPage.isDashboardDisplayed());
    }

    @When("the user navigates to the Pitchbook section")
    public void theUserNavigatesToThePitchbookSection() {
        dashboardPage.clickPitchbookMenu();
        pitchbookPage.waitForPageLoad();
    }

    @Then("the prospect search field should be displayed and enabled")
    public void theProspectSearchFieldShouldBeDisplayedAndEnabled() {
        assertTrue("Search field should be visible", pitchbookPage.isProspectSearchFieldVisible());
        assertTrue("Search field should be enabled", pitchbookPage.isProspectSearchFieldEnabled());
    }

    @When("the user types {string} in the prospect search field")
    public void theUserTypesInTheProspectSearchField(String searchText) {
        pitchbookPage.typeInProspectSearchField(searchText);
    }

    @Then("no search results should be displayed")
    public void noSearchResultsShouldBeDisplayed() {
        assertFalse("Search results should not be displayed", pitchbookPage.areSearchResultsDisplayed());
    }

    @When("the user types an additional character {string} in the prospect search field")
    public void theUserTypesAnAdditionalCharacterInTheProspectSearchField(String additionalChar) {
        pitchbookPage.appendToProspectSearchField(additionalChar);
    }

    @Then("the search should be triggered automatically")
    public void theSearchShouldBeTriggeredAutomatically() {
        pitchbookPage.waitForSearchToTrigger();
        assertTrue("Search should be triggered", pitchbookPage.isSearchInProgress() || pitchbookPage.areSearchResultsDisplayed());
    }

    @Then("the search results should display prospect name and email address")
    public void theSearchResultsShouldDisplayProspectNameAndEmailAddress() {
        assertTrue("Search results should be displayed", pitchbookPage.areSearchResultsDisplayed());
        assertTrue("Prospect name should be visible", pitchbookPage.isProspectNameVisibleInResults());
        assertTrue("Prospect email should be visible", pitchbookPage.isProspectEmailVisibleInResults());
    }

    @When("the user clears the search field")
    public void theUserClearsTheSearchField() {
        pitchbookPage.clearProspectSearchField();
    }

    @Then("the search results should display matching prospects from Salesforce")
    public void theSearchResultsShouldDisplayMatchingProspectsFromSalesforce() {
        assertTrue("Search results should be displayed", pitchbookPage.areSearchResultsDisplayed());
        assertTrue("Results should contain matching prospects", pitchbookPage.getSearchResultsCount() > 0);
    }
}