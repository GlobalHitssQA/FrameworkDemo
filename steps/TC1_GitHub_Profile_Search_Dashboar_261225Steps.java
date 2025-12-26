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

    @Given("the user accesses the GitHub profile search component")
    public void theUserAccessesTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
    }

    @And("the search input and search button with magnifying glass icon are enabled")
    public void theSearchInputAndSearchButtonWithMagnifyingGlassIconAreEnabled() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search input should be enabled", profileSearchPage.isSearchInputEnabled());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
        assertTrue("Search button should be enabled", profileSearchPage.isSearchButtonEnabled());
    }

    @When("the user enters a valid existing GitHub username {string} in the search field")
    public void theUserEntersAValidExistingGitHubUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be displayed in search field", username, profileSearchPage.getSearchInputValue());
    }

    @And("the user clicks the search button with magnifying glass icon")
    public void theUserClicksTheSearchButtonWithMagnifyingGlassIcon() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system displays a loading indicator while processing the request")
    public void theSystemDisplaysALoadingIndicatorWhileProcessingTheRequest() {
        assertTrue("Loading indicator should be visible", profileSearchPage.isLoadingIndicatorVisible());
    }

    @And("the system successfully retrieves the user profile data from GitHub API")
    public void theSystemSuccessfullyRetrievesTheUserProfileDataFromGitHubAPI() {
        profileSearchPage.waitForProfileDataToLoad();
        assertTrue("Profile data should be loaded", profileSearchPage.isProfileDataLoaded());
    }

    @And("the metrics dashboard displays the Repos counter with numeric value")
    public void theMetricsDashboardDisplaysTheReposCounterWithNumericValue() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        String reposValue = profileSearchPage.getReposCounterValue();
        assertNotNull("Repos value should not be null", reposValue);
        assertTrue("Repos value should be numeric", reposValue.matches("\\d+"));
    }

    @And("the metrics dashboard displays the Followers counter with numeric value")
    public void theMetricsDashboardDisplaysTheFollowersCounterWithNumericValue() {
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        String followersValue = profileSearchPage.getFollowersCounterValue();
        assertNotNull("Followers value should not be null", followersValue);
        assertTrue("Followers value should be numeric", followersValue.matches("[\\d,.kKmM]+"));
    }

    @And("the metrics dashboard displays the Following counter with numeric value")
    public void theMetricsDashboardDisplaysTheFollowingCounterWithNumericValue() {
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        String followingValue = profileSearchPage.getFollowingCounterValue();
        assertNotNull("Following value should not be null", followingValue);
        assertTrue("Following value should be numeric", followingValue.matches("\\d+"));
    }

    @And("the metrics dashboard displays the Gists counter with numeric value")
    public void theMetricsDashboardDisplaysTheGistsCounterWithNumericValue() {
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
        String gistsValue = profileSearchPage.getGistsCounterValue();
        assertNotNull("Gists value should not be null", gistsValue);
        assertTrue("Gists value should be numeric", gistsValue.matches("\\d+"));
    }

    @And("the API requests indicator is visible with the consumed requests format")
    public void theAPIRequestsIndicatorIsVisibleWithTheConsumedRequestsFormat() {
        assertTrue("API requests indicator should be visible", profileSearchPage.isApiRequestsIndicatorVisible());
        String requestsText = profileSearchPage.getApiRequestsIndicatorText();
        assertNotNull("API requests text should not be null", requestsText);
        assertTrue("API requests should match format X/Y", requestsText.matches("\\d+/\\d+"));
    }
}