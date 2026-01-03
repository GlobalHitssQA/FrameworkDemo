package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ActicenterDashboardPage;
import static org.junit.Assert.*;

public class AdvisorProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ActicenterDashboardPage dashboardPage;

    public AdvisorProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new ActicenterDashboardPage(page);
    }

    @Given("the user logs in to the system as an advisor user")
    public void theUserLogsInAsAdvisorUser() {
        loginPage.navigateToLogin();
        loginPage.login("advisor_user", "advisor_password");
        loginPage.waitForSuccessfulAuthentication();
    }

    @When("the user navigates to Acticenter dashboard")
    public void theUserNavigatesToActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        dashboardPage.waitForDashboardToLoad();
    }

    @Then("the prospect search field should be visible on the dashboard")
    public void theProspectSearchFieldShouldBeVisible() {
        assertTrue("Prospect search field should be visible", 
                   dashboardPage.isProspectSearchFieldVisible());
    }

    @And("the search field should be enabled and accept input")
    public void theSearchFieldShouldBeEnabledAndAcceptInput() {
        assertTrue("Search field should be enabled", 
                   dashboardPage.isProspectSearchFieldEnabled());
        dashboardPage.enterTextInProspectSearchField("test");
        assertEquals("Search field should accept input", 
                     "test", 
                     dashboardPage.getProspectSearchFieldValue());
        dashboardPage.clearProspectSearchField();
    }

    @And("the search field should be positioned correctly within the dashboard layout")
    public void theSearchFieldShouldBePositionedCorrectly() {
        assertTrue("Search field should be in viewport", 
                   dashboardPage.isProspectSearchFieldInViewport());
        assertTrue("Search field should be positioned in expected location", 
                   dashboardPage.isProspectSearchFieldPositionedCorrectly());
    }
}