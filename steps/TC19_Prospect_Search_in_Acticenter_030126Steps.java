package stepDefinitions;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.ProspectSearchPage;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("I am on the prospect search screen in Acticenter")
    public void iAmOnProspectSearchScreen() {
        prospectSearchPage.navigateToSearchScreen();
        assertTrue("Search interface should be visible", prospectSearchPage.isSearchInterfaceVisible());
        assertTrue("Search input field should be visible", prospectSearchPage.isSearchInputVisible());
        assertTrue("Magnifying glass icon should be visible", prospectSearchPage.isSearchIconVisible());
    }

    @When("I enter valid search criteria with more than 2 characters")
    public void iEnterValidSearchCriteria() {
        prospectSearchPage.enterSearchCriteria("John");
        String searchText = prospectSearchPage.getSearchInputValue();
        assertTrue("Search text should be entered correctly", searchText.length() > 2);
    }

    @And("I click the magnifying glass search icon")
    public void iClickMagnifyingGlassIcon() {
        prospectSearchPage.clickSearchIcon();
    }

    @Then("the search results should be displayed")
    public void searchResultsShouldBeDisplayed() {
        prospectSearchPage.waitForSearchResults();
        assertTrue("Search results container should be visible", prospectSearchPage.isResultsContainerVisible());
    }

    @And("matching prospects should appear in the results list or a no results message should be shown")
    public void matchingProspectsOrNoResultsMessage() {
        boolean hasResults = prospectSearchPage.hasSearchResults();
        boolean hasNoResultsMessage = prospectSearchPage.isNoResultsMessageVisible();
        assertTrue("Either results or no results message should be displayed", hasResults || hasNoResultsMessage);
    }
}