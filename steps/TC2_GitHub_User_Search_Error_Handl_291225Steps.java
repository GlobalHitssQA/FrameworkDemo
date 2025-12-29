package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubUserSearchErrorSteps {

    private Page page;
    private GitHubSearchPage gitHubSearchPage;

    public GitHubUserSearchErrorSteps(Page page) {
        this.page = page;
        this.gitHubSearchPage = new GitHubSearchPage(page);
    }

    @Given("the GitHub profile search component is displayed")
    public void theGitHubProfileSearchComponentIsDisplayed() {
        gitHubSearchPage.navigateToSearchComponent();
        assertTrue("Search component should be displayed", gitHubSearchPage.isSearchComponentDisplayed());
    }

    @And("the search input field is empty and the search button is enabled")
    public void theSearchInputFieldIsEmptyAndTheSearchButtonIsEnabled() {
        assertTrue("Search input should be empty", gitHubSearchPage.isSearchInputEmpty());
        assertTrue("Search button should be enabled", gitHubSearchPage.isSearchButtonEnabled());
    }

    @When("I enter a non-existent GitHub username {string} in the search input")
    public void iEnterANonExistentGitHubUsernameInTheSearchInput(String username) {
        gitHubSearchPage.enterUsername(username);
        assertEquals("Username should be entered in the input field", username, gitHubSearchPage.getSearchInputValue());
    }

    @And("I click the search button to execute the query")
    public void iClickTheSearchButtonToExecuteTheQuery() {
        gitHubSearchPage.clickSearchButton();
        gitHubSearchPage.waitForSearchResponse();
    }

    @Then("a user-friendly error message should be displayed indicating the user does not exist")
    public void aUserFriendlyErrorMessageShouldBeDisplayedIndicatingTheUserDoesNotExist() {
        assertTrue("Error message should be visible", gitHubSearchPage.isErrorMessageDisplayed());
        String errorMessage = gitHubSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("does not exist") ||
            errorMessage.toLowerCase().contains("no user"));
    }

    @And("no profile information or metrics should be displayed")
    public void noProfileInformationOrMetricsShouldBeDisplayed() {
        assertFalse("User avatar should not be visible", gitHubSearchPage.isUserAvatarDisplayed());
        assertFalse("User name should not be visible", gitHubSearchPage.isUserNameDisplayed());
        assertFalse("Metrics section should not be visible", gitHubSearchPage.isMetricsSectionDisplayed());
    }

    @And("the dashboard section should remain empty or hidden")
    public void theDashboardSectionShouldRemainEmptyOrHidden() {
        assertFalse("Dashboard section should not be visible", gitHubSearchPage.isDashboardSectionDisplayed());
    }

    @And("the followers list should remain empty or hidden")
    public void theFollowersListShouldRemainEmptyOrHidden() {
        assertFalse("Followers list should not be visible", gitHubSearchPage.isFollowersListDisplayed());
    }
}