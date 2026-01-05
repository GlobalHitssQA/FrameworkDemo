package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.DashboardPage;
import static org.junit.jupiter.api.Assertions.*;

public class SupportBankerRoleSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;

    public SupportBankerRoleSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    @Given("I am logged in to Acticenter as a support banker user")
    public void iAmLoggedInAsaSupportBankerUser() {
        loginPage.navigateToLogin();
        loginPage.login("support_banker_user", "password123");
        loginPage.waitForLoginComplete();
    }

    @When("I navigate to the main dashboard")
    public void iNavigateToTheMainDashboard() {
        dashboardPage.navigateToDashboard();
    }

    @Then("the dashboard should be displayed with support banker functionalities")
    public void theDashboardShouldBeDisplayedWithSupportBankerFunctionalities() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible");
        assertTrue(dashboardPage.hasSupportBankerFunctionalities(), "Support banker functionalities should be available");
    }

    @And("the prospect search functionality should not be visible")
    public void theProspectSearchFunctionalityShouldNotBeVisible() {
        assertFalse(dashboardPage.isProspectSearchVisible(), "Prospect search should not be visible for support banker");
    }

    @And("I should not be able to access prospect search options")
    public void iShouldNotBeAbleToAccessProspectSearchOptions() {
        assertFalse(dashboardPage.isProspectSearchEnabled(), "Prospect search should not be accessible for support banker");
        dashboardPage.verifyNoProspectSearchAccess();
    }
}