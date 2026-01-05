package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class TabletResponsiveSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private static final int TABLET_PORTRAIT_WIDTH = 768;
    private static final int TABLET_PORTRAIT_HEIGHT = 1024;
    private static final int TABLET_LANDSCAPE_WIDTH = 1024;
    private static final int TABLET_LANDSCAPE_HEIGHT = 768;
    private static final int MIN_TAP_TARGET_SIZE = 44;

    public TabletResponsiveSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the application loads in default desktop view")
    public void theApplicationLoadsInDefaultDesktopView() {
        profilePage.navigateToApplication();
        assertTrue("Application should be loaded", profilePage.isPageLoaded());
    }

    @When("the browser is resized to tablet portrait view with {int}px width")
    public void theBrowserIsResizedToTabletPortraitView(int width) {
        profilePage.resizeViewport(width, TABLET_PORTRAIT_HEIGHT);
    }

    @Then("the search component should remain accessible and properly sized")
    public void theSearchComponentShouldRemainAccessibleAndProperlySized() {
        assertTrue("Search input should be visible", profilePage.isSearchInputVisible());
        assertTrue("Search button should be visible", profilePage.isSearchButtonVisible());
    }

    @And("the search input and button should be appropriately sized for tablet portrait")
    public void theSearchInputAndButtonShouldBeAppropriatellySizedForTabletPortrait() {
        assertTrue("Search input should have appropriate width", profilePage.getSearchInputWidth() > 0);
        assertTrue("Search button should be properly positioned", profilePage.isSearchButtonProperlyPositioned());
    }

    @When("a GitHub user is searched")
    public void aGitHubUserIsSearched() {
        profilePage.searchUser("octocat");
    }

    @Then("the metrics dashboard should display correctly with Repos, Followers, Following, and Gists visible")
    public void theMetricsDashboardShouldDisplayCorrectly() {
        assertTrue("Repos counter should be visible", profilePage.isReposCounterVisible());
        assertTrue("Followers counter should be visible", profilePage.isFollowersCounterVisible());
        assertTrue("Following counter should be visible", profilePage.isFollowingCounterVisible());
        assertTrue("Gists counter should be visible", profilePage.isGistsCounterVisible());
    }

    @And("the user profile section should display avatar, name, username, bio, location, company, web link, and Follow button")
    public void theUserProfileSectionShouldDisplayAllElements() {
        assertTrue("Avatar should be visible", profilePage.isAvatarVisible());
        assertTrue("Name should be visible", profilePage.isNameVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertTrue("Bio should be visible", profilePage.isBioVisible());
        assertTrue("Location should be visible", profilePage.isLocationVisible());
        assertTrue("Company should be visible", profilePage.isCompanyVisible());
        assertTrue("Web link should be visible", profilePage.isWebLinkVisible());
        assertTrue("Follow button should be visible", profilePage.isFollowButtonVisible());
    }

    @And("the followers list should adapt appropriately to tablet portrait width with proper spacing and scrolling")
    public void theFollowersListShouldAdaptAppropriately() {
        assertTrue("Followers list should be visible", profilePage.isFollowersListVisible());
        assertTrue("Followers list should be scrollable", profilePage.isFollowersListScrollable());
    }

    @When("the browser is rotated to tablet landscape view with {int}px width")
    public void theBrowserIsRotatedToTabletLandscapeView(int width) {
        profilePage.resizeViewport(width, TABLET_LANDSCAPE_HEIGHT);
    }

    @Then("the interface should adapt to landscape orientation with appropriate horizontal space usage")
    public void theInterfaceShouldAdaptToLandscapeOrientation() {
        assertTrue("Layout should adapt to landscape", profilePage.isLayoutAdaptedToLandscape());
        assertTrue("Content should use horizontal space appropriately", profilePage.isHorizontalSpaceUtilized());
    }

    @And("all interactive elements should have sufficient tap target size of minimum {int}x{int}px")
    public void allInteractiveElementsShouldHaveSufficientTapTargetSize(int minWidth, int minHeight) {
        assertTrue("Search button tap target should be sufficient", profilePage.getTapTargetSize("searchButton") >= MIN_TAP_TARGET_SIZE);
        assertTrue("Follow button tap target should be sufficient", profilePage.getTapTargetSize("followButton") >= MIN_TAP_TARGET_SIZE);
    }

    @And("no horizontal scrolling should be required with all content visible within viewport bounds")
    public void noHorizontalScrollingShouldBeRequired() {
        assertFalse("No horizontal scroll should be present", profilePage.hasHorizontalScroll());
        assertTrue("All content should fit within viewport", profilePage.isContentWithinViewport());
    }
}