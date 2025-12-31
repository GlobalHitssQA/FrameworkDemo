package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.AdvisorDashboardPage;
import static org.junit.Assert.*;

public class ProspectEmailValidationSteps {

    private Page page;
    private AdvisorDashboardPage dashboardPage;

    public ProspectEmailValidationSteps(Page page) {
        this.page = page;
        this.dashboardPage = new AdvisorDashboardPage(page);
    }

    @Given("the user is logged in as an advisor with access to Actinver application")
    public void theUserIsLoggedInAsAdvisor() {
        dashboardPage.navigateToApplication();
        assertTrue("User should be logged in", dashboardPage.isUserLoggedIn());
    }

    @Given("the main dashboard is displayed with prospect search functionality available")
    public void theMainDashboardIsDisplayed() {
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
        assertTrue("Prospect search should be available", dashboardPage.isProspectSearchAvailable());
    }

    @When("the user enters more than 2 characters in the prospect search field")
    public void theUserEntersSearchCriteria() {
        dashboardPage.enterProspectSearchText("test");
    }

    @Then("the system displays a list of matching prospects from Salesforce")
    public void theSystemDisplaysMatchingProspects() {
        assertTrue("Prospect results should be visible", dashboardPage.areProspectResultsVisible());
    }

    @When("the user selects a prospect that does not have an email address registered")
    public void theUserSelectsProspectWithoutEmail() {
        dashboardPage.selectProspectWithoutEmail();
    }

    @And("the user attempts to proceed with the selected prospect")
    public void theUserAttemptsToProceed() {
        dashboardPage.clickProceedButton();
    }

    @Then("the system displays an error message indicating the prospect lacks an email address")
    public void theSystemDisplaysEmailErrorMessage() {
        assertTrue("Error message should be visible", dashboardPage.isErrorMessageVisible());
        assertTrue("Error should mention missing email", 
            dashboardPage.getErrorMessageText().toLowerCase().contains("email"));
    }

    @And("the error message clearly states the prospect cannot be processed due to missing email in Salesforce")
    public void theErrorMessageIsClearAndInformative() {
        String errorText = dashboardPage.getErrorMessageText();
        assertTrue("Error should mention Salesforce", 
            errorText.toLowerCase().contains("salesforce"));
        assertTrue("Error should indicate prospect cannot be processed", 
            errorText.toLowerCase().contains("cannot") || errorText.toLowerCase().contains("no se puede"));
    }

    @And("the system remains on the dashboard view")
    public void theSystemRemainsOnDashboard() {
        assertTrue("Dashboard should still be visible", dashboardPage.isDashboardVisible());
    }

    @And("the user can perform a new search or select a different prospect")
    public void theUserCanPerformNewSearch() {
        assertTrue("Search field should be enabled", dashboardPage.isProspectSearchEnabled());
        assertTrue("Search button should be clickable", dashboardPage.isSearchButtonClickable());
    }
}