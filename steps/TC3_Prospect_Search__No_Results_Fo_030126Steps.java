package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private ProspectSearchPage prospectSearchPage;
    private static final String NON_EXISTENT_QUERY = "XYZNONEXISTENT123";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in to Acticenter as a Wealth Management Advisor")
    public void userIsLoggedInAsAdvisor() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
        assertTrue(loginPage.isLoginSuccessful(), "User should be logged in successfully");
    }

    @And("the user is on the prospect search section")
    public void userIsOnProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isProspectSearchInterfaceDisplayed(), "Prospect search interface should be displayed");
    }

    @When("the user enters a search query that does not match any existing prospects")
    public void userEntersNonMatchingSearchQuery() {
        prospectSearchPage.enterSearchQuery(NON_EXISTENT_QUERY);
    }

    @And("the user executes the search")
    public void userExecutesSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("a no results message is displayed")
    public void noResultsMessageIsDisplayed() {
        assertTrue(prospectSearchPage.isNoResultsMessageVisible(), "No results message should be displayed");
        String noResultsText = prospectSearchPage.getNoResultsMessageText();
        assertFalse(noResultsText.isEmpty(), "No results message text should not be empty");
    }

    @And("the dashboard remains visible")
    public void dashboardRemainsVisible() {
        assertTrue(prospectSearchPage.isDashboardVisible(), "Dashboard should remain visible");
    }

    @And("the user can perform a new search")
    public void userCanPerformNewSearch() {
        assertTrue(prospectSearchPage.isSearchFieldEnabled(), "Search field should be enabled for a new search");
        assertTrue(prospectSearchPage.isSearchButtonEnabled(), "Search button should be enabled for a new search");
    }
}