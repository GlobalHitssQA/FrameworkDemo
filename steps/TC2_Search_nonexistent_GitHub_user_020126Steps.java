package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class SearchNonExistentUserSteps {

    private Page page;
    private GitHubProfileSearchPage searchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        searchPage.navigateToSearchPage();
    }

    @And("the search input field and search button are visible")
    public void theSearchInputFieldAndSearchButtonAreVisible() {
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }

    @When("the user enters {string} in the username search field")
    public void theUserEntersUsernameInTheSearchField(String username) {
        searchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.clickSearchButton();
    }

    @Then("the system displays an error message indicating user was not found")
    public void theSystemDisplaysAnErrorMessage() {
        assertTrue("Error message should be visible", searchPage.isErrorMessageVisible());
        String errorText = searchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorText.toLowerCase().contains("not found") || 
            errorText.toLowerCase().contains("no user") ||
            errorText.toLowerCase().contains("doesn't exist"));
    }

    @And("no profile information is displayed")
    public void noProfileInformationIsDisplayed() {
        assertFalse("User avatar should not be visible", searchPage.isUserAvatarVisible());
        assertFalse("User name should not be visible", searchPage.isUserNameVisible());
        assertFalse("User bio should not be visible", searchPage.isUserBioVisible());
        assertFalse("User location should not be visible", searchPage.isUserLocationVisible());
        assertFalse("User company should not be visible", searchPage.isUserCompanyVisible());
    }

    @And("no user metrics are displayed")
    public void noUserMetricsAreDisplayed() {
        assertFalse("Repos counter should not be visible", searchPage.isReposCounterVisible());
        assertFalse("Followers counter should not be visible", searchPage.isFollowersCounterVisible());
        assertFalse("Following counter should not be visible", searchPage.isFollowingCounterVisible());
        assertFalse("Gists counter should not be visible", searchPage.isGistsCounterVisible());
    }

    @And("no followers list is displayed")
    public void noFollowersListIsDisplayed() {
        assertFalse("Followers list should not be visible", searchPage.isFollowersListVisible());
    }

    @And("the search input field remains accessible for a new search")
    public void theSearchInputFieldRemainsAccessible() {
        assertTrue("Search input should still be visible", searchPage.isSearchInputVisible());
        assertTrue("Search input should be enabled", searchPage.isSearchInputEnabled());
        assertTrue("Search button should still be visible", searchPage.isSearchButtonVisible());
        assertTrue("Search button should be enabled", searchPage.isSearchButtonEnabled());
    }
}