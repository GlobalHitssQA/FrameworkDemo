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
    private GitHubProfileSearchPage profileSearchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub profile search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
        assertTrue("Search component should be displayed", profileSearchPage.isSearchComponentDisplayed());
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters an invalid username {string} in the search input field")
    public void theUserEntersAnInvalidUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, profileSearchPage.getSearchInputValue());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should display an error message indicating the user was not found")
    public void theSystemShouldDisplayAnErrorMessageIndicatingTheUserWasNotFound() {
        assertTrue("Error message should be displayed", profileSearchPage.isErrorMessageDisplayed());
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no user") ||
            errorMessage.toLowerCase().contains("doesn't exist"));
    }

    @And("no profile data or metrics should be displayed")
    public void noProfileDataOrMetricsShouldBeDisplayed() {
        assertFalse("User avatar should not be displayed", profileSearchPage.isUserAvatarDisplayed());
        assertFalse("User name should not be displayed", profileSearchPage.isUserNameDisplayed());
        assertFalse("Metrics dashboard should not be displayed", profileSearchPage.isMetricsDashboardDisplayed());
        assertFalse("Followers list should not be displayed", profileSearchPage.isFollowersListDisplayed());
        assertFalse("Biography should not be displayed", profileSearchPage.isBiographyDisplayed());
    }
}