package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchHistorySteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private int initialSearchCount = 0;

    public ProspectSearchHistorySteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the Acticenter prospect search page")
    public void iAmOnTheActicenterProspectSearchPage() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search interface should load successfully");
    }

    @When("I perform a first search for a prospect")
    public void iPerformAFirstSearchForAProspect() {
        prospectSearchPage.enterSearchTerm("John Doe");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search result should be displayed successfully")
    public void theSearchResultShouldBeDisplayedSuccessfully() {
        assertTrue(prospectSearchPage.isResultListVisible(), "Search results should be visible");
    }

    @Then("the search should be stored in history")
    public void theSearchShouldBeStoredInHistory() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchTerm("J");
        assertTrue(prospectSearchPage.isSearchHistoryVisible(), "Search history should be available");
    }

    @When("I type initial characters in the search field")
    public void iTypeInitialCharactersInTheSearchField() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchTerm("A");
    }

    @Then("the last 5 searches performed should be displayed")
    public void theLastFiveSearchesPerformedShouldBeDisplayed() {
        int historyCount = prospectSearchPage.getSearchHistoryCount();
        assertTrue(historyCount > 0 && historyCount <= 5, "Search history should display up to 5 entries");
    }

    @When("I perform additional searches to exceed 5 total searches")
    public void iPerformAdditionalSearchesToExceedFiveTotalSearches() {
        String[] searchTerms = {"Maria Garcia", "Carlos Lopez", "Ana Martinez", "Pedro Sanchez", "Luis Rodriguez", "Sofia Hernandez"};
        for (String term : searchTerms) {
            prospectSearchPage.clearSearchField();
            prospectSearchPage.enterSearchTerm(term);
            prospectSearchPage.clickSearchButton();
            page.waitForTimeout(500);
        }
    }

    @Then("only the most recent 5 searches should be retained")
    public void onlyTheMostRecentFiveSearchesShouldBeRetained() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchTerm("S");
        int historyCount = prospectSearchPage.getSearchHistoryCount();
        assertEquals(5, historyCount, "Only 5 most recent searches should be retained");
    }

    @Then("each history entry should display prospect name and electronic email")
    public void eachHistoryEntryShouldDisplayProspectNameAndElectronicEmail() {
        assertTrue(prospectSearchPage.allHistoryEntriesHaveNameAndEmail(), "All history entries should display name and email");
    }

    @When("I view the search results")
    public void iViewTheSearchResults() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchTerm("Test Prospect");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the first 5 coincidences should be displayed on screen")
    public void theFirstFiveCoincidencesShouldBeDisplayedOnScreen() {
        int visibleResults = prospectSearchPage.getVisibleResultsCount();
        assertTrue(visibleResults >= 1 && visibleResults <= 5, "First 5 coincidences should be displayed");
    }

    @Then("a scroll option should be available if more than 6 results exist")
    public void aScrollOptionShouldBeAvailableIfMoreThanSixResultsExist() {
        int totalResults = prospectSearchPage.getTotalResultsCount();
        if (totalResults > 6) {
            assertTrue(prospectSearchPage.isResultListScrollable(), "Scroll should be available for more than 6 results");
        }
    }
}