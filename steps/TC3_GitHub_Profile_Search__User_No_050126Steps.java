package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubSearchSteps {
    private Page page;
    private GitHubSearchPage searchPage;

    public GitHubSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the user is on the GitHub profile search page")
    public void theUserIsOnTheGitHubProfileSearchPage() {
        searchPage.navigateToSearchPage();
        assertTrue("Search interface should be visible", searchPage.isSearchInterfaceVisible());
    }

    @When("the user enters a non-existent username {string}")
    public void theUserEntersANonExistentUsername(String username) {
        searchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.clickSearchButton();
        searchPage.waitForApiResponse();
    }

    @Then("an error message or empty state should be displayed")
    public void anErrorMessageOrEmptyStateShouldBeDisplayed() {
        assertTrue("Error message or empty state should be visible", 
            searchPage.isErrorMessageVisible() || searchPage.isEmptyStateVisible());
    }

    @And("the error message should indicate the user was not found")
    public void theErrorMessageShouldIndicateTheUserWasNotFound() {
        String errorText = searchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorText.toLowerCase().contains("not found") || 
            errorText.toLowerCase().contains("no user") ||
            errorText.toLowerCase().contains("doesn't exist"));
    }
}