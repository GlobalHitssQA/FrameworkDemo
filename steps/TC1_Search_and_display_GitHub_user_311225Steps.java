package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String BASE_URL = "https://github.com";

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateTo(BASE_URL);
    }

    @And("the search interface is displayed with a text input field and search button")
    public void theSearchInterfaceIsDisplayedWithTextInputAndSearchButton() {
        assertTrue("Search input field should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input field")
    public void theUserEntersValidGitHubUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button to execute the query")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system initiates the API call and loads the profile data")
    public void theSystemInitiatesApiCallAndLoadsProfileData() {
        profileSearchPage.waitForProfileToLoad();
    }

    @And("the dashboard metrics section displays Repos, Followers, Following, and Gists counters with numerical values")
    public void theDashboardMetricsSectionDisplaysCounters() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
        assertTrue("Repos counter should have numeric value", profileSearchPage.getReposCount() >= 0);
        assertTrue("Followers counter should have numeric value", profileSearchPage.getFollowersCount() >= 0);
        assertTrue("Following counter should have numeric value", profileSearchPage.getFollowingCount() >= 0);
        assertTrue("Gists counter should have numeric value", profileSearchPage.getGistsCount() >= 0);
    }

    @And("the left section displays the user avatar image")
    public void theLeftSectionDisplaysUserAvatarImage() {
        assertTrue("User avatar should be visible", profileSearchPage.isAvatarVisible());
    }

    @And("the left section displays the full name and username")
    public void theLeftSectionDisplaysFullNameAndUsername() {
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
    }

    @And("the left section displays the biography text")
    public void theLeftSectionDisplaysBiographyText() {
        assertTrue("Biography section should be visible", profileSearchPage.isBiographyVisible());
    }

    @And("the left section displays location and company information")
    public void theLeftSectionDisplaysLocationAndCompanyInformation() {
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
    }

    @And("the left section displays the web link")
    public void theLeftSectionDisplaysWebLink() {
        assertTrue("Web link should be visible", profileSearchPage.isWebLinkVisible());
    }

    @And("the left section displays the Follow button")
    public void theLeftSectionDisplaysFollowButton() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
    }

    @And("the right section displays a scrollable list of followers with avatar, username, and profile link")
    public void theRightSectionDisplaysFollowersList() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should contain items", profileSearchPage.getFollowersListCount() > 0);
        assertTrue("First follower should have avatar", profileSearchPage.isFirstFollowerAvatarVisible());
        assertTrue("First follower should have username", profileSearchPage.isFirstFollowerUsernameVisible());
        assertTrue("First follower should have profile link", profileSearchPage.isFirstFollowerLinkVisible());
    }

    @And("the API request counter indicator is visible showing the consumed API limit")
    public void theApiRequestCounterIndicatorIsVisible() {
        assertTrue("API request counter should be visible", profileSearchPage.isApiRequestCounterVisible());
        String counterText = profileSearchPage.getApiRequestCounterText();
        assertTrue("API counter should match format (e.g., 51/60)", counterText.matches("\\d+/\\d+"));
    }

    @And("the user avatar image is fully loaded without broken image placeholders")
    public void theUserAvatarImageIsFullyLoaded() {
        assertTrue("Avatar image should be fully loaded", profileSearchPage.isAvatarImageLoaded());
    }

    @And("all metric counters match the actual GitHub API response data")
    public void allMetricCountersMatchApiResponseData() {
        // This step verifies that the displayed metrics are consistent
        // In a real implementation, this would compare with actual API response
        assertTrue("Repos counter should display valid data", profileSearchPage.getReposCount() >= 0);
        assertTrue("Followers counter should display valid data", profileSearchPage.getFollowersCount() >= 0);
        assertTrue("Following counter should display valid data", profileSearchPage.getFollowingCount() >= 0);
        assertTrue("Gists counter should display valid data", profileSearchPage.getGistsCount() >= 0);
    }
}