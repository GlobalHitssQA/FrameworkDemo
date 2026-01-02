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

public class ResponsiveLayoutSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    @Given("the user opens the GitHub profile search component on a desktop browser with resolution {int}x{int}")
    public void theUserOpensTheGitHubProfileSearchComponentOnDesktop(int width, int height) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext(new Browser.NewContextOptions().setViewportSize(width, height));
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateTo();
        assertTrue("Component should load with desktop layout", profileSearchPage.isSearchBarVisible());
        assertTrue("Metrics dashboard should be visible", profileSearchPage.isMetricsDashboardVisible());
    }

    @When("the user searches for a valid GitHub user {string}")
    public void theUserSearchesForAValidGitHubUser(String username) {
        profileSearchPage.searchForUser(username);
    }

    @Then("all sections are displayed correctly with metrics dashboard user details and followers list")
    public void allSectionsAreDisplayedCorrectly() {
        assertTrue("Metrics dashboard should be visible", profileSearchPage.isMetricsDashboardVisible());
        assertTrue("User details section should be visible", profileSearchPage.isUserDetailsSectionVisible());
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }

    @And("no horizontal scrolling is required and all elements fit within viewport")
    public void noHorizontalScrollingIsRequired() {
        assertFalse("Horizontal scrollbar should not be present", profileSearchPage.hasHorizontalScrollbar());
    }

    @When("the user resizes the browser window to tablet breakpoint {int} pixels width")
    public void theUserResizesBrowserToTabletBreakpoint(int width) {
        profileSearchPage.resizeViewport(width, 1024);
    }

    @Then("the layout adapts responsively with adjusted spacing")
    public void theLayoutAdaptsResponsively() {
        assertTrue("Search bar should remain visible after resize", profileSearchPage.isSearchBarVisible());
        assertTrue("Component should adapt to new viewport", profileSearchPage.isComponentVisible());
    }

    @When("the user resizes the browser to mobile portrait view {int}x{int}")
    public void theUserResizesBrowserToMobilePortrait(int width, int height) {
        profileSearchPage.resizeViewport(width, height);
    }

    @Then("the layout adapts to mobile portrait with sections stacked vertically")
    public void theLayoutAdaptsToMobilePortrait() {
        assertTrue("Search bar should be visible in mobile view", profileSearchPage.isSearchBarVisible());
        assertTrue("Mobile layout should be active", profileSearchPage.isMobileLayoutActive());
    }

    @And("the search functionality works correctly in mobile portrait orientation")
    public void theSearchFunctionalityWorksInMobilePortrait() {
        assertTrue("Search input should be functional", profileSearchPage.isSearchInputFunctional());
        assertTrue("Search button should be clickable", profileSearchPage.isSearchButtonClickable());
        assertTrue("User details should be accessible", profileSearchPage.isUserDetailsSectionVisible());
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
    }

    @When("the user rotates to mobile landscape view {int}x{int}")
    public void theUserRotatesToMobileLandscape(int width, int height) {
        profileSearchPage.resizeViewport(width, height);
    }

    @Then("the layout adapts to landscape orientation maintaining usability")
    public void theLayoutAdaptsToLandscapeOrientation() {
        assertTrue("Component should be usable in landscape", profileSearchPage.isComponentVisible());
        assertTrue("Search bar should be visible", profileSearchPage.isSearchBarVisible());
    }

    @And("responsive images and avatars scale appropriately across all viewports")
    public void responsiveImagesScaleAppropriately() {
        assertTrue("User avatar should be visible and scaled", profileSearchPage.isUserAvatarVisible());
        assertTrue("Follower avatars should be visible", profileSearchPage.areFollowerAvatarsVisible());
    }

    @When("the user tests interactivity on mobile views")
    public void theUserTestsInteractivityOnMobileViews() {
        profileSearchPage.clickFirstFollower();
    }

    @Then("all interactive elements remain clickable and functional")
    public void allInteractiveElementsRemainClickable() {
        assertTrue("Follow button should be clickable", profileSearchPage.isFollowButtonClickable());
        assertTrue("Follower links should be clickable", profileSearchPage.areFollowerLinksClickable());
    }

    @When("the user returns to desktop view {int}x{int}")
    public void theUserReturnsToDesktopView(int width, int height) {
        profileSearchPage.resizeViewport(width, height);
    }

    @Then("the layout returns to full desktop version with all sections properly positioned")
    public void theLayoutReturnsToDesktopVersion() {
        assertTrue("Desktop layout should be restored", profileSearchPage.isDesktopLayoutActive());
        assertTrue("Metrics dashboard should be visible", profileSearchPage.isMetricsDashboardVisible());
        assertTrue("User details should be on left", profileSearchPage.isUserDetailsSectionVisible());
        assertTrue("Followers list should be on right", profileSearchPage.isFollowersListVisible());
        assertFalse("No horizontal scrollbar", profileSearchPage.hasHorizontalScrollbar());
    }
}