package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;
    private String searchQuery;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am logged in as a Private Banking advisor on the Acticenter dashboard")
    public void iAmLoggedInAsPrivateBankingAdvisor() {
        // Assumption: User is already authenticated and dashboard is loaded
        prospectSearchPage.waitForDashboardToLoad();
        PlaywrightAssertions.assertThat(prospectSearchPage.getDashboardContainer()).isVisible();
    }

    @When("I locate the prospect search field in the active prospect list")
    public void iLocateProspectSearchField() {
        PlaywrightAssertions.assertThat(prospectSearchPage.getSearchField()).isVisible();
        PlaywrightAssertions.assertThat(prospectSearchPage.getSearchField()).isEnabled();
    }

    @And("I enter a valid prospect name or email with more than 2 characters")
    public void iEnterValidProspectNameOrEmail() {
        searchQuery = "John Doe";
        prospectSearchPage.enterSearchQuery(searchQuery);
    }

    @And("I press the Enter key")
    public void iPressEnterKey() {
        prospectSearchPage.pressEnterOnSearchField();
    }

    @Then("the search results should be displayed showing the first 5 matching prospects")
    public void searchResultsShouldBeDisplayed() {
        prospectSearchPage.waitForSearchResults();
        PlaywrightAssertions.assertThat(prospectSearchPage.getSearchResultsContainer()).isVisible();
        int resultsCount = prospectSearchPage.getSearchResultsCount();
        assert resultsCount > 0 && resultsCount <= 5 : "Results count should be between 1 and 5, but was " + resultsCount;
    }

    @And("each result should display the prospect name and email")
    public void eachResultShouldDisplayNameAndEmail() {
        assert prospectSearchPage.allResultsContainNameAndEmail() : "Not all results contain name and email";
    }

    @And("the displayed results should match the search criteria")
    public void displayedResultsShouldMatchSearchCriteria() {
        assert prospectSearchPage.resultsMatchSearchQuery(searchQuery) : "Results do not match search criteria";
    }

    @And("matching characters in prospect names should be highlighted")
    public void matchingCharactersShouldBeHighlighted() {
        assert prospectSearchPage.hasHighlightedMatchingText() : "Matching characters are not highlighted";
    }
}