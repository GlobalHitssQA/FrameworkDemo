package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.BrowserType;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class ResponsiveDesignSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfilePage profilePage;

    private static final int DESKTOP_WIDTH = 1920;
    private static final int DESKTOP_HEIGHT = 1080;
    private static final int MOBILE_PORTRAIT_WIDTH = 375;
    private static final int MOBILE_PORTRAIT_HEIGHT = 667;
    private static final int MOBILE_LANDSCAPE_WIDTH = 667;
    private static final int MOBILE_LANDSCAPE_HEIGHT = 375;
    private static final String TEST_USERNAME = "torvalds";

    @Given("the user opens the GitHub profile page on desktop viewport with resolution {int}x{int}")
    public void theUserOpensGitHubProfilePageOnDesktopViewport(int width, int height) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        context = browser.newContext(new Browser.NewContextOptions()
                .setViewportSize(width, height));
        page = context.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigate();
        assertTrue("Page should be loaded correctly on desktop", profilePage.isPageLoaded());
    }

    @When("the user searches for a GitHub user profile on desktop view")
    public void theUserSearchesForGitHubUserProfileOnDesktopView() {
        profilePage.navigateToUserProfile(TEST_USERNAME);
    }

    @Then("all profile information metrics and followers list are displayed in the desktop layout")
    public void allProfileInformationMetricsAndFollowersListAreDisplayedInDesktopLayout() {
        assertTrue("User avatar should be visible", profilePage.isUserAvatarVisible());
        assertTrue("User full name should be visible", profilePage.isUserFullNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertTrue("Followers count should be visible", profilePage.isFollowersCountVisible());
        assertTrue("Following count should be visible", profilePage.isFollowingCountVisible());
        assertTrue("Repositories tab should be visible", profilePage.isRepositoriesTabVisible());
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
    }

    @When("the user resizes the browser to mobile portrait viewport {int}x{int}")
    public void theUserResizesBrowserToMobilePortraitViewport(int width, int height) {
        profilePage.setViewportSize(width, height);
    }

    @Then("the layout adapts responsively with stacked or adjusted sections")
    public void theLayoutAdaptsResponsivelyWithStackedSections() {
        assertTrue("Profile section should be visible in mobile view", profilePage.isProfileSectionVisible());
        assertTrue("Navigation should be accessible", profilePage.isNavigationAccessible());
    }

    @And("all content is accessible and readable without horizontal scrolling")
    public void allContentIsAccessibleAndReadableWithoutHorizontalScrolling() {
        assertFalse("Page should not have horizontal scroll", profilePage.hasHorizontalScroll());
        assertTrue("User avatar should be visible", profilePage.isUserAvatarVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
    }

    @When("the user rotates to mobile landscape orientation {int}x{int}")
    public void theUserRotatesToMobileLandscapeOrientation(int width, int height) {
        profilePage.setViewportSize(width, height);
    }

    @Then("the layout adapts to landscape mode maintaining readability")
    public void theLayoutAdaptsToLandscapeModeWithReadability() {
        assertTrue("Profile section should be visible in landscape", profilePage.isProfileSectionVisible());
        assertTrue("User info should be readable", profilePage.isUserFullNameVisible());
        assertFalse("Page should not have horizontal scroll", profilePage.hasHorizontalScroll());
    }

    @When("the user tests search scroll and link interactions in mobile orientations")
    public void theUserTestsInteractionsInMobileOrientations() {
        profilePage.clickFollowersLink();
        profilePage.scrollFollowersList();
        profilePage.navigateBack();
    }

    @Then("all interactive elements function correctly across all viewport sizes")
    public void allInteractiveElementsFunctionCorrectlyAcrossAllViewportSizes() {
        assertTrue("Followers link should be clickable", profilePage.isFollowersLinkClickable());
        assertTrue("Repositories tab should be clickable", profilePage.isRepositoriesTabClickable());
        assertTrue("User profile links should work", profilePage.areProfileLinksWorking());
        
        // Cleanup
        if (context != null) context.close();
        if (browser != null) browser.close();
        if (playwright != null) playwright.close();
    }
}