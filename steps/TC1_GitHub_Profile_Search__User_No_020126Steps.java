package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub Profile Search page")
    public void theUserIsOnTheGitHubProfileSearchPage() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search interface should be displayed", profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters an invalid username {string} in the search field")
    public void theUserEntersAnInvalidUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should display a user not found error message")
    public void theSystemShouldDisplayAUserNotFoundErrorMessage() {
        assertTrue("Error message should be visible", profileSearchPage.isErrorMessageDisplayed());
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no user") ||
            errorMessage.toLowerCase().contains("doesn't exist"));
    }

    @And("no profile information should be displayed")
    public void noProfileInformationShouldBeDisplayed() {
        assertFalse("User avatar should not be visible", profileSearchPage.isUserAvatarDisplayed());
        assertFalse("User name should not be visible", profileSearchPage.isUserNameDisplayed());
        assertFalse("User bio should not be visible", profileSearchPage.isUserBioDisplayed());
        assertFalse("User location should not be visible", profileSearchPage.isUserLocationDisplayed());
        assertFalse("User company should not be visible", profileSearchPage.isUserCompanyDisplayed());
    }

    @And("no metrics dashboard should be visible")
    public void noMetricsDashboardShouldBeVisible() {
        assertFalse("Repos metric should not be visible", profileSearchPage.isReposMetricDisplayed());
        assertFalse("Followers metric should not be visible", profileSearchPage.isFollowersMetricDisplayed());
        assertFalse("Following metric should not be visible", profileSearchPage.isFollowingMetricDisplayed());
        assertFalse("Gists metric should not be visible", profileSearchPage.isGistsMetricDisplayed());
    }

    @And("no followers list should be displayed")
    public void noFollowersListShouldBeDisplayed() {
        assertFalse("Followers list should not be visible", profileSearchPage.isFollowersListDisplayed());
    }
}