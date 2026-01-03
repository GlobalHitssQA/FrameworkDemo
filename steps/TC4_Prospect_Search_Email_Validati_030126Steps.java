package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String prospectWithoutEmail = "Test Prospect No Email";
    private String prospectWithEmail = "Test Prospect With Email";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in to Acticenter as a Wealth Management Advisor")
    public void i_am_logged_in_to_acticenter_as_wealth_management_advisor() {
        loginPage.navigateToLogin();
        loginPage.login("advisor.user@actinver.com", "SecurePassword123");
        loginPage.verifyLoginSuccess();
    }

    @When("I navigate to the prospect search section")
    public void i_navigate_to_prospect_search_section() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Prospect search interface should be visible", 
                   prospectSearchPage.isSearchInterfaceDisplayed());
    }

    @When("I enter a search query for a prospect without email address")
    public void i_enter_search_query_for_prospect_without_email() {
        prospectSearchPage.enterSearchQuery(prospectWithoutEmail);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect without email should not be displayed in the search results")
    public void prospect_without_email_should_not_be_displayed() {
        assertFalse("Prospect without email should not appear in results",
                    prospectSearchPage.isProspectInResults(prospectWithoutEmail));
    }

    @When("I enter a search query for a prospect with email address")
    public void i_enter_search_query_for_prospect_with_email() {
        prospectSearchPage.clearSearchQuery();
        prospectSearchPage.enterSearchQuery(prospectWithEmail);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the prospect with email should be displayed in the search results")
    public void prospect_with_email_should_be_displayed() {
        assertTrue("Prospect with email should appear in results",
                   prospectSearchPage.isProspectInResults(prospectWithEmail));
    }
}