package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.LoginPage;
import pages.DashboardPage;
import pages.NavigationPage;
import static org.junit.Assert.*;

public class ProspectSearchVisibilitySteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private NavigationPage navigationPage;

    public ProspectSearchVisibilitySteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.navigationPage = new NavigationPage(page);
    }

    @Given("the support banker is logged into Acticenter")
    public void theSupportBankerIsLoggedIntoActicenter() {
        loginPage.navigateToLoginPage();
        loginPage.loginAsSupportBanker("support.banker@actinver.com", "SupportPassword123");
        assertTrue("Login was not successful", loginPage.isLoginSuccessful());
    }

    @When("the support banker navigates to the main dashboard")
    public void theSupportBankerNavigatesToTheMainDashboard() {
        dashboardPage.waitForDashboardToLoad();
        assertTrue("Dashboard did not load properly", dashboardPage.isDashboardVisible());
    }

    @Then("the prospect search functionality should not be displayed")
    public void theProspectSearchFunctionalityShouldNotBeDisplayed() {
        assertFalse("Prospect search field is visible but should not be", 
            dashboardPage.isProspectSearchFieldVisible());
        assertFalse("Prospect search button is visible but should not be", 
            dashboardPage.isProspectSearchButtonVisible());
    }

    @Then("the prospect search should not be accessible through alternative navigation paths")
    public void theProspectSearchShouldNotBeAccessibleThroughAlternativeNavigationPaths() {
        assertFalse("Prospect search menu item is accessible but should not be", 
            navigationPage.isProspectSearchMenuItemVisible());
        
        navigationPage.attemptToAccessProspectSearchDirectly();
        
        assertFalse("Prospect search page is accessible but should not be", 
            dashboardPage.isProspectSearchPageLoaded());
    }
}