package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ActicenterDashboardPage;
import pages.PitchbookProspectSearchPage;
import static org.junit.Assert.*;

public class SalesforceProspectSelectionSteps {

    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private PitchbookProspectSearchPage prospectSearchPage;
    private static final String SEARCH_TERM = "John";

    public SalesforceProspectSelectionSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.prospectSearchPage = new PitchbookProspectSearchPage(page);
    }

    @Given("I am logged in as an advisor user on Acticenter platform")
    public void iAmLoggedInAsAdvisorUser() {
        dashboardPage.navigateToActicenter();
        dashboardPage.loginAsAdvisor();
    }

    @And("I can see the Acticenter dashboard")
    public void iCanSeeActicenterDashboard() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("I navigate to the prospect search field in Pitchbook section")
    public void iNavigateToProspectSearchField() {
        dashboardPage.navigateToPitchbookSection();
    }

    @Then("the search field should be displayed and enabled")
    public void searchFieldShouldBeDisplayedAndEnabled() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }

    @When("I type more than 2 characters in the prospect search field")
    public void iTypeMoreThan2CharactersInSearchField() {
        prospectSearchPage.enterSearchTerm(SEARCH_TERM);
    }

    @Then("the search results should display matching prospects from Salesforce")
    public void searchResultsShouldDisplayMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("At least one result should be displayed", prospectSearchPage.getSearchResultsCount() > 0);
    }

    @And("each result should show prospect name and email address")
    public void eachResultShouldShowNameAndEmail() {
        assertTrue("All results should display prospect name", prospectSearchPage.allResultsHaveProspectName());
        assertTrue("All results should display email address", prospectSearchPage.allResultsHaveEmailAddress());
    }

    @When("I select a valid prospect with email from the search results")
    public void iSelectValidProspectWithEmail() {
        prospectSearchPage.selectFirstProspectWithEmail();
    }

    @Then("the system should capture the selected prospect information")
    public void systemShouldCaptureSelectedProspectInfo() {
        assertNotNull("Selected prospect name should be captured", prospectSearchPage.getSelectedProspectName());
        assertNotNull("Selected prospect email should be captured", prospectSearchPage.getSelectedProspectEmail());
    }

    @And("the process flow should continue successfully")
    public void processFlowShouldContinueSuccessfully() {
        assertTrue("Process should continue to next step", prospectSearchPage.isPitchbookProcessFlowActive());
        assertFalse("No error messages should be displayed", prospectSearchPage.hasErrorMessage());
    }

    @And("the selected prospect details should be visible for confirmation")
    public void selectedProspectDetailsShouldBeVisible() {
        assertTrue("Confirmation section should be visible", prospectSearchPage.isConfirmationSectionVisible());
        assertTrue("Selected prospect name should be displayed", prospectSearchPage.isSelectedProspectNameDisplayed());
        assertTrue("Selected prospect email should be displayed", prospectSearchPage.isSelectedProspectEmailDisplayed());
    }
}