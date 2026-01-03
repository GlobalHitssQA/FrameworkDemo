package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.LoginPage;
import pages.ActicenterDashboardPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchAccessControlSteps {
    private Page page;
    private LoginPage loginPage;
    private ActicenterDashboardPage dashboardPage;

    public ProspectSearchAccessControlSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new ActicenterDashboardPage(page);
    }

    @Given("the user is logged in as a support banker")
    public void theUserIsLoggedInAsASupportBanker() {
        loginPage.navigateToLogin();
        loginPage.login("support_banker_user", "password123");
        loginPage.waitForSuccessfulAuthentication();
    }

    @When("the user accesses the Acticenter dashboard")
    public void theUserAccessesTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        dashboardPage.waitForDashboardToLoad();
    }

    @Then("the prospect search functionality should not be displayed")
    public void theProspectSearchFunctionalityShouldNotBeDisplayed() {
        boolean isSearchVisible = dashboardPage.isProspectSearchVisible();
        assertFalse(isSearchVisible, "Prospect search functionality should not be visible for support banker");
    }

    @And("the user should not be able to access the search interface")
    public void theUserShouldNotBeAbleToAccessTheSearchInterface() {
        boolean canAccessSearch = dashboardPage.canAccessProspectSearch();
        assertFalse(canAccessSearch, "Support banker should not have access to prospect search interface");
    }
}