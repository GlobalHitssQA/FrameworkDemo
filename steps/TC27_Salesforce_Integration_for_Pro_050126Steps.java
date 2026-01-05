package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ActicenterDashboardPage;
import static org.junit.Assert.*;

public class SalesforceIntegrationSteps {
    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private String prospectName;
    private String prospectEmail;

    public SalesforceIntegrationSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
    }

    @Given("the user accesses the Acticenter dashboard")
    public void theUserAccessesTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
    }

    @And("the connection to Salesforce database is active")
    public void theConnectionToSalesforceDatabaseIsActive() {
        assertTrue("Salesforce connection is not active", dashboardPage.isSalesforceConnectionActive());
    }

    @When("the user performs a prospect search using valid criteria")
    public void theUserPerformsProspectSearchUsingValidCriteria() {
        dashboardPage.enterSearchCriteria("John Doe");
        dashboardPage.clickSearchButton();
    }

    @Then("the system retrieves matching prospect records from Salesforce")
    public void theSystemRetrievesMatchingProspectRecordsFromSalesforce() {
        assertTrue("Search results are not displayed", dashboardPage.areSearchResultsDisplayed());
        assertTrue("No prospect records found", dashboardPage.getSearchResultsCount() > 0);
    }

    @And("the displayed prospect information matches Salesforce data")
    public void theDisplayedProspectInformationMatchesSalesforceData() {
        prospectName = dashboardPage.getFirstProspectName();
        prospectEmail = dashboardPage.getFirstProspectEmail();
        assertNotNull("Prospect name is null", prospectName);
        assertNotNull("Prospect email is null", prospectEmail);
        assertTrue("Prospect name is empty", !prospectName.isEmpty());
        assertTrue("Prospect email is invalid", prospectEmail.contains("@"));
    }

    @When("the user searches for a prospect without an electronic email key")
    public void theUserSearchesForProspectWithoutElectronicEmailKey() {
        dashboardPage.clearSearch();
        dashboardPage.enterSearchCriteria("Prospect Without Email");
        dashboardPage.clickSearchButton();
    }

    @Then("the system displays a message indicating the prospect cannot be presented")
    public void theSystemDisplaysMessageIndicatingProspectCannotBePresented() {
        assertTrue("Missing email message not displayed", dashboardPage.isMissingEmailMessageDisplayed());
        String message = dashboardPage.getMissingEmailMessageText();
        assertTrue("Message does not indicate missing email", message.toLowerCase().contains("email"));
    }

    @When("the user performs a search with no matching results")
    public void theUserPerformsSearchWithNoMatchingResults() {
        dashboardPage.clearSearch();
        dashboardPage.enterSearchCriteria("NonExistentProspect12345XYZ");
        dashboardPage.clickSearchButton();
    }

    @Then("the system displays a no results message")
    public void theSystemDisplaysNoResultsMessage() {
        assertTrue("No results message not displayed", dashboardPage.isNoResultsMessageDisplayed());
    }

    @When("the user selects a prospect from the search results")
    public void theUserSelectsProspectFromSearchResults() {
        dashboardPage.clearSearch();
        dashboardPage.enterSearchCriteria("John Doe");
        dashboardPage.clickSearchButton();
        dashboardPage.selectFirstProspect();
    }

    @Then("the system navigates to the process selection screen")
    public void theSystemNavigatesToProcessSelectionScreen() {
        assertTrue("Not navigated to process selection screen", dashboardPage.isOnProcessSelectionScreen());
    }

    @And("the prospect context from Salesforce is maintained")
    public void theProspectContextFromSalesforceIsMaintained() {
        assertTrue("Prospect context not maintained", dashboardPage.isProspectContextMaintained());
    }

    @When("no prospect is selected")
    public void noProspectIsSelected() {
        dashboardPage.navigateToDashboard();
    }

    @Then("the dashboard remains accessible")
    public void theDashboardRemainsAccessible() {
        assertTrue("Dashboard is not accessible", dashboardPage.isDashboardVisible());
    }

    @And("the option to create a new prospect is available")
    public void theOptionToCreateNewProspectIsAvailable() {
        assertTrue("Create new prospect option not available", dashboardPage.isCreateNewProspectButtonVisible());
    }
}