package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.ProspectSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchQuery = "José María O'Connor-López @#$";

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user is on the prospect search section")
    public void theUserIsOnTheProspectSearchSection() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue(prospectSearchPage.isSearchFieldVisible(), "Search field should be visible");
    }

    @When("the user enters a prospect name containing special characters")
    public void theUserEntersAProspectNameContainingSpecialCharacters() {
        prospectSearchPage.enterSearchQuery(searchQuery);
    }

    @And("the user executes the search")
    public void theUserExecutesTheSearch() {
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results should display prospects with special characters in the name field")
    public void theSearchResultsShouldDisplayProspectsWithSpecialCharactersInTheNameField() {
        assertTrue(prospectSearchPage.areSearchResultsDisplayed(), "Search results should be displayed");
        assertTrue(prospectSearchPage.hasResultsWithSpecialCharacters(), "Results should contain special characters");
    }

    @And("the matching special characters should be highlighted in yellow")
    public void theMatchingSpecialCharactersShouldBeHighlightedInYellow() {
        assertTrue(prospectSearchPage.areMatchesHighlightedInYellow(), "Matches should be highlighted in yellow");
    }

    @And("the search field should accept alphanumeric chains with special characters")
    public void theSearchFieldShouldAcceptAlphanumericChainsWithSpecialCharacters() {
        String enteredValue = prospectSearchPage.getSearchFieldValue();
        assertEquals(searchQuery, enteredValue, "Search field should retain special characters");
    }
}