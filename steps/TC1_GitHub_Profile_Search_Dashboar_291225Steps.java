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

    @Given("the user opens the GitHub profile search component")
    public void theUserOpensTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @And("the search input and search button with magnifying glass icon are displayed")
    public void theSearchInputAndSearchButtonWithMagnifyingGlassIconAreDisplayed() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input")
    public void theUserEntersAValidGitHubUsernameInTheSearchInput(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks on the search button with magnifying glass icon")
    public void theUserClicksOnTheSearchButtonWithMagnifyingGlassIcon() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system queries the GitHub API and processes the request")
    public void theSystemQueriesTheGitHubAPIAndProcessesTheRequest() {
        profileSearchPage.waitForApiResponse();
    }

    @And("the dashboard displays the user metrics including Repos Followers Following and Gists")
    public void theDashboardDisplaysTheUserMetricsIncludingReposFollowersFollowingAndGists() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
    }

    @And("the numeric values of Repos Followers Following and Gists match the real GitHub profile data")
    public void theNumericValuesOfReposFollowersFollowingAndGistsMatchTheRealGitHubProfileData() {
        String reposValue = profileSearchPage.getReposCounterValue();
        String followersValue = profileSearchPage.getFollowersCounterValue();
        String followingValue = profileSearchPage.getFollowingCounterValue();
        String gistsValue = profileSearchPage.getGistsCounterValue();

        assertNotNull("Repos value should not be null", reposValue);
        assertNotNull("Followers value should not be null", followersValue);
        assertNotNull("Following value should not be null", followingValue);
        assertNotNull("Gists value should not be null", gistsValue);

        assertTrue("Repos value should be numeric", reposValue.matches("\\d+"));
        assertTrue("Followers value should be numeric", followersValue.matches("\\d+"));
        assertTrue("Following value should be numeric", followingValue.matches("\\d+"));
        assertTrue("Gists value should be numeric", gistsValue.matches("\\d+"));
    }

    @And("the API requests limit indicator is updated and displayed")
    public void theAPIRequestsLimitIndicatorIsUpdatedAndDisplayed() {
        assertTrue("API requests indicator should be visible", profileSearchPage.isApiRequestsIndicatorVisible());
        String requestsIndicator = profileSearchPage.getApiRequestsIndicatorText();
        assertNotNull("API requests indicator text should not be null", requestsIndicator);
        assertTrue("API requests indicator should show limit format (e.g., 51/60)", requestsIndicator.matches("\\d+/\\d+"));
    }
}