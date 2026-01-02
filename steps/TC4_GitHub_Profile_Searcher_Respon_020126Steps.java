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
import static org.junit.jupiter.api.Assertions.*;

public class ResponsiveDesignSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    @Given("the user accesses the GitHub Profile Search component on a desktop browser with resolution {int}x{int}")
    public void userAccessesComponentOnDesktop(int width, int height) {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext(new Browser.NewContextOptions().setViewportSize(width, height));
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigate();
    }

    @When("the interface is fully loaded")
    public void interfaceIsFullyLoaded() {
        profileSearchPage.waitForPageLoad();
    }

    @Then("the search component should be displayed")
    public void searchComponentShouldBeDisplayed() {
        assertTrue(profileSearchPage.isSearchInputVisible());
        assertTrue(profileSearchPage.isSearchButtonVisible());
    }

    @And("the metrics dashboard should be visible")
    public void metricsDashboardShouldBeVisible() {
        assertTrue(profileSearchPage.isMetricsDashboardVisible());
    }

    @And("the user details section should be displayed on the left")
    public void userDetailsSectionShouldBeDisplayedOnLeft() {
        assertTrue(profileSearchPage.isUserDetailsSectionVisible());
    }

    @And("the followers list section should be displayed on the right")
    public void followersListSectionShouldBeDisplayedOnRight() {
        assertTrue(profileSearchPage.isFollowersListSectionVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input")
    public void userEntersValidUsername(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void userClicksSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile information should be displayed correctly")
    public void profileInformationShouldBeDisplayed() {
        assertTrue(profileSearchPage.isProfileInformationDisplayed());
    }

    @And("all sections should be properly aligned and visible on desktop")
    public void allSectionsShouldBeProperlyAlignedOnDesktop() {
        assertTrue(profileSearchPage.areAllSectionsVisibleAndAligned());
    }

    @And("the metrics dashboard should show Repos count")
    public void metricsDashboardShouldShowReposCount() {
        assertTrue(profileSearchPage.isReposMetricVisible());
    }

    @And("the metrics dashboard should show Followers count")
    public void metricsDashboardShouldShowFollowersCount() {
        assertTrue(profileSearchPage.isFollowersMetricVisible());
    }

    @And("the metrics dashboard should show Following count")
    public void metricsDashboardShouldShowFollowingCount() {
        assertTrue(profileSearchPage.isFollowingMetricVisible());
    }

    @And("the metrics dashboard should show Gists count")
    public void metricsDashboardShouldShowGistsCount() {
        assertTrue(profileSearchPage.isGistsMetricVisible());
    }

    @When("the user resizes the browser to mobile portrait resolution {int}x{int}")
    public void userResizesToMobilePortrait(int width, int height) {
        profileSearchPage.resizeViewport(width, height);
    }

    @Then("the interface should adapt responsively to mobile portrait layout")
    public void interfaceShouldAdaptToMobilePortrait() {
        assertTrue(profileSearchPage.isResponsiveLayoutActive());
    }

    @And("sections should be stacked vertically")
    public void sectionsShouldBeStackedVertically() {
        assertTrue(profileSearchPage.areSectionsStackedVertically());
    }

    @And("the search input should be accessible in mobile portrait mode")
    public void searchInputShouldBeAccessibleInMobilePortrait() {
        assertTrue(profileSearchPage.isSearchInputVisible());
    }

    @And("the metrics dashboard should be readable in mobile portrait mode")
    public void metricsDashboardShouldBeReadableInMobilePortrait() {
        assertTrue(profileSearchPage.isMetricsDashboardVisible());
    }

    @And("the user details should be accessible in mobile portrait mode")
    public void userDetailsShouldBeAccessibleInMobilePortrait() {
        assertTrue(profileSearchPage.isUserDetailsSectionVisible());
    }

    @And("the followers list should be accessible in mobile portrait mode")
    public void followersListShouldBeAccessibleInMobilePortrait() {
        assertTrue(profileSearchPage.isFollowersListSectionVisible());
    }

    @When("the user resizes the browser to mobile landscape resolution {int}x{int}")
    public void userResizesToMobileLandscape(int width, int height) {
        profileSearchPage.resizeViewport(width, height);
    }

    @Then("the interface should adapt to mobile landscape layout")
    public void interfaceShouldAdaptToMobileLandscape() {
        assertTrue(profileSearchPage.isResponsiveLayoutActive());
    }

    @And("all components should remain functional in mobile landscape orientation")
    public void allComponentsShouldRemainFunctionalInLandscape() {
        assertTrue(profileSearchPage.areAllComponentsFunctional());
    }

    @And("the layout should maintain readability in landscape mode")
    public void layoutShouldMaintainReadabilityInLandscape() {
        assertTrue(profileSearchPage.isLayoutReadable());
    }

    @When("the user clicks on a follower link")
    public void userClicksOnFollowerLink() {
        profileSearchPage.clickFirstFollowerLink();
    }

    @Then("the follower profile should be accessible")
    public void followerProfileShouldBeAccessible() {
        assertTrue(profileSearchPage.isFollowerProfileAccessible());
    }

    @When("the user clicks the Follow button")
    public void userClicksFollowButton() {
        profileSearchPage.clickFollowButton();
    }

    @Then("the Follow button should respond correctly across all device sizes")
    public void followButtonShouldRespondCorrectly() {
        assertTrue(profileSearchPage.isFollowButtonResponsive());
    }
}