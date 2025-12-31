package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.ProspectDetailsPage;
import static org.junit.Assert.*;

public class ProspectSelectionSteps {

    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private ProspectDetailsPage prospectDetailsPage;
    private String searchTerm = "Juan";
    private String selectedProspectName;
    private String selectedProspectEmail;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.prospectDetailsPage = new ProspectDetailsPage(page);
    }

    @Given("the advisor is logged into the Actinver application with access to prospect search functionality")
    public void theAdvisorIsLoggedIntoActinverApplication() {
        prospectSearchPage.navigateToApplication();
        assertTrue("User should be logged in", prospectSearchPage.isUserLoggedIn());
    }

    @And("the main dashboard is displayed with the prospect search feature available")
    public void theMainDashboardIsDisplayed() {
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
        assertTrue("Prospect search should be available", prospectSearchPage.isProspectSearchAvailable());
    }

    @When("the advisor enters more than two characters in the prospect search field")
    public void theAdvisorEntersMoreThanTwoCharactersInSearchField() {
        prospectSearchPage.enterSearchTerm(searchTerm);
    }

    @Then("the system displays matching prospects with name and email address information")
    public void theSystemDisplaysMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        assertTrue("Results should contain prospect names", prospectSearchPage.doResultsContainNames());
        assertTrue("Results should contain email addresses", prospectSearchPage.doResultsContainEmails());
    }

    @And("the search results show the first five coincidences and last five searches performed")
    public void theSearchResultsShowCoincidencesAndRecentSearches() {
        assertTrue("Should display up to 5 coincidences", prospectSearchPage.getCoincidencesCount() <= 5);
        assertTrue("Should display recent searches section", prospectSearchPage.isRecentSearchesSectionVisible());
    }

    @And("the prospect names are highlighted where search characters match")
    public void theProspectNamesAreHighlighted() {
        assertTrue("Matching characters should be highlighted", prospectSearchPage.areMatchingCharactersHighlighted(searchTerm));
    }

    @When("the advisor selects a valid prospect with complete information including email address")
    public void theAdvisorSelectsValidProspect() {
        selectedProspectName = prospectSearchPage.getFirstProspectName();
        selectedProspectEmail = prospectSearchPage.getFirstProspectEmail();
        prospectSearchPage.selectFirstProspect();
    }

    @Then("the system validates that all required information is available for the selected prospect")
    public void theSystemValidatesRequiredInformation() {
        assertNotNull("Prospect name should not be null", selectedProspectName);
        assertNotNull("Prospect email should not be null", selectedProspectEmail);
        assertFalse("Prospect name should not be empty", selectedProspectName.isEmpty());
        assertFalse("Prospect email should not be empty", selectedProspectEmail.isEmpty());
    }

    @When("the advisor clicks to proceed with the selected prospect")
    public void theAdvisorClicksToProceed() {
        prospectSearchPage.clickProceedWithProspect();
    }

    @Then("the system navigates to the process continuation flow")
    public void theSystemNavigatesToProcessContinuationFlow() {
        assertTrue("Should navigate to prospect details page", prospectDetailsPage.isPageLoaded());
    }

    @And("the prospect information is correctly displayed on screen")
    public void theProspectInformationIsDisplayed() {
        assertTrue("Prospect name should be displayed", prospectDetailsPage.isProspectNameDisplayed());
        assertTrue("Prospect email should be displayed", prospectDetailsPage.isProspectEmailDisplayed());
        assertEquals("Displayed name should match selected", selectedProspectName, prospectDetailsPage.getDisplayedProspectName());
        assertEquals("Displayed email should match selected", selectedProspectEmail, prospectDetailsPage.getDisplayedProspectEmail());
    }

    @When("the advisor confirms the continuation of the process")
    public void theAdvisorConfirmsContinuation() {
        prospectDetailsPage.clickConfirmContinue();
    }

    @Then("the system proceeds to the next step allowing the advisor to send Pitchbook information")
    public void theSystemProceedsToNextStep() {
        assertTrue("Pitchbook section should be available", prospectDetailsPage.isPitchbookSectionVisible());
        assertTrue("Send Pitchbook button should be enabled", prospectDetailsPage.isSendPitchbookButtonEnabled());
    }
}