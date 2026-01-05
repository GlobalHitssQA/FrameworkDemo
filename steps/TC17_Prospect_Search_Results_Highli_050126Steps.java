package stepdefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchHighlightingSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String initialSearchTerm = "Jo";
    private String alternativeSearchTerm = "Ma";

    public ProspectSearchHighlightingSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is on the prospect search screen")
    public void theAdvisorIsOnTheProspectSearchScreen() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Prospect search screen should be displayed");
    }

    @When("the advisor enters at least 2 characters in the search field")
    public void theAdvisorEntersAtLeastTwoCharactersInTheSearchField() {
        prospectSearchPage.enterSearchCriteria(initialSearchTerm);
    }

    @And("the advisor executes the search")
    public void theAdvisorExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the system displays up to 5 matching prospects")
    public void theSystemDisplaysUpToFiveMatchingProspects() {
        int resultCount = prospectSearchPage.getSearchResultsCount();
        assertTrue(resultCount > 0 && resultCount <= 5, 
            "Search results should display between 1 and 5 prospects, but found: " + resultCount);
    }

    @And("matching characters in prospect names are highlighted")
    public void matchingCharactersInProspectNamesAreHighlighted() {
        assertTrue(prospectSearchPage.areProspectNamesHighlighted(), 
            "Matching characters in prospect names should be highlighted");
    }

    @And("matching characters in email addresses are highlighted")
    public void matchingCharactersInEmailAddressesAreHighlighted() {
        assertTrue(prospectSearchPage.areEmailAddressesHighlighted(), 
            "Matching characters in email addresses should be highlighted");
    }

    @When("the advisor enters a different search term")
    public void theAdvisorEntersADifferentSearchTerm() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchCriteria(alternativeSearchTerm);
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the highlighting updates to reflect the new search characters")
    public void theHighlightingUpdatesToReflectTheNewSearchCharacters() {
        assertTrue(prospectSearchPage.areProspectNamesHighlighted(), 
            "Highlighting should update for new search term in prospect names");
        assertTrue(prospectSearchPage.areEmailAddressesHighlighted(), 
            "Highlighting should update for new search term in email addresses");
    }
}