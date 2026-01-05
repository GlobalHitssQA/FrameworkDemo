package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.DashboardPage;
import static org.junit.Assert.*;

public class ProspectSelectionSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private DashboardPage dashboardPage;
    private String selectedProspectName;
    private String selectedProspectEmail;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    @Given("the user has accessed Acticenter and performed a prospect search")
    public void userAccessedActicenterAndPerformedSearch() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.performSearch("test prospect");
    }

    @And("search results are displayed with prospect information")
    public void searchResultsAreDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("At least one prospect should be displayed", prospectSearchPage.getResultsCount() > 0);
    }

    @When("the user selects a prospect from Salesforce search results by clicking on entry")
    public void userSelectsProspectFromSearchResults() {
        selectedProspectName = prospectSearchPage.getFirstProspectName();
        selectedProspectEmail = prospectSearchPage.getFirstProspectEmail();
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the system should capture prospect selection")
    public void systemCapturesProspectSelection() {
        assertTrue("Prospect selection should be captured", prospectSearchPage.isProspectSelected());
    }

    @And("the system should continue to AGAS-46 process selection functionality")
    public void systemContinuesToProcessSelection() {
        assertTrue("Should navigate to process selection", prospectSearchPage.isOnProcessSelectionPage());
        assertTrue("AGAS-46 reference should be present", prospectSearchPage.hasAGAS46Reference());
    }

    @And("the selected prospect data including name and email should be passed correctly")
    public void selectedProspectDataPassedCorrectly() {
        String displayedName = prospectSearchPage.getSelectedProspectName();
        String displayedEmail = prospectSearchPage.getSelectedProspectEmail();
        assertEquals("Prospect name should match", selectedProspectName, displayedName);
        assertEquals("Prospect email should match", selectedProspectEmail, displayedEmail);
    }

    @When("no selection is made")
    public void noSelectionIsMade() {
        dashboardPage.navigateToDashboard();
        prospectSearchPage.performSearch("test prospect");
    }

    @Then("the system should remain in dashboard without navigation")
    public void systemRemainsInDashboard() {
        assertTrue("Should remain in dashboard", dashboardPage.isOnDashboard());
        assertFalse("Should not navigate to process selection", prospectSearchPage.isOnProcessSelectionPage());
    }

    @When("a valid selection is confirmed")
    public void validSelectionIsConfirmed() {
        prospectSearchPage.selectFirstProspect();
        prospectSearchPage.confirmSelection();
    }

    @Then("the redirection should follow specified process flow to AGAS-43")
    public void redirectionFollowsProcessFlowToAGAS43() {
        assertTrue("Should navigate to AGAS-43 flow", prospectSearchPage.hasAGAS43Reference());
        assertTrue("Process flow should be active", prospectSearchPage.isProcessFlowActive());
    }
}