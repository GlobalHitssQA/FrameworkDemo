package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import static org.junit.jupiter.api.Assertions.*;

public class MobilePortraitLayoutSteps {

    private Page page;
    private Browser browser;
    private BrowserContext context;
    private Playwright playwright;
    private GitHubProfileSearchPage profileSearchPage;
    
    private static final int MOBILE_PORTRAIT_WIDTH = 375;
    private static final int MOBILE_PORTRAIT_HEIGHT = 667;
    private static final String TEST_USERNAME = "octocat";

    @Given("the user opens the GitHub profile search application on mobile portrait viewport")
    public void theUserOpensTheGitHubProfileSearchApplicationOnMobilePortraitViewport() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext(new Browser.NewContextOptions()
            .setViewportSize(MOBILE_PORTRAIT_WIDTH, MOBILE_PORTRAIT_HEIGHT)
            .setIsMobile(true)
            .setHasTouch(true));
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigate();
        assertTrue(profileSearchPage.isPageLoaded(), "Application should load correctly in mobile portrait orientation");
    }

    @When("the user enters a valid GitHub username in the search field")
    public void theUserEntersAValidGitHubUsernameInTheSearchField() {
        profileSearchPage.enterUsername(TEST_USERNAME);
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input should be properly sized and usable on mobile portrait screen");
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the profile information is displayed in a mobile-optimized layout")
    public void theProfileInformationIsDisplayedInMobileOptimizedLayout() {
        assertTrue(profileSearchPage.isProfileDisplayed(), "Profile information should be retrieved and displayed");
        assertTrue(profileSearchPage.isAvatarVisible(), "Avatar should be visible");
        assertTrue(profileSearchPage.areMetricsVisible(), "Metrics should be visible");
    }

    @And("the layout displays sections in a vertical stacked arrangement")
    public void theLayoutDisplaysSectionsInVerticalStackedArrangement() {
        assertTrue(profileSearchPage.isLayoutVerticallyStacked(), "Mobile portrait layout should display sections in vertical stacked arrangement");
    }

    @And("all UI elements are properly sized for mobile portrait viewing")
    public void allUIElementsAreProperlyScaledForMobilePortraitViewing() {
        assertTrue(profileSearchPage.isAvatarProperlyScaled(MOBILE_PORTRAIT_WIDTH), "Avatar should be appropriately scaled");
        assertTrue(profileSearchPage.areMetricsProperlyScaled(MOBILE_PORTRAIT_WIDTH), "Metrics should be appropriately scaled");
        assertTrue(profileSearchPage.isFollowersListProperlyScaled(MOBILE_PORTRAIT_WIDTH), "Followers list should be appropriately scaled");
    }

    @And("all content is accessible through vertical scrolling without horizontal overflow")
    public void allContentIsAccessibleThroughVerticalScrollingWithoutHorizontalOverflow() {
        assertFalse(profileSearchPage.hasHorizontalOverflow(), "There should be no horizontal overflow");
        assertTrue(profileSearchPage.canScrollVertically(), "Content should be accessible through vertical scrolling");
        profileSearchPage.scrollToBottom();
        assertTrue(profileSearchPage.isFollowersListVisible(), "Followers list should be accessible after scrolling");
    }

    @And("all interactive elements have adequate touch target sizes")
    public void allInteractiveElementsHaveAdequateTouchTargetSizes() {
        int minTouchTargetSize = 44;
        assertTrue(profileSearchPage.isSearchButtonTouchFriendly(minTouchTargetSize), "Search button should have adequate touch target size");
        assertTrue(profileSearchPage.isFollowButtonTouchFriendly(minTouchTargetSize), "Follow button should have adequate touch target size");
        assertTrue(profileSearchPage.areFollowerLinksTouchFriendly(minTouchTargetSize), "Follower links should have adequate touch target sizes");
    }
}