package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import pages.DashboardPage;
import pages.NewProspectPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private DashboardPage dashboardPage;
    private NewProspectPage newProspectPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.newProspectPage = new NewProspectPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.performLogin();
    }

    @And("the advisor navigates to the prospect search interface")
    public void theAdvisorNavigatesToProspectSearchInterface() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search page should be visible", prospectSearchPage.isProspectSearchFieldVisible());
    }

    @When("the advisor enters search criteria that returns no matching prospects")
    public void theAdvisorEntersSearchCriteriaThatReturnsNoMatchingProspects() {
        prospectSearchPage.enterSearchCriteria("nonexistent_prospect_12345xyz");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays a message indicating no results found")
    public void theSystemDisplaysMessageIndicatingNoResultsFound() {
        assertTrue("No results message should be visible", prospectSearchPage.isNoResultsMessageVisible());
        String noResultsText = prospectSearchPage.getNoResultsMessageText();
        assertTrue("Message should indicate no prospects found", 
            noResultsText.toLowerCase().contains("no") || 
            noResultsText.toLowerCase().contains("results") ||
            noResultsText.toLowerCase().contains("found"));
    }

    @And("the system remains on the dashboard screen")
    public void theSystemRemainsOnDashboardScreen() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @And("the system displays an option to create a new prospect")
    public void theSystemDisplaysOptionToCreateNewProspect() {
        assertTrue("New prospect link should be visible", prospectSearchPage.isNewProspectLinkVisible());
    }

    @When("the advisor clicks on the new prospect creation option")
    public void theAdvisorClicksOnNewProspectCreationOption() {
        prospectSearchPage.clickNewProspectLink();
    }

    @Then("the system navigates to the new prospect creation screen")
    public void theSystemNavigatesToNewProspectCreationScreen() {
        assertTrue("New prospect creation page should be visible", newProspectPage.isNewProspectFormVisible());
    }
}