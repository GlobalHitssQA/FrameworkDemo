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
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters a valid GitHub username {string} in the search input field")
    public void theUserEntersAValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be displayed in input field", username, profileSearchPage.getEnteredUsername());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @And("the system retrieves the user profile data from GitHub API")
    public void theSystemRetrievesTheUserProfileDataFromGitHubAPI() {
        profileSearchPage.waitForProfileDataToLoad();
    }

    @Then("the profile dashboard with metrics should be displayed")
    public void theProfileDashboardWithMetricsShouldBeDisplayed() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
    }

    @And("the user details section should show complete information")
    public void theUserDetailsSectionShouldShowCompleteInformation() {
        assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
    }

    @And("the followers list should be visible")
    public void theFollowersListShouldBeVisible() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }
}