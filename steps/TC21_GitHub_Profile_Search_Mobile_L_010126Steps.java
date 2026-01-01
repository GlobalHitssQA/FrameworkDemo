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

public class MobileLandscapeOrientationSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    // Mobile viewport dimensions
    private static final int MOBILE_PORTRAIT_WIDTH = 375;
    private static final int MOBILE_PORTRAIT_HEIGHT = 667;
    private static final int MOBILE_LANDSCAPE_WIDTH = 667;
    private static final int MOBILE_LANDSCAPE_HEIGHT = 375;

    @Given("the user accesses the GitHub profile search application on a mobile device")
    public void theUserAccessesTheApplicationOnMobileDevice() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext(new Browser.NewContextOptions()
            .setViewportSize(MOBILE_PORTRAIT_WIDTH, MOBILE_PORTRAIT_HEIGHT)
            .setIsMobile(true)
            .setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"));
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateToApplication();
        assertTrue("Application should load successfully on mobile device", profileSearchPage.isApplicationLoaded());
    }

    @When("the user rotates the device to landscape orientation")
    public void theUserRotatesDeviceToLandscape() {
        page.setViewportSize(MOBILE_LANDSCAPE_WIDTH, MOBILE_LANDSCAPE_HEIGHT);
        assertTrue("Interface should adjust to landscape mode", profileSearchPage.isLandscapeLayoutActive());
    }

    @And("the user searches for a valid GitHub username {string}")
    public void theUserSearchesForValidUsername(String username) {
        profileSearchPage.enterUsername(username);
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForSearchResults();
    }

    @Then("the search functionality works correctly in landscape mode")
    public void searchFunctionalityWorksInLandscapeMode() {
        assertTrue("Search results should be displayed", profileSearchPage.areSearchResultsVisible());
        assertFalse("Error message should not be displayed", profileSearchPage.isErrorMessageVisible());
    }

    @And("the dashboard metrics are displayed properly in landscape orientation")
    public void dashboardMetricsDisplayedProperly() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
        assertTrue("Metrics should be readable in landscape", profileSearchPage.areMetricsReadableInLandscape());
    }

    @And("the user information section displays correctly with avatar username biography location company and website")
    public void userInformationSectionDisplaysCorrectly() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Biography section should be visible", profileSearchPage.isBiographyVisible());
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
        assertTrue("Website link should be visible", profileSearchPage.isWebsiteLinkVisible());
        assertTrue("User info section should be properly arranged", profileSearchPage.isUserInfoSectionProperlyArranged());
    }

    @And("the followers list is accessible and scrollable without layout issues")
    public void followersListIsAccessibleAndScrollable() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        assertTrue("Followers list should allow vertical scrolling", profileSearchPage.isFollowersListScrollable());
        profileSearchPage.scrollFollowersList();
        assertFalse("No layout issues should occur after scrolling", profileSearchPage.hasLayoutIssues());
    }
}