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
    private String searchText = "";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor user is logged into Acticenter")
    public void theAdvisorUserIsLoggedIntoActicenter() {
        page.navigate("https://actinver.atlassian.net");
        loginPage.login("advisor_user", "advisor_password");
    }

    @And("the advisor dashboard is displayed")
    public void theAdvisorDashboardIsDisplayed() {
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible");
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
        prospectSearchPage.focusSearchField();
    }

    @And("the advisor enters {int} character in the search field")
    public void theAdvisorEntersCharacterInTheSearchField(int characterCount) {
        if (characterCount == 1) {
            searchText = "A";
            prospectSearchPage.enterSearchText(searchText);
        }
    }

    @When("the advisor enters a second character in the search field")
    public void theAdvisorEntersASecondCharacterInTheSearchField() {
        searchText = "AB";
        prospectSearchPage.clearAndEnterSearchText(searchText);
    }

    @When("the advisor enters a third character in the search field")
    public void theAdvisorEntersAThirdCharacterInTheSearchField() {
        searchText = "ABC";
        prospectSearchPage.clearAndEnterSearchText(searchText);
    }

    @Then("the search should not be triggered")
    public void theSearchShouldNotBeTriggered() {
        assertFalse(prospectSearchPage.areSearchResultsVisible(), "Search results should not be visible");
    }

    @Then("the search should be automatically triggered")
    public void theSearchShouldBeAutomaticallyTriggered() {
        page.waitForTimeout(1000);
        assertTrue(prospectSearchPage.isSearchTriggered(), "Search should be triggered");
    }

    @And("the search results should be displayed")
    public void theSearchResultsShouldBeDisplayed() {
        assertTrue(prospectSearchPage.areSearchResultsVisible(), "Search results should be visible");
    }

    @And("the results should contain prospects matching the search criteria")
    public void theResultsShouldContainProspectsMatchingTheSearchCriteria() {
        int resultCount = prospectSearchPage.getSearchResultCount();
        assertTrue(resultCount > 0, "Search results should contain at least one prospect");
    }
}