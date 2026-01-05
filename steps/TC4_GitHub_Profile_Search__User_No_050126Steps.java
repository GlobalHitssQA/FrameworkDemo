package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubSearchSteps {
    private Page page;
    private GitHubSearchPage searchPage;

    public GitHubSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubSearch() {
        searchPage.navigateTo();
        assertTrue("Search component should be visible", searchPage.isSearchComponentVisible());
    }

    @When("the user searches for a non-existent GitHub username")
    public void searchForNonExistentUser() {
        searchPage.searchForUser("nonexistentuser12345xyz9999");
    }

    @Then("an empty state message should be displayed")
    public void verifyEmptyStateDisplayed() {
        assertTrue("Empty state message should be visible", searchPage.isEmptyStateVisible());
    }

    @Then("the message should clearly indicate that no user was found")
    public void verifyErrorMessageText() {
        String errorMessage = searchPage.getEmptyStateMessage();
        assertNotNull("Error message should not be null", errorMessage);
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no results") ||
            errorMessage.toLowerCase().contains("no user"));
    }
}