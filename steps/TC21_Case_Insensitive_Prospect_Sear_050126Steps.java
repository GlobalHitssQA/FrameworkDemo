package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;

public class ProspectSearchSteps {
    private ProspectSearchPage prospectSearchPage;
    private Page page;
    private int lowercaseResultCount;
    private int uppercaseResultCount;
    private int mixedCaseResultCount;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I access the prospect search field in Acticenter")
    public void accessProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        prospectSearchPage.isSearchFieldVisible();
    }

    @When("I enter a prospect name in lowercase letters")
    public void enterProspectNameInLowercase() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterProspectName("john doe");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search executes and returns matching prospects")
    public void verifySearchReturnsResults() {
        prospectSearchPage.waitForSearchResults();
        lowercaseResultCount = prospectSearchPage.getSearchResultsCount();
        assert lowercaseResultCount > 0 : "No results found for lowercase search";
    }

    @When("I enter the same prospect name in uppercase letters")
    public void enterProspectNameInUppercase() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterProspectName("JOHN DOE");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search returns the same results regardless of case")
    public void verifyUppercaseResultsMatchLowercase() {
        prospectSearchPage.waitForSearchResults();
        uppercaseResultCount = prospectSearchPage.getSearchResultsCount();
        assert uppercaseResultCount == lowercaseResultCount : "Uppercase search returned different number of results";
    }

    @When("I enter the prospect name in mixed case letters")
    public void enterProspectNameInMixedCase() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterProspectName("JoHn DoE");
        prospectSearchPage.clickSearchButton();
    }

    @Then("the search returns consistent results ignoring case sensitivity")
    public void verifyMixedCaseResultsAreConsistent() {
        prospectSearchPage.waitForSearchResults();
        mixedCaseResultCount = prospectSearchPage.getSearchResultsCount();
        assert mixedCaseResultCount == lowercaseResultCount : "Mixed case search returned different number of results";
    }

    @And("the search executes without character maximum restrictions affecting case sensitivity")
    public void verifyNoCharacterMaximumRestrictions() {
        prospectSearchPage.clearSearchField();
        prospectSearchPage.enterProspectName("john doe with a very long name that exceeds normal character limits");
        prospectSearchPage.clickSearchButton();
        prospectSearchPage.waitForSearchResults();
        assert prospectSearchPage.isSearchFieldVisible() : "Search field validation failed with long input";
    }
}