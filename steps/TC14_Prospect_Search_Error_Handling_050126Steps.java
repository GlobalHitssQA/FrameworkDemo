package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchErrorSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private String errorMessage;

    public ProspectSearchErrorSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged in to Acticenter")
    public void theAdvisorIsLoggedInToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue("Dashboard should be visible", loginPage.isDashboardVisible());
    }

    @And("the advisor navigates to the prospect search section")
    public void theAdvisorNavigatesToTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be displayed", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the advisor enters a search query that returns no matches")
    public void theAdvisorEntersASearchQueryThatReturnsNoMatches() {
        prospectSearchPage.enterSearchQuery("XXXXXXXXNONEXISTENTPROSPECT99999");
    }

    @And("the advisor submits the search")
    public void theAdvisorSubmitsTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResponse();
    }

    @Then("an error message or no results message should be displayed")
    public void anErrorMessageOrNoResultsMessageShouldBeDisplayed() {
        assertTrue("Error or no results message should be visible", 
                   prospectSearchPage.isErrorMessageVisible() || 
                   prospectSearchPage.isNoResultsMessageVisible());
    }

    @And("the error message should clearly communicate the issue")
    public void theErrorMessageShouldClearlyCommunicateTheIssue() {
        errorMessage = prospectSearchPage.getErrorMessageText();
        assertNotNull("Error message should not be null", errorMessage);
        assertFalse("Error message should not be empty", errorMessage.trim().isEmpty());
        assertTrue("Error message should be informative", 
                   errorMessage.length() > 10);
    }

    @And("the search field should remain functional")
    public void theSearchFieldShouldRemainFunctional() {
        assertTrue("Search field should still be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }

    @And("the advisor should be able to perform another search")
    public void theAdvisorShouldBeAbleToPerformAnotherSearch() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchQuery("test@actinver.com");
        prospectSearchPage.clickSearchButton();
        assertTrue("System should remain stable after error", 
                   prospectSearchPage.isSearchFieldVisible());
    }
}