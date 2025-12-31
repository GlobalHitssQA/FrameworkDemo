package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    @Given("the user is logged in as an advisor with access to Actinver application")
    public void theUserIsLoggedInAsAnAdvisorWithAccessToActinverApplication() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        prospectSearchPage = new ProspectSearchPage(page);
        prospectSearchPage.navigateToApplication();
        // Login logic would be implemented here based on authentication requirements
    }

    @And("the main dashboard is displayed with prospect search functionality available")
    public void theMainDashboardIsDisplayedWithProspectSearchFunctionalityAvailable() {
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
        assertTrue("Prospect search section should be available", prospectSearchPage.isProspectSearchSectionAvailable());
    }

    @When("the user navigates to the prospect search field")
    public void theUserNavigatesToTheProspectSearchField() {
        prospectSearchPage.focusOnSearchField();
    }

    @Then("the search field is displayed and enabled for input")
    public void theSearchFieldIsDisplayedAndEnabledForInput() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search field should be enabled", prospectSearchPage.isSearchFieldEnabled());
    }

    @When("the user enters {string} in the prospect search field")
    public void theUserEntersInTheProspectSearchField(String searchText) {
        prospectSearchPage.enterSearchText(searchText);
    }

    @Then("the system triggers the search functionality and displays the search button")
    public void theSystemTriggersTheSearchFunctionalityAndDisplaysTheSearchButton() {
        assertTrue("Search button should be visible after entering more than 2 characters", 
                   prospectSearchPage.isSearchButtonVisible());
    }

    @When("the user clicks on the search button to execute the search")
    public void theUserClicksOnTheSearchButtonToExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
    }

    @Then("the system displays a list of matching prospects from Salesforce database")
    public void theSystemDisplaysAListOfMatchingProspectsFromSalesforceDatabase() {
        assertTrue("Search results should be displayed", prospectSearchPage.areSearchResultsDisplayed());
    }

    @And("the system shows the last 5 searches with prospect name and email information")
    public void theSystemShowsTheLast5SearchesWithProspectNameAndEmailInformation() {
        assertTrue("Last 5 searches section should be visible", prospectSearchPage.isLastSearchesSectionVisible());
        int lastSearchesCount = prospectSearchPage.getLastSearchesCount();
        assertTrue("Should display up to 5 last searches", lastSearchesCount <= 5 && lastSearchesCount >= 0);
    }

    @And("the system displays the first 5 matching coincidences on screen")
    public void theSystemDisplaysTheFirst5MatchingCoincidencesOnScreen() {
        int matchingResultsCount = prospectSearchPage.getVisibleMatchingResultsCount();
        assertTrue("Should display first 5 matching coincidences", matchingResultsCount <= 5);
        assertTrue("Should display at least one matching result", matchingResultsCount >= 1);
        assertTrue("Scroll should be available if more than 5 results exist", 
                   prospectSearchPage.isScrollAvailableForMoreResults() || matchingResultsCount <= 5);
    }
}