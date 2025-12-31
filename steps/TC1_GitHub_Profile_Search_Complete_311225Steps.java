package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.assertions.PlaywrightAssertions;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSearchSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String selectedFollowerUrl;

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchComponent();
    }

    @And("the search component displays a text input field and a search button with magnifying glass icon")
    public void theSearchComponentDisplaysATextInputFieldAndASearchButtonWithMagnifyingGlassIcon() {
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input field should be visible");
        assertTrue(profileSearchPage.isSearchButtonVisible(), "Search button should be visible");
        assertTrue(profileSearchPage.isSearchButtonIconVisible(), "Search button magnifying glass icon should be visible");
    }

    @When("the user enters a valid existing GitHub username {string} in the search input field")
    public void theUserEntersAValidExistingGitHubUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals(username, profileSearchPage.getSearchInputValue(), "Username should be correctly entered in the input field");
    }

    @And("the user clicks the search button to execute the search")
    public void theUserClicksTheSearchButtonToExecuteTheSearch() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the metrics dashboard displays the total values for Repos, Followers, Following, and Gists")
    public void theMetricsDashboardDisplaysTheTotalValuesForReposFollowersFollowingAndGists() {
        assertTrue(profileSearchPage.isMetricsDashboardVisible(), "Metrics dashboard should be visible");
        assertTrue(profileSearchPage.isReposCountVisible(), "Repos count should be visible");
        assertTrue(profileSearchPage.isFollowersCountVisible(), "Followers count should be visible");
        assertTrue(profileSearchPage.isFollowingCountVisible(), "Following count should be visible");
        assertTrue(profileSearchPage.isGistsCountVisible(), "Gists count should be visible");
        
        String reposCount = profileSearchPage.getReposCount();
        String followersCount = profileSearchPage.getFollowersCount();
        String followingCount = profileSearchPage.getFollowingCount();
        String gistsCount = profileSearchPage.getGistsCount();
        
        assertNotNull(reposCount, "Repos count should have a value");
        assertNotNull(followersCount, "Followers count should have a value");
        assertNotNull(followingCount, "Following count should have a value");
        assertNotNull(gistsCount, "Gists count should have a value");
    }

    @And("the left section displays the user personal information including avatar, full name, username, biography, location, company, web link, and follow button")
    public void theLeftSectionDisplaysTheUserPersonalInformation() {
        assertTrue(profileSearchPage.isUserAvatarVisible(), "User avatar should be visible");
        assertTrue(profileSearchPage.isFullNameVisible(), "Full name should be visible");
        assertTrue(profileSearchPage.isUsernameVisible(), "Username should be visible");
        assertTrue(profileSearchPage.isBiographyVisible(), "Biography section should be visible");
        assertTrue(profileSearchPage.isLocationVisible(), "Location should be visible");
        assertTrue(profileSearchPage.isCompanyVisible(), "Company should be visible");
        assertTrue(profileSearchPage.isWebLinkVisible(), "Web link should be visible");
        assertTrue(profileSearchPage.isFollowButtonVisible(), "Follow button should be visible");
    }

    @And("the right section displays a vertical scrollable list of followers with avatars, usernames, and profile links")
    public void theRightSectionDisplaysAVerticalScrollableListOfFollowers() {
        assertTrue(profileSearchPage.isFollowersListVisible(), "Followers list should be visible");
        assertTrue(profileSearchPage.isFollowersListScrollable(), "Followers list should be scrollable");
        assertTrue(profileSearchPage.getFollowersCount() != null && !profileSearchPage.getFollowersCount().isEmpty(), 
            "Followers list should contain followers");
        assertTrue(profileSearchPage.areFollowerAvatarsVisible(), "Follower avatars should be visible");
        assertTrue(profileSearchPage.areFollowerUsernamesVisible(), "Follower usernames should be visible");
        assertTrue(profileSearchPage.areFollowerProfileLinksVisible(), "Follower profile links should be visible");
    }

    @And("the user avatar image loads correctly without broken image errors")
    public void theUserAvatarImageLoadsCorrectlyWithoutBrokenImageErrors() {
        assertTrue(profileSearchPage.isAvatarImageLoaded(), "Avatar image should load correctly without errors");
    }

    @And("the API request counter indicator displays the consumed API limit")
    public void theAPIRequestCounterIndicatorDisplaysTheConsumedAPILimit() {
        assertTrue(profileSearchPage.isApiRequestCounterVisible(), "API request counter should be visible");
        String counterText = profileSearchPage.getApiRequestCounterText();
        assertTrue(counterText.matches("\\d+/\\d+"), "API counter should display format like '51/60'");
    }

    @When("the user clicks on a follower link in the followers list")
    public void theUserClicksOnAFollowerLinkInTheFollowersList() {
        selectedFollowerUrl = profileSearchPage.getFirstFollowerProfileLink();
        profileSearchPage.clickFirstFollowerLink();
    }

    @Then("the system redirects to the corresponding GitHub profile page for that follower")
    public void theSystemRedirectsToTheCorrespondingGitHubProfilePageForThatFollower() {
        String currentUrl = page.url();
        assertTrue(currentUrl.contains("github.com"), "Should redirect to GitHub");
        assertTrue(currentUrl.contains(selectedFollowerUrl) || profileSearchPage.isProfilePageLoaded(), 
            "Should navigate to the follower's profile page");
    }
}