package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.DashboardPage;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private DashboardPage dashboardPage;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(page);
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the Acticenter dashboard")
    public void iAmOnTheActicenterDashboard() {
        dashboardPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", dashboardPage.isDashboardVisible());
    }

    @When("I access the prospect search screen")
    public void iAccessTheProspectSearchScreen() {
        dashboardPage.clickProspectSearchOption();
    }

    @Then("the search screen should load correctly with search input field visible")
    public void theSearchScreenShouldLoadCorrectlyWithSearchInputFieldVisible() {
        assertTrue("Search input field should be visible", prospectSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", prospectSearchPage.isSearchButtonVisible());
    }

    @When("I perform a valid search that returns multiple prospect matches")
    public void iPerformAValidSearchThatReturnsMultipleProspectMatches() {
        prospectSearchPage.enterSearchQuery("test prospect");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system should display a list of matching prospects with relevant information")
    public void theSystemShouldDisplayAListOfMatchingProspectsWithRelevantInformation() {
        assertTrue("Results list should be visible", prospectSearchPage.isResultsListVisible());
        assertTrue("At least one prospect result should be displayed", prospectSearchPage.getResultsCount() > 0);
    }

    @When("I review the search results without selecting any prospect")
    public void iReviewTheSearchResultsWithoutSelectingAnyProspect() {
        prospectSearchPage.scrollThroughResults();
    }

    @Then("the search results should remain displayed with no prospect selected or highlighted")
    public void theSearchResultsShouldRemainDisplayedWithNoProspectSelectedOrHighlighted() {
        assertTrue("Results should still be visible", prospectSearchPage.isResultsListVisible());
        assertFalse("No prospect should be selected", prospectSearchPage.isAnyProspectSelected());
    }

    @When("I exit the search without making a selection")
    public void iExitTheSearchWithoutMakingASelection() {
        prospectSearchPage.clickCancelOrBackButton();
    }

    @Then("the system should return me to the main dashboard screen")
    public void theSystemShouldReturnMeToTheMainDashboardScreen() {
        assertTrue("Dashboard should be visible after exit", dashboardPage.isDashboardVisible());
    }

    @And("I should be able to select other functions")
    public void iShouldBeAbleToSelectOtherFunctions() {
        assertTrue("Dashboard menu options should be available", dashboardPage.areMenuOptionsVisible());
    }

    @And("no prospect data should be retained or processed")
    public void noProspectDataShouldBeRetainedOrProcessed() {
        assertFalse("No prospect data should be displayed on dashboard", dashboardPage.isProspectDataDisplayed());
    }

    @And("the dashboard should display in its initial state")
    public void theDashboardShouldDisplayInItsInitialState() {
        assertTrue("Dashboard should be in initial state", dashboardPage.isInInitialState());
    }
}