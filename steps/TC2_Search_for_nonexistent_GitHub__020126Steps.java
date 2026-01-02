package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import com.microsoft.playwright.Page;
import pages.GitHubSearchPage;
import static org.junit.Assert.assertTrue;

public class SearchNonExistentUserSteps {

    private Page page;
    private GitHubSearchPage gitHubSearchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.gitHubSearchPage = new GitHubSearchPage(page);
    }

    @Given("the user is on the GitHub search page")
    public void theUserIsOnTheGitHubSearchPage() {
        gitHubSearchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", gitHubSearchPage.isSearchInputVisible());
    }

    @When("the user enters a non-existent username in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField() {
        gitHubSearchPage.enterSearchQuery("usernotexist12345xyz");
    }

    @When("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        gitHubSearchPage.submitSearch();
    }

    @Then("the system should display a message indicating no users were found")
    public void theSystemShouldDisplayAMessageIndicatingNoUsersWereFound() {
        gitHubSearchPage.waitForSearchResults();
        assertTrue("No results message should be displayed", gitHubSearchPage.isNoResultsMessageDisplayed());
        assertTrue("Zero results count should be displayed", gitHubSearchPage.isZeroResultsCountDisplayed());
    }
}