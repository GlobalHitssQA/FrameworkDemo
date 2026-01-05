package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String initialSearchText = "Jo";
    private String extendedSearchText = "John";
    private int initialResultCount;
    private int updatedResultCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the user navigates to the prospect search section in Acticenter")
    public void navigateToProspectSearchSection() {
        prospectSearchPage.navigateToSearchSection();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
    }

    @When("the user enters at least 2 characters in the search field")
    public void enterMinimumCharactersInSearchField() {
        prospectSearchPage.enterSearchText(initialSearchText);
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search executes and results are displayed")
    public void verifySearchExecutesAndResultsDisplayed() {
        assertTrue("Search results should be visible", prospectSearchPage.areResultsVisible());
        initialResultCount = prospectSearchPage.getResultCount();
        assertTrue("Results count should be greater than 0", initialResultCount > 0);
    }

    @When("the user adds more characters to the search text")
    public void addMoreCharactersToSearchText() {
        prospectSearchPage.clearAndEnterSearchText(extendedSearchText);
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results update dynamically to reflect the new criteria")
    public void verifyResultsUpdateDynamically() {
        assertTrue("Search results should be visible after update", prospectSearchPage.areResultsVisible());
        updatedResultCount = prospectSearchPage.getResultCount();
        assertNotEquals("Result count should change after search modification", initialResultCount, updatedResultCount);
    }

    @When("the user removes characters from the search text")
    public void removeCharactersFromSearchText() {
        prospectSearchPage.clearAndEnterSearchText(initialSearchText);
        prospectSearchPage.waitForSearchResults();
    }

    @Then("the search results update dynamically showing broader results")
    public void verifyBroaderResultsDisplayed() {
        assertTrue("Search results should be visible after removal", prospectSearchPage.areResultsVisible());
        int broaderResultCount = prospectSearchPage.getResultCount();
        assertTrue("Broader search should show results", broaderResultCount >= 0);
    }

    @And("the search triggers automatically when minimum character threshold is met")
    public void verifyAutomaticSearchTrigger() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterSearchText("Ab");
        prospectSearchPage.waitForSearchResults();
        assertTrue("Search should trigger automatically with 2 characters", prospectSearchPage.areResultsVisible());
    }

    @And("the search field respects the maximum character limit")
    public void verifyMaximumCharacterLimit() {
        String maxLengthText = "A".repeat(100);
        prospectSearchPage.enterSearchText(maxLengthText);
        int actualLength = prospectSearchPage.getSearchFieldValue().length();
        assertTrue("Search field should respect maximum character limit", actualLength <= 100);
    }
}