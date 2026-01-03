package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import pages.DashboardPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;
    private int totalResults;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in to Acticenter dashboard as an advisor user")
    public void iAmLoggedInToActicenterDashboardAsAdvisorUser() {
        page.navigate("https://actinver.atlassian.net");
        assertTrue(dashboardPage.isDashboardVisible(), "Dashboard should be displayed");
    }

    @When("I navigate to the prospect search functionality")
    public void iNavigateToProspectSearchFunctionality() {
        dashboardPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchScreenVisible(), "Search screen should be displayed");
    }

    @And("I enter a search term that returns more than 5 results")
    public void iEnterSearchTermThatReturnsMoreThanFiveResults() {
        prospectSearchPage.enterSearchTerm("test");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search is executed and multiple matches are found")
    public void theSearchIsExecutedAndMultipleMatchesAreFound() {
        prospectSearchPage.waitForSearchResults();
        totalResults = prospectSearchPage.getTotalResultsCount();
        assertTrue(totalResults > 5, "Search should return more than 5 results");
    }

    @And("I verify that 5 results are initially displayed on screen")
    public void iVerifyThatFiveResultsAreInitiallyDisplayed() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertEquals(5, visibleResults, "Initially 5 results should be visible");
    }

    @When("I use scroll functionality to view additional results")
    public void iUseScrollFunctionalityToViewAdditionalResults() {
        prospectSearchPage.scrollToLoadMoreResults();
    }

    @Then("the scroll mechanism works and additional results beyond the sixth are displayed")
    public void theScrollMechanismWorksAndAdditionalResultsAreDisplayed() {
        prospectSearchPage.waitForAdditionalResults();
        int visibleResultsAfterScroll = prospectSearchPage.getVisibleResultsCount();
        assertTrue(visibleResultsAfterScroll > 5, "More than 5 results should be visible after scrolling");
    }

    @And("I verify all search results can be accessed through scrolling")
    public void iVerifyAllSearchResultsCanBeAccessedThroughScrolling() {
        prospectSearchPage.scrollToBottom();
        int finalVisibleResults = prospectSearchPage.getVisibleResultsCount();
        assertEquals(totalResults, finalVisibleResults, "All search results should be accessible through scrolling");
    }
}