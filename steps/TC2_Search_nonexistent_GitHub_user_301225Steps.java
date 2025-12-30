package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class NonExistentUserSearchSteps {

    private Page page;
    private GitHubProfileSearchPage searchPage;

    public NonExistentUserSearchSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub Profile Search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        searchPage.navigateToSearchComponent();
        assertTrue("Search component should be displayed", searchPage.isSearchComponentDisplayed());
    }

    @When("the user enters a non-existent username {string} in the search input")
    public void theUserEntersANonExistentUsernameInTheSearchInput(String username) {
        searchPage.enterUsername(username);
        assertEquals("Username should be entered in input field", username, searchPage.getSearchInputValue());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.clickSearchButton();
    }

    @Then("the system should display a user-friendly error message")
    public void theSystemShouldDisplayAUserFriendlyErrorMessage() {
        assertTrue("Error message should be visible", searchPage.isErrorMessageDisplayed());
        String errorMessage = searchPage.getErrorMessageText();
        assertFalse("Error message should not contain technical details", 
            errorMessage.contains("404") || errorMessage.contains("Exception") || errorMessage.contains("Error:"));
    }

    @And("no profile data should be displayed")
    public void noProfileDataShouldBeDisplayed() {
        assertFalse("User avatar should not be visible", searchPage.isUserAvatarVisible());
        assertFalse("User name should not be visible", searchPage.isUserNameVisible());
        assertFalse("User bio should not be visible", searchPage.isUserBioVisible());
    }

    @And("no metrics dashboard should be visible")
    public void noMetricsDashboardShouldBeVisible() {
        assertFalse("Repos counter should not be visible", searchPage.isReposCounterVisible());
        assertFalse("Followers counter should not be visible", searchPage.isFollowersCounterVisible());
        assertFalse("Following counter should not be visible", searchPage.isFollowingCounterVisible());
        assertFalse("Gists counter should not be visible", searchPage.isGistsCounterVisible());
    }

    @And("no follower list should be displayed")
    public void noFollowerListShouldBeDisplayed() {
        assertFalse("Followers list should not be visible", searchPage.isFollowersListVisible());
    }

    @And("the search input should remain functional")
    public void theSearchInputShouldRemainFunctional() {
        assertTrue("Search input should be enabled", searchPage.isSearchInputEnabled());
        searchPage.clearSearchInput();
        assertEquals("Search input should be clearable", "", searchPage.getSearchInputValue());
    }

    @And("the search button should remain functional")
    public void theSearchButtonShouldRemainFunctional() {
        assertTrue("Search button should be enabled", searchPage.isSearchButtonEnabled());
    }
}