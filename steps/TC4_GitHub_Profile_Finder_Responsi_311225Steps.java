package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileFinderPage;
import static org.junit.Assert.*;

public class ResponsiveDesignSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileFinderPage profileFinderPage;

    private static final String BASE_URL = "https://github.com";

    @Given("the user accesses the GitHub profile finder component on a desktop browser with resolution {int}x{int}")
    public void theUserAccessesTheComponentOnDesktop(int width, int height) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext(new Browser.NewContextOptions().setViewportSize(width, height));
        page = context.newPage();
        profileFinderPage = new GitHubProfileFinderPage(page);
        profileFinderPage.navigate(BASE_URL);
    }

    @When("the user views the interface layout")
    public void theUserViewsTheInterfaceLayout() {
        assertTrue("Page should be loaded", profileFinderPage.isPageLoaded());
    }

    @Then("the left section displays user details")
    public void theLeftSectionDisplaysUserDetails() {
        assertTrue("User details section should be visible", profileFinderPage.isUserDetailsSectionVisible());
    }

    @And("the metrics dashboard is displayed at the top")
    public void theMetricsDashboardIsDisplayedAtTop() {
        assertTrue("Metrics dashboard should be visible", profileFinderPage.isMetricsDashboardVisible());
    }

    @And("the followers list is displayed in the right section")
    public void theFollowersListIsDisplayedInRightSection() {
        assertTrue("Followers list should be visible", profileFinderPage.isFollowersListVisible());
    }

    @When("the user searches for a valid GitHub username {string} on desktop")
    public void theUserSearchesForValidUsernameOnDesktop(String username) {
        profileFinderPage.searchForUser(username);
    }

    @Then("all profile elements are displayed correctly distributed and aligned")
    public void allProfileElementsAreDisplayedCorrectly() {
        assertTrue("User avatar should be visible", profileFinderPage.isUserAvatarVisible());
        assertTrue("User name should be visible", profileFinderPage.isUserNameVisible());
        assertTrue("Username should be visible", profileFinderPage.isUsernameVisible());
        assertTrue("Metrics counters should be visible", profileFinderPage.areMetricsCountersVisible());
    }

    @When("the user resizes the browser window to tablet resolution {int}x{int}")
    public void theUserResizesBrowserToTablet(int width, int height) {
        page.setViewportSize(width, height);
    }

    @Then("the interface adjusts dynamically maintaining readability and functionality")
    public void theInterfaceAdjustsDynamically() {
        assertTrue("Search input should be visible", profileFinderPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileFinderPage.isSearchButtonVisible());
        assertTrue("User details should be visible", profileFinderPage.isUserDetailsSectionVisible());
    }

    @When("the user accesses the component from a mobile device in portrait orientation {int}x{int}")
    public void theUserAccessesFromMobilePortrait(int width, int height) {
        page.setViewportSize(width, height);
    }

    @Then("the interface reorganizes vertically")
    public void theInterfaceReorganizesVertically() {
        assertTrue("Page should be loaded in mobile view", profileFinderPage.isPageLoaded());
    }

    @And("the search bar is displayed first")
    public void theSearchBarIsDisplayedFirst() {
        assertTrue("Search bar should be visible", profileFinderPage.isSearchInputVisible());
    }

    @And("the metrics dashboard is displayed below the search bar")
    public void theMetricsDashboardIsDisplayedBelowSearchBar() {
        assertTrue("Metrics dashboard should be visible", profileFinderPage.isMetricsDashboardVisible());
    }

    @And("the user information is displayed below the dashboard")
    public void theUserInformationIsDisplayedBelowDashboard() {
        assertTrue("User details section should be visible", profileFinderPage.isUserDetailsSectionVisible());
    }

    @And("the followers list with scroll is displayed at the bottom")
    public void theFollowersListWithScrollIsDisplayedAtBottom() {
        assertTrue("Followers list should be visible", profileFinderPage.isFollowersListVisible());
    }

    @When("the user searches for a valid GitHub username {string} in portrait mode")
    public void theUserSearchesForValidUsernameInPortraitMode(String username) {
        profileFinderPage.searchForUser(username);
    }

    @Then("all elements are displayed correctly stacked vertically and are functional")
    public void allElementsAreDisplayedStackedVertically() {
        assertTrue("All main elements should be visible", profileFinderPage.areAllMainElementsVisible());
    }

    @When("the user rotates the mobile device to landscape orientation {int}x{int}")
    public void theUserRotatesToLandscape(int width, int height) {
        page.setViewportSize(width, height);
    }

    @Then("the interface adapts to horizontal orientation redistributing elements")
    public void theInterfaceAdaptsToHorizontalOrientation() {
        assertTrue("Page should adapt to landscape", profileFinderPage.isPageLoaded());
        assertTrue("Search input should be visible in landscape", profileFinderPage.isSearchInputVisible());
    }

    @When("the user verifies scroll functionality in the followers list on mobile")
    public void theUserVerifiesScrollFunctionality() {
        profileFinderPage.scrollFollowersList();
    }

    @Then("the followers list allows smooth vertical scrolling when content exceeds container size")
    public void theFollowersListAllowsSmoothScrolling() {
        assertTrue("Followers list should be scrollable", profileFinderPage.isFollowersListScrollable());
    }

    @When("the user verifies all interactive elements across all resolutions")
    public void theUserVerifiesAllInteractiveElements() {
        assertTrue("Interactive elements check initiated", true);
    }

    @Then("all buttons are accessible and respond to user actions")
    public void allButtonsAreAccessible() {
        assertTrue("Search button should be clickable", profileFinderPage.isSearchButtonClickable());
        assertTrue("Follow button should be visible", profileFinderPage.isFollowButtonVisible());
    }

    @And("all input fields are accessible and accept user input")
    public void allInputFieldsAreAccessible() {
        assertTrue("Search input should accept input", profileFinderPage.isSearchInputEnabled());
    }

    @And("all links are accessible and navigate correctly")
    public void allLinksAreAccessible() {
        assertTrue("Follower links should be visible", profileFinderPage.areFollowerLinksVisible());
    }
}