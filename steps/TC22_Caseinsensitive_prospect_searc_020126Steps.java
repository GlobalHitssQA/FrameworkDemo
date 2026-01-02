package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

import java.util.List;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private List<String> lowercaseResults;
    private List<String> uppercaseResults;
    private List<String> mixedCaseResults;
    private String searchQuery = "john smith";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am authenticated as an advisor on the Acticenter dashboard")
    public void iAmAuthenticatedAsAnAdvisorOnTheActicenterDashboard() {
        prospectSearchPage.navigateToDashboard();
        assertTrue("Dashboard should be visible", prospectSearchPage.isDashboardVisible());
    }

    @And("the prospect search functionality is available")
    public void theProspectSearchFunctionalityIsAvailable() {
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("I enter a search query in all lowercase characters for a known prospect")
    public void iEnterASearchQueryInAllLowercaseCharactersForAKnownProspect() {
        prospectSearchPage.enterSearchQuery(searchQuery.toLowerCase());
    }

    @And("I execute the search")
    public void iExecuteTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results should display matching prospects")
    public void theSearchResultsShouldDisplayMatchingProspects() {
        lowercaseResults = prospectSearchPage.getSearchResults();
        assertFalse("Search results should not be empty", lowercaseResults.isEmpty());
    }

    @When("I clear the search field")
    public void iClearTheSearchField() {
        prospectSearchPage.clearSearchField();
    }

    @And("I enter the same search query in all uppercase characters")
    public void iEnterTheSameSearchQueryInAllUppercaseCharacters() {
        prospectSearchPage.enterSearchQuery(searchQuery.toUpperCase());
    }

    @Then("the search results should match the previous lowercase search results")
    public void theSearchResultsShouldMatchThePreviousLowercaseSearchResults() {
        uppercaseResults = prospectSearchPage.getSearchResults();
        assertEquals("Uppercase search should return same results as lowercase", 
                     lowercaseResults.size(), uppercaseResults.size());
        assertEquals("Results should be identical", lowercaseResults, uppercaseResults);
    }

    @And("I enter the same search query in mixed case characters")
    public void iEnterTheSameSearchQueryInMixedCaseCharacters() {
        prospectSearchPage.enterSearchQuery("JoHn SmItH");
    }

    @Then("the search results should match the previous search results")
    public void theSearchResultsShouldMatchThePreviousSearchResults() {
        mixedCaseResults = prospectSearchPage.getSearchResults();
        assertEquals("Mixed case search should return same results", 
                     lowercaseResults.size(), mixedCaseResults.size());
        assertEquals("Results should be identical", lowercaseResults, mixedCaseResults);
    }

    @And("the case-insensitive search behavior is confirmed")
    public void theCaseInsensitiveSearchBehaviorIsConfirmed() {
        assertTrue("All searches returned results", 
                   !lowercaseResults.isEmpty() && 
                   !uppercaseResults.isEmpty() && 
                   !mixedCaseResults.isEmpty());
    }
}