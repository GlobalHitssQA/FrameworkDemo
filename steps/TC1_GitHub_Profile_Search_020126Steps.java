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
    private static final String BASE_URL = "https://github.com"; // Replace with actual app URL

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateTo(BASE_URL);
    }

    @And("the search component is displayed with input field and search button")
    public void theSearchComponentIsDisplayedWithInputFieldAndSearchButton() {
        assertTrue("Search input field should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search field")
    public void theUserEntersAValidGitHubUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the metrics dashboard displays Repos Followers Following and Gists values")
    public void theMetricsDashboardDisplaysReposFollowersFollowingAndGistsValues() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        
        assertNotNull("Repos value should not be null", profileSearchPage.getReposCount());
        assertNotNull("Followers value should not be null", profileSearchPage.getFollowersCount());
        assertNotNull("Following value should not be null", profileSearchPage.getFollowingCount());
        assertNotNull("Gists value should not be null", profileSearchPage.getGistsCount());
    }

    @And("the user details section displays avatar full name username biography location company and web link")
    public void theUserDetailsSectionDisplaysAvatarFullNameUsernameBiographyLocationCompanyAndWebLink() {
        assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarVisible());
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Biography section should be visible", profileSearchPage.isBiographyVisible());
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
        assertTrue("Web link should be visible", profileSearchPage.isWebLinkVisible());
    }

    @And("the Follow button is visible in the user details section")
    public void theFollowButtonIsVisibleInTheUserDetailsSection() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
    }

    @And("the followers list displays avatars usernames and profile links")
    public void theFollowersListDisplaysAvatarsUsernamesAndProfileLinks() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should have items", profileSearchPage.getFollowersCount() > 0);
        assertTrue("First follower avatar should be visible", profileSearchPage.isFirstFollowerAvatarVisible());
        assertTrue("First follower username should be visible", profileSearchPage.isFirstFollowerUsernameVisible());
        assertTrue("First follower profile link should be visible", profileSearchPage.isFirstFollowerProfileLinkVisible());
    }

    @And("the API request counter indicator is visible showing consumption limit")
    public void theAPIRequestCounterIndicatorIsVisibleShowingConsumptionLimit() {
        assertTrue("API request counter should be visible", profileSearchPage.isApiRequestCounterVisible());
        String counterText = profileSearchPage.getApiRequestCounterText();
        assertTrue("API counter should show format X/60", counterText.matches("\\d+/60"));
    }

    @And("the followers list supports vertical scrolling when content exceeds container")
    public void theFollowersListSupportsVerticalScrollingWhenContentExceedsContainer() {
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        profileSearchPage.clickFirstFollowerProfileLink();
    }

    @Then("the system redirects to the corresponding GitHub profile page")
    public void theSystemRedirectsToTheCorrespondingGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("URL should contain github.com profile path", currentUrl.contains("github.com/"));
        
        // Cleanup
        browser.close();
        playwright.close();
    }
}