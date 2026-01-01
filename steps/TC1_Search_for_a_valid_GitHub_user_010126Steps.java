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

    @Given("the user navigates to the GitHub Profile Search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @Then("the search component is displayed with a text input field and a search button with magnifying glass icon")
    public void theSearchComponentIsDisplayedWithTextInputAndSearchButton() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid existing GitHub username {string} in the search input field")
    public void theUserEntersValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @Then("the username {string} is displayed correctly in the input field")
    public void theUsernameIsDisplayedCorrectlyInTheInputField(String expectedUsername) {
        String actualValue = profileSearchPage.getSearchInputValue();
        assertEquals("Username should match input value", expectedUsername, actualValue);
    }

    @When("the user clicks the search button with the magnifying glass icon")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system initiates a search request to the GitHub API")
    public void theSystemInitiatesSearchRequest() {
        profileSearchPage.waitForApiResponse();
    }

    @And("the user profile information is successfully retrieved and displayed on the screen")
    public void theUserProfileInformationIsDisplayed() {
        assertTrue("Profile container should be visible", profileSearchPage.isProfileContainerVisible());
    }

    @Then("the dashboard metrics are visible and contain the user data")
    public void theDashboardMetricsAreVisible() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
    }

    @And("the user information section is visible and contains the user data")
    public void theUserInformationSectionIsVisible() {
        assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarVisible());
        assertTrue("User name should be visible", profileSearchPage.isUserNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
    }

    @And("the followers list is visible and contains the user data")
    public void theFollowersListIsVisible() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }
}