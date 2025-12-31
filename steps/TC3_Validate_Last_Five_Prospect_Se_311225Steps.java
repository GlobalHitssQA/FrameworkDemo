package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ActicenterDashboardPage;
import pages.PitchbookSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchHistorySteps {

    private Page page;
    private ActicenterDashboardPage dashboardPage;
    private PitchbookSearchPage pitchbookSearchPage;

    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.dashboardPage = new ActicenterDashboardPage(page);
        this.pitchbookSearchPage = new PitchbookSearchPage(page);
    }

    @Given("the advisor user is logged into the Acticenter platform")
    public void theAdvisorUserIsLoggedIntoTheActicenterPlatform() {
        dashboardPage.navigateToActicenter();
        assertTrue("Dashboard should be displayed", dashboardPage.isDashboardDisplayed());
    }

    @Given("the advisor has performed at least 5 previous prospect searches")
    public void theAdvisorHasPerformedAtLeastFivePreviousProspectSearches() {
        // Precondition: Advisor already has search history
        // This is validated by the test data setup
    }

    @Given("the advisor is on the Acticenter dashboard")
    public void theAdvisorIsOnTheActicenterDashboard() {
        assertTrue("Acticenter dashboard should be visible", dashboardPage.isDashboardDisplayed());
    }

    @When("the advisor navigates to the Pitchbook section")
    public void theAdvisorNavigatesToThePitchbookSection() {
        dashboardPage.navigateToPitchbook();
    }

    @Then("the prospect search field should be displayed and enabled")
    public void theProspectSearchFieldShouldBeDisplayedAndEnabled() {
        assertTrue("Search field should be visible", pitchbookSearchPage.isSearchFieldVisible());
        assertTrue("Search field should be enabled", pitchbookSearchPage.isSearchFieldEnabled());
    }

    @When("the advisor clicks on the prospect search field")
    public void theAdvisorClicksOnTheProspectSearchField() {
        pitchbookSearchPage.clickSearchField();
    }

    @Then("the system should display the last 5 searches performed")
    public void theSystemShouldDisplayTheLastFiveSearchesPerformed() {
        assertTrue("Search history dropdown should be visible", pitchbookSearchPage.isSearchHistoryDropdownVisible());
        assertEquals("Should display exactly 5 search history items", 5, pitchbookSearchPage.getSearchHistoryCount());
    }

    @Then("each search result should show the prospect name")
    public void eachSearchResultShouldShowTheProspectName() {
        assertTrue("All search history items should display prospect names", pitchbookSearchPage.allHistoryItemsHaveProspectName());
    }

    @Then("each search result should show the prospect email address")
    public void eachSearchResultShouldShowTheProspectEmailAddress() {
        assertTrue("All search history items should display email addresses", pitchbookSearchPage.allHistoryItemsHaveEmail());
    }

    @When("the advisor types a single character in the search field")
    public void theAdvisorTypesASingleCharacterInTheSearchField() {
        pitchbookSearchPage.typeInSearchField("a");
    }

    @Then("the system should still display the last 5 searches")
    public void theSystemShouldStillDisplayTheLastFiveSearches() {
        assertTrue("Search history should still be visible after typing", pitchbookSearchPage.isSearchHistoryDropdownVisible());
        assertTrue("Last 5 searches should still be displayed", pitchbookSearchPage.getSearchHistoryCount() >= 5);
    }

    @Then("matching results should be displayed along with the search history")
    public void matchingResultsShouldBeDisplayedAlongWithTheSearchHistory() {
        assertTrue("Search results section should be visible", pitchbookSearchPage.isSearchResultsVisible());
    }

    @When("the advisor selects a prospect from the last 5 searches list")
    public void theAdvisorSelectsAProspectFromTheLastFiveSearchesList() {
        pitchbookSearchPage.selectFirstSearchHistoryItem();
    }

    @Then("the selected prospect information should be populated")
    public void theSelectedProspectInformationShouldBePopulated() {
        assertTrue("Prospect information should be populated", pitchbookSearchPage.isProspectInfoPopulated());
    }

    @Then("the process flow should continue")
    public void theProcessFlowShouldContinue() {
        assertTrue("Process flow should continue to next step", pitchbookSearchPage.isProcessFlowContinued());
    }
}