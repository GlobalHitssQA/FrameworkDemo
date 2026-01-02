package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {
    private Page page;
    private GitHubProfileSearchPage searchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub Profile Search component is displayed")
    public void theGitHubProfileSearchComponentIsDisplayed() {
        searchPage.navigateToSearchPage();
        assertTrue("Search component should be visible", searchPage.isSearchComponentVisible());
    }

    @When("I enter a non-existent username {string} in the search field")
    public void iEnterANonExistentUsernameInTheSearchField(String username) {
        searchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, searchPage.getSearchInputValue());
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        searchPage.clickSearchButton();
    }

    @And("I wait for the API response")
    public void iWaitForTheAPIResponse() {
        searchPage.waitForAPIResponse();
    }

    @Then("an error message or empty state should be displayed")
    public void anErrorMessageOrEmptyStateShouldBeDisplayed() {
        assertTrue("Error message or empty state should be visible", 
            searchPage.isErrorMessageVisible() || searchPage.isEmptyStateVisible());
    }

    @And("no profile data should be visible")
    public void noProfileDataShouldBeVisible() {
        assertFalse("Profile data should not be displayed", searchPage.isProfileDataVisible());
    }
}