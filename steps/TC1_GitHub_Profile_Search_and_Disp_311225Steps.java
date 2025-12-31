package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String followerProfileUrl;

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search interface should be displayed", profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters a valid username {string} in the search input field")
    public void theUserEntersAValidUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, profileSearchPage.getSearchInputValue());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the metrics dashboard displays the correct values for repos followers following and gists")
    public void theMetricsDashboardDisplaysTheCorrectValuesForReposFollowersFollowingAndGists() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        assertNotNull("Repos count should have a value", profileSearchPage.getReposCount());
        assertNotNull("Followers count should have a value", profileSearchPage.getFollowersCount());
        assertNotNull("Following count should have a value", profileSearchPage.getFollowingCount());
        assertNotNull("Gists count should have a value", profileSearchPage.getGistsCount());
    }

    @And("the left section displays the user personal information including avatar name biography location company web link and follow button")
    public void theLeftSectionDisplaysTheUserPersonalInformation() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Biography should be visible", profileSearchPage.isBiographyVisible());
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
        assertTrue("Web link should be visible", profileSearchPage.isWebLinkVisible());
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
    }

    @And("the right section displays a scrollable followers list with avatars usernames and profile links")
    public void theRightSectionDisplaysAScrollableFollowersListWithAvatarsUsernamesAndProfileLinks() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
        assertTrue("Follower avatars should be visible", profileSearchPage.areFollowerAvatarsVisible());
        assertTrue("Follower usernames should be visible", profileSearchPage.areFollowerUsernamesVisible());
        assertTrue("Follower profile links should be visible", profileSearchPage.areFollowerProfileLinksVisible());
    }

    @And("the API request limit indicator is displayed")
    public void theAPIRequestLimitIndicatorIsDisplayed() {
        assertTrue("API request limit indicator should be visible", profileSearchPage.isApiLimitIndicatorVisible());
        String limitText = profileSearchPage.getApiLimitText();
        assertTrue("API limit should show format like XX/60", limitText.matches("\\d+/\\d+"));
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        followerProfileUrl = profileSearchPage.getFirstFollowerProfileUrl();
        profileSearchPage.clickFirstFollowerLink();
    }

    @Then("the system redirects to the corresponding GitHub profile page")
    public void theSystemRedirectsToTheCorrespondingGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("Should redirect to GitHub profile", currentUrl.contains("github.com"));
        profileSearchPage.navigateBack();
    }

    @When("the user resizes the browser to mobile dimensions")
    public void theUserResizesTheBrowserToMobileDimensions() {
        profileSearchPage.resizeToMobile(375, 667);
    }

    @Then("the interface adapts correctly to mobile view")
    public void theInterfaceAdaptsCorrectlyToMobileView() {
        assertTrue("Search interface should remain visible in mobile", profileSearchPage.isSearchInterfaceDisplayed());
        assertTrue("Profile content should be visible in mobile", profileSearchPage.isProfileContentVisibleMobile());
        browser.close();
        playwright.close();
    }
}