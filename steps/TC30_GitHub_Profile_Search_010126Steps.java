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

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @And("the search component is displayed with a text input field and a search button")
    public void theSearchComponentIsDisplayedWithTextInputAndSearchButton() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input field")
    public void theUserEntersValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button with magnifying glass icon")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system initiates a request to the GitHub API")
    public void theSystemInitiatesRequestToGitHubAPI() {
        profileSearchPage.waitForApiResponse();
    }

    @And("the user profile information is displayed on the dashboard")
    public void theUserProfileInformationIsDisplayedOnDashboard() {
        assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
    }

    @And("the metrics section shows Repos, Followers, Following and Gists")
    public void theMetricsSectionShowsAllMetrics() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
    }

    @And("the followers list is displayed")
    public void theFollowersListIsDisplayed() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }
}