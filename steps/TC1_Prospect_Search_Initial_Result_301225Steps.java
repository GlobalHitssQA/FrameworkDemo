package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import pages.ActicenterDashboardPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {

    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is logged in as a Patrimony advisor on Acticenter dashboard")
    public void theUserIsLoggedInAsPatrimonyAdvisorOnActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be displayed", dashboardPage.isDashboardDisplayed());
    }

    @When("the user navigates to the prospect search functionality")
    public void theUserNavigatesToTheProspectSearchFunctionality() {
        dashboardPage.clickProspectSearchMenu();
        assertTrue("Prospect search interface should be displayed", prospectSearchPage.isSearchFieldDisplayed());
    }

    @And("the user enters at least 2 characters in the search field")
    public void theUserEntersAtLeast2CharactersInTheSearchField() {
        prospectSearchPage.enterSearchText("Jo");
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the system should display exactly 5 initial prospect results")
    public void theSystemShouldDisplayExactly5InitialProspectResults() {
        int visibleResultsCount = prospectSearchPage.getVisibleResultsCount();
        assertEquals("Initial visible results should be exactly 5", 5, visibleResultsCount);
    }

    @And("each result should show prospect name and email")
    public void eachResultShouldShowProspectNameAndEmail() {
        assertTrue("All visible results should display prospect name", prospectSearchPage.allResultsDisplayName());
        assertTrue("All visible results should display email", prospectSearchPage.allResultsDisplayEmail());
    }

    @And("additional results should be accessible through scroll if more than 5 coincidences exist")
    public void additionalResultsShouldBeAccessibleThroughScrollIfMoreThan5CoincidencesExist() {
        if (prospectSearchPage.hasMoreResultsThanVisible()) {
            prospectSearchPage.scrollToLoadMoreResults();
            int totalResultsAfterScroll = prospectSearchPage.getTotalResultsCount();
            assertTrue("More results should be visible after scrolling", totalResultsAfterScroll > 5);
        }
    }
}