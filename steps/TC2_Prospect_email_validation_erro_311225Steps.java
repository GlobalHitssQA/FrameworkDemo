package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ActicenterProspectSearchPage;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

public class ProspectEmailValidationSteps {

    private Page page;
    private ActicenterProspectSearchPage prospectSearchPage;

    public ProspectEmailValidationSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ActicenterProspectSearchPage(page);
    }

    @Given("the user is logged in as an advisor on Acticenter platform")
    public void theUserIsLoggedInAsAdvisorOnActicenterPlatform() {
        prospectSearchPage.navigateToActicenter();
        assertTrue("Dashboard should be displayed", prospectSearchPage.isDashboardDisplayed());
    }

    @And("the user navigates to the Pitchbook section")
    public void theUserNavigatesToPitchbookSection() {
        prospectSearchPage.navigateToPitchbookSection();
    }

    @When("the user locates the prospect search field")
    public void theUserLocatesProspectSearchField() {
        assertTrue("Search field should be visible and enabled", 
            prospectSearchPage.isProspectSearchFieldDisplayed());
    }

    @And("the user enters more than 2 characters to search for a prospect without email")
    public void theUserEntersSearchTermForProspectWithoutEmail() {
        String prospectNameWithoutEmail = "ProspectoSinCorreo";
        prospectSearchPage.searchForProspect(prospectNameWithoutEmail);
        assertTrue("Search results should be displayed", 
            prospectSearchPage.areSearchResultsDisplayed());
    }

    @And("the user selects the prospect without email from the search results")
    public void theUserSelectsProspectWithoutEmailFromResults() {
        prospectSearchPage.selectProspectFromResults(0);
    }

    @Then("the system displays an error message indicating missing email address")
    public void theSystemDisplaysErrorMessageForMissingEmail() {
        assertTrue("Error message should be displayed", 
            prospectSearchPage.isEmailErrorMessageDisplayed());
        String errorMessage = prospectSearchPage.getEmailErrorMessageText();
        assertTrue("Error message should indicate missing email", 
            errorMessage.contains("correo") || errorMessage.contains("email"));
    }

    @And("the user cannot proceed with the Pitchbook sending process")
    public void theUserCannotProceedWithPitchbookProcess() {
        assertFalse("Proceed button should be disabled", 
            prospectSearchPage.isProceedButtonEnabled());
    }
}