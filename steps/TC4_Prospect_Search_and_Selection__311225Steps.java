package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {

    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String selectedProspectName;
    private String selectedProspectEmail;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as an advisor with access to Salesforce database")
    public void theUserIsLoggedInAsAdvisorWithSalesforceAccess() {
        // Precondition: User is already authenticated as advisor
        // This step assumes login has been completed in a previous scenario or hook
        assertTrue(prospectSearchPage.isAdvisorDashboardVisible(), 
            "Advisor should be logged in and dashboard should be visible");
    }

    @And("the user accesses the prospect search functionality in Acticenter")
    public void theUserAccessesProspectSearchFunctionality() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Then("the prospect search screen is displayed with the search field enabled")
    public void theProspectSearchScreenIsDisplayedWithSearchFieldEnabled() {
        assertTrue(prospectSearchPage.isSearchScreenDisplayed(), 
            "Prospect search screen should be displayed");
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), 
            "Search field should be enabled");
    }

    @When("the user enters a search term with more than 2 characters")
    public void theUserEntersSearchTermWithMoreThan2Characters() {
        String searchTerm = "Juan"; // Example search term with more than 2 characters
        prospectSearchPage.enterSearchTerm(searchTerm);
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays the first 5 matching prospects from Salesforce")
    public void theSystemDisplaysFirst5MatchingProspects() {
        prospectSearchPage.waitForSearchResults();
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue(resultsCount > 0 && resultsCount <= 5, 
            "System should display up to 5 matching prospects");
    }

    @And("the prospect information displays name and email address")
    public void theProspectInformationDisplaysNameAndEmail() {
        assertTrue(prospectSearchPage.isProspectNameDisplayed(0), 
            "Prospect name should be displayed");
        assertTrue(prospectSearchPage.isProspectEmailDisplayed(0), 
            "Prospect email should be displayed");
    }

    @When("the user selects a valid prospect with an email address from the results")
    public void theUserSelectsValidProspectWithEmail() {
        int prospectIndex = prospectSearchPage.findProspectWithEmail();
        assertTrue(prospectIndex >= 0, 
            "At least one prospect with email should exist");
        selectedProspectName = prospectSearchPage.getProspectName(prospectIndex);
        selectedProspectEmail = prospectSearchPage.getProspectEmail(prospectIndex);
        prospectSearchPage.selectProspect(prospectIndex);
    }

    @Then("the system highlights the selected prospect")
    public void theSystemHighlightsSelectedProspect() {
        assertTrue(prospectSearchPage.isProspectSelected(), 
            "Selected prospect should be highlighted");
    }

    @When("the user confirms the selection to continue with the process")
    public void theUserConfirmsSelectionToContinue() {
        prospectSearchPage.clickConfirmSelectionButton();
    }

    @Then("the system navigates to the next screen in the business flow")
    public void theSystemNavigatesToNextScreen() {
        prospectSearchPage.waitForNavigation();
        assertTrue(prospectSearchPage.isNextScreenDisplayed(), 
            "System should navigate to next screen in business flow");
    }

    @And("the selected prospect information is carried forward to the next step")
    public void theSelectedProspectInfoIsCarriedForward() {
        String displayedName = prospectSearchPage.getSelectedProspectNameOnNextScreen();
        String displayedEmail = prospectSearchPage.getSelectedProspectEmailOnNextScreen();
        assertEquals(selectedProspectName, displayedName, 
            "Prospect name should be carried forward");
        assertEquals(selectedProspectEmail, displayedEmail, 
            "Prospect email should be carried forward");
    }
}