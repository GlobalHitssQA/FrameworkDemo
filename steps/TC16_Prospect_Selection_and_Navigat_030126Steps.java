package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import pages.ProspectSelectionPage;

import static org.junit.jupiter.api.Assertions.*;

public class ProspectSelectionSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private ProspectSelectionPage prospectSelectionPage;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.prospectSelectionPage = new ProspectSelectionPage(page);
    }

    @Given("the advisor user is logged into the Acticenter dashboard")
    public void theAdvisorUserIsLoggedIntoTheActicenterDashboard() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue(dashboardPage.isDashboardDisplayed(), "Dashboard should be displayed");
    }

    @When("the advisor navigates to the prospect search functionality")
    public void theAdvisorNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchScreenDisplayed(), "Search screen should be displayed");
    }

    @And("the advisor enters a search term and waits for results")
    public void theAdvisorEntersASearchTermAndWaitsForResults() {
        prospectSearchPage.enterSearchTerm("test prospect");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForResults();
        assertTrue(prospectSearchPage.areResultsDisplayed(), "Search results should be displayed");
    }

    @And("the advisor selects a prospect from the Salesforce search results")
    public void theAdvisorSelectsAProspectFromTheSalesforceSearchResults() {
        prospectSearchPage.selectFirstProspect();
        assertTrue(prospectSelectionPage.isProspectSelected(), "Prospect should be selected");
    }

    @Then("the system should continue with the selection process")
    public void theSystemShouldContinueWithTheSelectionProcess() {
        assertTrue(prospectSelectionPage.isSelectionProcessActive(), "Selection process should be active");
    }

    @And("the system should navigate to AGAS-43 flow")
    public void theSystemShouldNavigateToAGAS43Flow() {
        assertTrue(prospectSelectionPage.isAGAS43FlowActive(), "AGAS-43 flow should be active");
    }

    @And("the user should be redirected to the new prospect creation function AGAS-46")
    public void theUserShouldBeRedirectedToTheNewProspectCreationFunctionAGAS46() {
        prospectSelectionPage.waitForRedirection();
        String currentUrl = page.url();
        assertTrue(currentUrl.contains("AGAS-46") || currentUrl.contains("actinver.atlassian.net/browse/AGAS-46"),
                "User should be redirected to AGAS-46");
    }
}