package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchErrorSteps {

    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private static final String PROSPECT_WITHOUT_EMAIL = "TestProspectNoEmail";

    public ProspectSearchErrorSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as an advisor in Acticenter application")
    public void theUserIsLoggedInAsAnAdvisorInActicenterApplication() {
        // Precondition: User authentication is handled by test setup
        // This step assumes the user session is already established
        assertTrue(prospectSearchPage.isDashboardDisplayed(), "User should be logged in and dashboard visible");
    }

    @Given("the user is on the prospect search screen")
    public void theUserIsOnTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isProspectSearchScreenDisplayed(), "Prospect search screen should be displayed");
    }

    @When("the user enters at least 3 characters to search for a prospect without email")
    public void theUserEntersAtLeast3CharactersToSearchForAProspectWithoutEmail() {
        prospectSearchPage.enterSearchQuery(PROSPECT_WITHOUT_EMAIL);
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search results are displayed successfully")
    public void theSearchResultsAreDisplayedSuccessfully() {
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should be displayed");
    }

    @And("the prospect without email appears in the coincidence list with name visible but no email shown")
    public void theProspectWithoutEmailAppearsInTheCoincidenceListWithNameVisibleButNoEmailShown() {
        assertTrue(prospectSearchPage.isProspectVisibleInResults(PROSPECT_WITHOUT_EMAIL), "Prospect should appear in results");
        assertFalse(prospectSearchPage.isEmailDisplayedForProspect(PROSPECT_WITHOUT_EMAIL), "Email should not be displayed for this prospect");
    }

    @When("the user selects the prospect that has no email address from the results")
    public void theUserSelectsTheProspectThatHasNoEmailAddressFromTheResults() {
        prospectSearchPage.selectProspectByName(PROSPECT_WITHOUT_EMAIL);
    }

    @Then("an error message is displayed indicating the prospect does not have email in Salesforce database")
    public void anErrorMessageIsDisplayedIndicatingTheProspectDoesNotHaveEmailInSalesforceDatabase() {
        assertTrue(prospectSearchPage.isErrorMessageDisplayed(), "Error message should be displayed");
        String errorMessage = prospectSearchPage.getErrorMessageText();
        assertTrue(errorMessage.contains("email") || errorMessage.contains("correo"), 
            "Error message should mention missing email address");
        assertTrue(errorMessage.contains("Salesforce") || errorMessage.contains("base de datos"), 
            "Error message should reference Salesforce database");
    }

    @And("the system remains on the dashboard view without navigating forward")
    public void theSystemRemainsOnTheDashboardViewWithoutNavigatingForward() {
        assertTrue(prospectSearchPage.isDashboardDisplayed(), "System should remain on dashboard view");
        assertFalse(prospectSearchPage.hasNavigatedToProspectDetail(), "System should not navigate to prospect detail");
    }

    @And("the user can select a different prospect or perform a new search")
    public void theUserCanSelectADifferentProspectOrPerformANewSearch() {
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled for new search");
        assertTrue(prospectSearchPage.areSearchResultsClickable(), "Search results should be clickable for different selection");
    }
}