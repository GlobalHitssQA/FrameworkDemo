package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ActicenterDashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectEmailValidationSteps {
    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private static final String PROSPECT_WITHOUT_EMAIL = "ProspectoSinCorreo";
    private static final String PROSPECT_WITH_EMAIL = "ProspectoConCorreo";

    public ProspectEmailValidationSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("user is authenticated as an authorized advisor on Acticenter dashboard")
    public void userIsAuthenticatedAsAuthorizedAdvisor() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("user navigates to prospect search functionality")
    public void userNavigatesToProspectSearchFunctionality() {
        dashboardPage.clickProspectSearchMenu();
        assertTrue("Search interface should be displayed", prospectSearchPage.isSearchFieldVisible());
    }

    @And("user enters search criteria for a prospect without electronic email key")
    public void userEntersSearchCriteriaForProspectWithoutEmailKey() {
        prospectSearchPage.enterSearchCriteria(PROSPECT_WITHOUT_EMAIL);
        prospectSearchPage.clickSearchButton();
    }

    @Then("system queries Salesforce database for matching prospects")
    public void systemQueriesSalesforceDatabase() {
        prospectSearchPage.waitForSearchResults();
        assertTrue("Search results should be loaded", prospectSearchPage.areSearchResultsLoaded());
    }

    @And("user attempts to view or select the prospect without electronic email key")
    public void userAttemptsToSelectProspectWithoutEmailKey() {
        prospectSearchPage.selectProspectFromResults(PROSPECT_WITHOUT_EMAIL);
    }

    @Then("an error message is displayed indicating prospect cannot be presented due to missing electronic email key")
    public void errorMessageIsDisplayedForMissingEmailKey() {
        assertTrue("Error message should be visible", prospectSearchPage.isErrorMessageVisible());
        String errorMessage = prospectSearchPage.getErrorMessageText();
        assertTrue("Error message should mention electronic email key", 
            errorMessage.contains("correo electr\u00f3nico") || errorMessage.contains("electronic email") || errorMessage.contains("email key"));
    }

    @And("the prospect without electronic email key is not selectable or marked as invalid")
    public void prospectWithoutEmailKeyIsNotSelectable() {
        assertTrue("Prospect should be marked as invalid or not selectable", 
            prospectSearchPage.isProspectMarkedAsInvalid(PROSPECT_WITHOUT_EMAIL) || 
            !prospectSearchPage.isProspectSelectable(PROSPECT_WITHOUT_EMAIL));
    }

    @And("other prospects with valid electronic email keys are displayed normally")
    public void prospectsWithValidEmailKeysAreDisplayedNormally() {
        assertTrue("Valid prospects should be visible", 
            prospectSearchPage.isProspectVisible(PROSPECT_WITH_EMAIL));
        assertTrue("Valid prospect should have email displayed", 
            prospectSearchPage.isProspectEmailVisible(PROSPECT_WITH_EMAIL));
        assertTrue("Valid prospect should be selectable", 
            prospectSearchPage.isProspectSelectable(PROSPECT_WITH_EMAIL));
    }
}