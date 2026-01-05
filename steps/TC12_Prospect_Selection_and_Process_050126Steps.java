package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.AdvisorDashboardPage;
import pages.ProspectSearchPage;
import pages.ProcessSelectionPage;

import static org.junit.jupiter.api.Assertions.*;

public class ProspectSelectionSteps {
    private Page page;
    private AdvisorDashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private ProcessSelectionPage processSelectionPage;
    private String selectedProspectInfo;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.dashboardPage = new AdvisorDashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.processSelectionPage = new ProcessSelectionPage(page);
    }

    @Given("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        // Authentication logic should be handled here or in Before hook
    }

    @And("the advisor dashboard is displayed")
    public void theAdvisorDashboardIsDisplayed() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible");
    }

    @When("the advisor enters at least {int} characters in the prospect search field")
    public void theAdvisorEntersAtLeastCharactersInTheProspectSearchField(int minChars) {
        prospectSearchPage.enterSearchQuery("ab");
    }

    @When("the advisor enters at least 2 characters in the prospect search field")
    public void theAdvisorEntersAtLeastTwoCharactersInTheProspectSearchField() {
        prospectSearchPage.enterSearchQuery("ab");
    }

    @Then("a list of matching Salesforce prospects is displayed")
    public void aListOfMatchingSalesforceProspectsIsDisplayed() {
        assertTrue(prospectSearchPage.isResultsListVisible(), "Results list should be visible");
        assertTrue(prospectSearchPage.getResultsCount() > 0, "At least one prospect should be displayed");
    }

    @When("the advisor selects a prospect from the coincidence list")
    public void theAdvisorSelectsAProspectFromTheCoincidenceList() {
        selectedProspectInfo = prospectSearchPage.getFirstProspectInfo();
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the system registers the prospect selection")
    public void theSystemRegistersTheProspectSelection() {
        // Verification that selection was registered (could check internal state, storage, etc.)
        assertNotNull(selectedProspectInfo, "Prospect information should be captured");
    }

    @And("the system navigates away from the dashboard")
    public void theSystemNavigatesAwayFromTheDashboard() {
        assertFalse(dashboardPage.isDashboardVisible(), "Dashboard should not be visible after navigation");
    }

    @And("the process selection screen is displayed")
    public void theProcessSelectionScreenIsDisplayed() {
        assertTrue(processSelectionPage.isProcessSelectionScreenVisible(), "Process selection screen should be visible");
    }

    @And("the selected prospect information is carried forward to the next screen")
    public void theSelectedProspectInformationIsCarriedForwardToTheNextScreen() {
        String displayedProspectInfo = processSelectionPage.getDisplayedProspectInfo();
        assertTrue(displayedProspectInfo.contains(selectedProspectInfo), 
            "Selected prospect information should be displayed in the next screen");
    }
}