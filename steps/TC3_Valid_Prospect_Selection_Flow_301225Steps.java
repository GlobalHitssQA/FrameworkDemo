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
    private String selectedProspectName;
    private String selectedProspectEmail;

    public ProspectSelectionSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.prospectDetailsPage = new ProspectDetailsPage(page);
    }

    @Given("the user is logged in as advisor in Acticenter application")
    public void theUserIsLoggedInAsAdvisorInActicenterApplication() {
        prospectSearchPage.navigateToApplication();
        assertTrue("User should be logged in as advisor", prospectSearchPage.isAdvisorDashboardDisplayed());
    }

    @Given("the Salesforce database is accessible with established connectivity")
    public void theSalesforceDatabaseIsAccessibleWithEstablishedConnectivity() {
        assertTrue("Salesforce connectivity should be established", prospectSearchPage.isSalesforceConnected());
    }

    @When("the user navigates to the prospect search screen")
    public void theUserNavigatesToTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Then("the prospect search screen is displayed with search functionality available")
    public void theProspectSearchScreenIsDisplayedWithSearchFunctionalityAvailable() {
        assertTrue("Search screen should be displayed", prospectSearchPage.isSearchScreenDisplayed());
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search button should be visible", prospectSearchPage.isSearchButtonVisible());
    }

    @When("the user enters at least 3 characters matching an existing prospect with valid email")
    public void theUserEntersAtLeast3CharactersMatchingAnExistingProspectWithValidEmail() {
        String searchTerm = "Test";
        prospectSearchPage.enterSearchTerm(searchTerm);
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search is triggered and matching results are displayed in the coincidence list")
    public void theSearchIsTriggeredAndMatchingResultsAreDisplayedInTheCoincidenceList() {
        prospectSearchPage.waitForSearchResults();
        assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
        assertTrue("At least one result should be present", prospectSearchPage.getSearchResultsCount() > 0);
    }

    @Then("the coincidence list displays prospects with both name and email fields populated")
    public void theCoincidenceListDisplaysProspectsWithBothNameAndEmailFieldsPopulated() {
        assertTrue("Prospect names should be visible in results", prospectSearchPage.areProspectNamesVisible());
        assertTrue("Prospect emails should be visible in results", prospectSearchPage.areProspectEmailsVisible());
    }

    @When("the user selects a valid prospect from the coincidence list that has an email address")
    public void theUserSelectsAValidProspectFromTheCoincidenceListThatHasAnEmailAddress() {
        selectedProspectName = prospectSearchPage.getFirstProspectName();
        selectedProspectEmail = prospectSearchPage.getFirstProspectEmail();
        prospectSearchPage.selectFirstProspectWithEmail();
    }

    @Then("the prospect is highlighted as selected in the interface")
    public void theProspectIsHighlightedAsSelectedInTheInterface() {
        assertTrue("Selected prospect should be highlighted", prospectSearchPage.isProspectSelected());
    }

    @When("the user clicks the continue button to proceed with the selected prospect")
    public void theUserClicksTheContinueButtonToProceedWithTheSelectedProspect() {
        prospectSearchPage.clickContinueButton();
    }

    @Then("the system validates the selected prospect has required data including email address")
    public void theSystemValidatesTheSelectedProspectHasRequiredDataIncludingEmailAddress() {
        assertFalse("No validation error should be displayed", prospectSearchPage.isValidationErrorDisplayed());
    }

    @Then("the application navigates to the next screen in the process flow")
    public void theApplicationNavigatesToTheNextScreenInTheProcessFlow() {
        prospectDetailsPage.waitForPageLoad();
        assertTrue("Next screen should be displayed", prospectDetailsPage.isPageDisplayed());
    }

    @Then("the prospect name and email are correctly displayed in the subsequent screen")
    public void theProspectNameAndEmailAreCorrectlyDisplayedInTheSubsequentScreen() {
        String displayedName = prospectDetailsPage.getProspectName();
        String displayedEmail = prospectDetailsPage.getProspectEmail();
        assertEquals("Prospect name should match", selectedProspectName, displayedName);
        assertEquals("Prospect email should match", selectedProspectEmail, displayedEmail);
    }
}