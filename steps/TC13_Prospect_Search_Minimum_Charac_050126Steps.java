package stepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.LoginPage;
import pages.DashboardPage;
import com.microsoft.playwright.Page;
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
        page.navigate("https://actinver.atlassian.net");
        loginPage.performLogin();
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be visible after login");
    }

    @And("the advisor navigates to the prospect search section")
    public void theAdvisorNavigatesToTheProspectSearchSection() {
        dashboardPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("the advisor enters {int} character in the search field")
    public void theAdvisorEntersCharacterInTheSearchField(int characterCount) {
        prospectSearchPage.enterSearchText("A");
    }

    @Then("no search results should be displayed")
    public void noSearchResultsShouldBeDisplayed() {
        assertFalse(prospectSearchPage.areResultsDisplayed(), "Results should not be displayed with 1 character");
    }

    @And("no loading indicators should appear")
    public void noLoadingIndicatorsShouldAppear() {
        assertFalse(prospectSearchPage.isLoadingIndicatorVisible(), "Loading indicator should not appear with 1 character");
    }

    @When("the advisor enters a second character in the search field")
    public void theAdvisorEntersASecondCharacterInTheSearchField() {
        prospectSearchPage.appendSearchText("B");
    }

    @Then("the search should be triggered")
    public void theSearchShouldBeTriggered() {
        assertTrue(prospectSearchPage.isSearchTriggered(), "Search should be triggered with 2 characters");
    }

    @And("matching prospects or a no results message should be displayed")
    public void matchingProspectsOrANoResultsMessageShouldBeDisplayed() {
        assertTrue(prospectSearchPage.areResultsDisplayed() || prospectSearchPage.isNoResultsMessageVisible(),
                "Either results or no results message should be displayed");
    }
}