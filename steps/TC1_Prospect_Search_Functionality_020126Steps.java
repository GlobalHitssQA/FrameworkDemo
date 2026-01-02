package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.LoginPage;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        loginPage.navigateToLogin();
        loginPage.login("advisor@actinver.com", "password123");
    }

    @And("the advisor is on the dashboard")
    public void theAdvisorIsOnTheDashboard() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible after login");
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToSearchField();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible and accessible");
    }

    @And("the advisor types one character in the search field")
    public void theAdvisorTypesOneCharacterInTheSearchField() {
        prospectSearchPage.typeInSearchField("A");
        page.waitForTimeout(500);
    }

    @Then("the search should not be triggered")
    public void theSearchShouldNotBeTriggered() {
        assertFalse(prospectSearchPage.areSearchResultsDisplayed(), "Search results should not be displayed with only 1 character");
    }

    @When("the advisor types a second character in the search field")
    public void theAdvisorTypesASecondCharacterInTheSearchField() {
        prospectSearchPage.typeInSearchField("B");
        page.waitForTimeout(1000);
    }

    @Then("the search should be triggered automatically")
    public void theSearchShouldBeTriggeredAutomatically() {
        assertTrue(prospectSearchPage.isSearchTriggered(), "Search should be triggered after typing second character");
    }

    @And("the search results should be displayed matching the input")
    public void theSearchResultsShouldBeDisplayedMatchingTheInput() {
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should be displayed");
        assertTrue(prospectSearchPage.getSearchResultsCount() > 0, "At least one search result should be displayed");
    }
}