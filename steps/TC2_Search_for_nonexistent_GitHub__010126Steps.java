package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubSearchPage;
import static org.junit.Assert.assertTrue;

public class SearchNonExistentUserSteps {

    private Page page;
    private GitHubSearchPage searchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the user navigates to the GitHub search page")
    public void theUserNavigatesToTheGitHubSearchPage() {
        searchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
    }

    @When("the user enters a non-existent username {string} in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField(String username) {
        searchPage.enterSearchQuery(username);
        assertTrue("Username should be displayed in input field", 
            searchPage.getSearchInputValue().equals(username));
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.submitSearch();
    }

    @And("the user filters results by users")
    public void theUserFiltersResultsByUsers() {
        searchPage.clickUsersFilter();
    }

    @Then("the system displays an empty state message indicating the user was not found")
    public void theSystemDisplaysAnEmptyStateMessageIndicatingTheUserWasNotFound() {
        assertTrue("Empty state message should be visible", 
            searchPage.isNoUsersFoundMessageVisible());
        assertTrue("Results count should show 0 results", 
            searchPage.getResultsCount().contains("0 results"));
    }
}