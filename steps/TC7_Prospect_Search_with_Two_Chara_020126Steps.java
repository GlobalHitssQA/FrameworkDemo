package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import pages.ProspectSearchPage;
import com.microsoft.playwright.Page;
import static org.junit.Assert.*;

public class ProspectSearchSteps {
    private Page page;
    private ProspectSearchPage prospectSearchPage;

    public ProspectSearchSteps(Page page) {
        this.page = page;
        this.prospectSearchPage = new ProspectSearchPage(page);
    }

    @Given("the advisor is logged into Acticenter")
    public void theAdvisorIsLoggedIntoActicenter() {
        prospectSearchPage.navigateToActicenter();
        prospectSearchPage.loginAsAdvisor();
    }

    @When("the advisor navigates to the prospect search field")
    public void theAdvisorNavigatesToTheProspectSearchField() {
        prospectSearchPage.navigateToProspectSearch();
        assertTrue("Search field should be visible", prospectSearchPage.isSearchFieldVisible());
        assertTrue("Search icon should be visible", prospectSearchPage.isSearchIconVisible());
    }

    @When("the advisor types exactly {int} characters in the search field")
    public void theAdvisorTypesExactlyCharactersInTheSearchField(int numCharacters) {
        String searchText = "AB"; // Exactly 2 characters
        prospectSearchPage.fillSearchField(searchText);
    }

    @When("the advisor clicks the search icon")
    public void theAdvisorClicksTheSearchIcon() {
        prospectSearchPage.clickSearchIcon();
    }

    @Then("the system displays prospect search results matching the 2-character input")
    public void theSystemDisplaysProspectSearchResultsMatchingTheTwoCharacterInput() {
        assertTrue("Search results should be visible", prospectSearchPage.isSearchResultsVisible());
        assertTrue("Search results should contain at least one item", prospectSearchPage.getSearchResultsCount() > 0);
    }

    @When("the advisor clears the search field")
    public void theAdvisorClearsTheSearchField() {
        prospectSearchPage.clearSearchField();
    }

    @When("the advisor types more than {int} characters in the search field")
    public void theAdvisorTypesMoreThanCharactersInTheSearchField(int numCharacters) {
        String searchText = "ABCDE"; // More than 2 characters
        prospectSearchPage.fillSearchField(searchText);
    }

    @Then("the system displays prospect search results corresponding to the entered characters")
    public void theSystemDisplaysProspectSearchResultsCorrespondingToTheEnteredCharacters() {
        assertTrue("Search results should be visible", prospectSearchPage.isSearchResultsVisible());
        assertTrue("Search results should contain at least one item", prospectSearchPage.getSearchResultsCount() > 0);
    }
}