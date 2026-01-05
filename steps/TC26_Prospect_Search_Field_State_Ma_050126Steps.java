package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.ProspectSearchPage;
import pages.ProcessSelectionPage;

import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private ProcessSelectionPage processSelectionPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
        this.processSelectionPage = new ProcessSelectionPage(page);
    }

    @Given("I am on the Acticenter prospect search interface")
    public void iAmOnTheActicenterProspectSearchInterface() {
        prospectSearchPage.navigateToProspectSearch();
    }

    @Given("the search field is empty")
    public void theSearchFieldIsEmpty() {
        String searchFieldValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should be empty", searchFieldValue == null || searchFieldValue.isEmpty());
    }

    @When("I enter {string} in the search field")
    public void iEnterInTheSearchField(String searchText) {
        prospectSearchPage.enterSearchText(searchText);
    }

    @Then("the system displays up to 5 matching prospects")
    public void theSystemDisplaysUpToFiveMatchingProspects() {
        assertTrue("Search results should be visible", prospectSearchPage.areSearchResultsVisible());
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("Results count should be between 1 and 5", resultsCount >= 1 && resultsCount <= 5);
    }

    @When("I select a prospect from the search results")
    public void iSelectAProspectFromTheSearchResults() {
        prospectSearchPage.selectFirstProspect();
    }

    @Then("I am navigated to the process selection screen")
    public void iAmNavigatedToTheProcessSelectionScreen() {
        assertTrue("Process selection screen should be visible", processSelectionPage.isProcessSelectionScreenVisible());
    }

    @When("I navigate back to the prospect search interface")
    public void iNavigateBackToTheProspectSearchInterface() {
        page.goBack();
    }

    @Then("the search field is cleared and empty")
    public void theSearchFieldIsClearedAndEmpty() {
        String searchFieldValue = prospectSearchPage.getSearchFieldValue();
        assertTrue("Search field should be cleared after returning", searchFieldValue == null || searchFieldValue.isEmpty());
    }

    @Then("the system performs a new search and displays matching results")
    public void theSystemPerformsANewSearchAndDisplaysMatchingResults() {
        assertTrue("New search results should be visible", prospectSearchPage.areSearchResultsVisible());
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assertTrue("New search should return results", resultsCount >= 1);
    }
}