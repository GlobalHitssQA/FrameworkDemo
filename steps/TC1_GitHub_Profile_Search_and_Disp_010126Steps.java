package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

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
    }

    @And("the search interface is displayed with input field and search button")
    public void theSearchInterfaceIsDisplayedWithInputFieldAndSearchButton() {
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input field should be visible");
        assertTrue(profileSearchPage.isSearchButtonVisible(), "Search button should be visible");
    }

    @When("the user enters a valid GitHub username {string} in the search input")
    public void theUserEntersAValidGitHubUsernameInTheSearchInput(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button to initiate the profile query")
    public void theUserClicksTheSearchButtonToInitiateTheProfileQuery() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves and displays the user profile information")
    public void theSystemRetrievesAndDisplaysTheUserProfileInformation() {
        assertTrue(profileSearchPage.isProfileContainerVisible(), "Profile container should be visible");
    }

    @And("the metrics dashboard displays Repos, Followers, Following, and Gists counters")
    public void theMetricsDashboardDisplaysReposFollowersFollowingAndGistsCounters() {
        assertTrue(profileSearchPage.isReposCounterVisible(), "Repos counter should be visible");
        assertTrue(profileSearchPage.isFollowersCounterVisible(), "Followers counter should be visible");
        assertTrue(profileSearchPage.isFollowingCounterVisible(), "Following counter should be visible");
        assertTrue(profileSearchPage.isGistsCounterVisible(), "Gists counter should be visible");
        
        String reposCount = profileSearchPage.getReposCounterText();
        String followersCount = profileSearchPage.getFollowersCounterText();
        String followingCount = profileSearchPage.getFollowingCounterText();
        String gistsCount = profileSearchPage.getGistsCounterText();
        
        assertNotNull(reposCount, "Repos count should not be null");
        assertNotNull(followersCount, "Followers count should not be null");
        assertNotNull(followingCount, "Following count should not be null");
        assertNotNull(gistsCount, "Gists count should not be null");
    }

    @And("the left section displays user personal details including Avatar, Full Name, Username, Biography, Location, Company, and Web Link")
    public void theLeftSectionDisplaysUserPersonalDetails() {
        assertTrue(profileSearchPage.isAvatarVisible(), "User avatar should be visible");
        assertTrue(profileSearchPage.isFullNameVisible(), "Full name should be visible");
        assertTrue(profileSearchPage.isUsernameVisible(), "Username should be visible");
        
        // Optional fields may show 'Not available' or be empty
        profileSearchPage.verifyBiographyDisplayed();
        profileSearchPage.verifyLocationDisplayed();
        profileSearchPage.verifyCompanyDisplayed();
        profileSearchPage.verifyWebLinkDisplayed();
    }

    @And("the Follow button is present and functional in the user details section")
    public void theFollowButtonIsPresentAndFunctional() {
        assertTrue(profileSearchPage.isFollowButtonVisible(), "Follow button should be visible");
        assertTrue(profileSearchPage.isFollowButtonEnabled(), "Follow button should be enabled");
    }

    @And("the right section displays the followers list with avatar, username, and profile link")
    public void theRightSectionDisplaysTheFollowersList() {
        assertTrue(profileSearchPage.isFollowersListVisible(), "Followers list should be visible");
        assertTrue(profileSearchPage.hasFollowerItems(), "Followers list should contain items");
        
        // Verify first follower has required elements
        assertTrue(profileSearchPage.isFirstFollowerAvatarVisible(), "First follower avatar should be visible");
        assertTrue(profileSearchPage.isFirstFollowerUsernameVisible(), "First follower username should be visible");
        assertTrue(profileSearchPage.isFirstFollowerProfileLinkVisible(), "First follower profile link should be visible");
    }

    @And("the followers list allows scrolling when exceeding container size")
    public void theFollowersListAllowsScrolling() {
        if (profileSearchPage.followersExceedContainerSize()) {
            assertTrue(profileSearchPage.isFollowersListScrollable(), "Followers list should be scrollable");
        }
    }

    @And("the API request counter indicator is displayed")
    public void theApiRequestCounterIndicatorIsDisplayed() {
        assertTrue(profileSearchPage.isRequestsIndicatorVisible(), "API requests indicator should be visible");
        String requestsText = profileSearchPage.getRequestsIndicatorText();
        assertTrue(requestsText.matches("\\d+/\\d+"), "Requests indicator should match pattern 'X/Y' (e.g., '51/60')");
    }
}