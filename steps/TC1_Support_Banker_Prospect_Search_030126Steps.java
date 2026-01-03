package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectManagementPage;
import static org.junit.Assert.*;

public class ProspectSearchRestrictionSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectManagementPage prospectManagementPage;

    public ProspectSearchRestrictionSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectManagementPage = new ProspectManagementPage(page);
    }

    @Given("the user is logged in to Acticenter as a support banker")
    public void theUserIsLoggedInToActicenterAsASupportBanker() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.loginAsSupportBanker("support_banker_user", "password123");
        assertTrue("Login should be successful", loginPage.isLoginSuccessful());
    }

    @When("the user navigates to the prospect management section")
    public void theUserNavigatesToTheProspectManagementSection() {
        prospectManagementPage.navigateToProspectManagement();
        assertTrue("Prospect management section should be accessible", 
                   prospectManagementPage.isProspectManagementSectionVisible());
    }

    @Then("the prospect search functionality should not be visible")
    public void theProspectSearchFunctionalityShouldNotBeVisible() {
        assertFalse("Prospect search functionality should not be visible", 
                    prospectManagementPage.isProspectSearchVisible());
    }

    @And("no search input field should be displayed")
    public void noSearchInputFieldShouldBeDisplayed() {
        assertFalse("Search input field should not be displayed", 
                    prospectManagementPage.isSearchInputFieldVisible());
    }

    @And("no search button should be displayed")
    public void noSearchButtonShouldBeDisplayed() {
        assertFalse("Search button should not be displayed", 
                    prospectManagementPage.isSearchButtonVisible());
    }
}