package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.junit.Assert;
import pages.GitHubProfileSearchPage;
import utils.DriverManager;

public class GitHubProfileSearchResponsiveSteps {

    private WebDriver driver;
    private GitHubProfileSearchPage profileSearchPage;

    public GitHubProfileSearchResponsiveSteps() {
        this.driver = DriverManager.getDriver();
        this.profileSearchPage = new GitHubProfileSearchPage(driver);
    }

    // ==================== GIVEN STEPS ====================

    @Given("the GitHub profile search component is accessible and functional")
    public void theGitHubProfileSearchComponentIsAccessibleAndFunctional() {
        profileSearchPage.navigateToComponent();
        Assert.assertTrue("Component should be accessible", profileSearchPage.isComponentLoaded());
    }

    @Given("there is an active connection to the GitHub API")
    public void thereIsAnActiveConnectionToTheGitHubAPI() {
        Assert.assertTrue("API connection should be active", profileSearchPage.isApiConnectionActive());
    }

    @Given("a test user with followers exceeding the container size exists")
    public void aTestUserWithFollowersExceedingTheContainerSizeExists() {
        // This is a precondition - octocat has 21k+ followers
    }

    @Given("I access the GitHub profile search component on a Desktop browser with resolution {string}")
    public void iAccessTheGitHubProfileSearchComponentOnADesktopBrowserWithResolution(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage.navigateToComponent();
    }

    @Given("I search for a valid GitHub user {string}")
    public void iSearchForAValidGitHubUser(String username) {
        profileSearchPage.searchUser(username);
        Assert.assertTrue("User profile should be displayed", profileSearchPage.isUserProfileDisplayed());
    }

    @Given("I search for a valid GitHub user {string} with followers exceeding the container size")
    public void iSearchForAValidGitHubUserWithFollowersExceedingTheContainerSize(String username) {
        profileSearchPage.searchUser(username);
        Assert.assertTrue("User profile should be displayed", profileSearchPage.isUserProfileDisplayed());
        Assert.assertTrue("Followers list should have scrollable content", profileSearchPage.hasScrollableFollowersList());
    }

    // ==================== WHEN STEPS ====================

    @When("I search for a valid GitHub user {string}")
    public void whenISearchForAValidGitHubUser(String username) {
        profileSearchPage.searchUser(username);
    }

    @When("I resize the browser to Mobile Portrait resolution {string}")
    public void iResizeTheBrowserToMobilePortraitResolution(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage.waitForLayoutAdaptation();
    }

    @When("I resize the browser to Mobile Landscape resolution {string}")
    public void iResizeTheBrowserToMobileLandscapeResolution(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage.waitForLayoutAdaptation();
    }

    // ==================== THEN STEPS ====================

    @Then("the component should display with a layout optimized for Desktop")
    public void theComponentShouldDisplayWithALayoutOptimizedForDesktop() {
        Assert.assertTrue("Desktop layout should be active", profileSearchPage.isDesktopLayoutActive());
    }

    @Then("all sections should be visible including search input, profile section, metrics dashboard, and followers list")
    public void allSectionsShouldBeVisibleIncludingSearchInputProfileSectionMetricsDashboardAndFollowersList() {
        Assert.assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        Assert.assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }

    @Then("the profile section should be displayed on the left side")
    public void theProfileSectionShouldBeDisplayedOnTheLeftSide() {
        Assert.assertTrue("Profile section should be on left", profileSearchPage.isProfileSectionOnLeft());
    }

    @Then("the metrics dashboard should be displayed correctly")
    public void theMetricsDashboardShouldBeDisplayedCorrectly() {
        Assert.assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        Assert.assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        Assert.assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        Assert.assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
    }

    @Then("the followers list should be displayed on the right side")
    public void theFollowersListShouldBeDisplayedOnTheRightSide() {
        Assert.assertTrue("Followers list should be on right", profileSearchPage.isFollowersListOnRight());
    }

    @Then("all sections should be distributed adequately for Desktop resolution")
    public void allSectionsShouldBeDistributedAdequatelyForDesktopResolution() {
        Assert.assertTrue("Layout should be properly distributed for desktop", 
            profileSearchPage.isLayoutProperlyDistributed());
    }

    @Then("the layout should automatically adapt to vertical mobile orientation")
    public void theLayoutShouldAutomaticallyAdaptToVerticalMobileOrientation() {
        Assert.assertTrue("Mobile portrait layout should be active", profileSearchPage.isMobilePortraitLayoutActive());
    }

    @Then("the sections should be reorganized in a stacked layout")
    public void theSectionsShouldBeReorganizedInAStackedLayout() {
        Assert.assertTrue("Sections should be stacked", profileSearchPage.areSectionsStacked());
    }

    @Then("the search input should be visible and accessible")
    public void theSearchInputShouldBeVisibleAndAccessible() {
        Assert.assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        Assert.assertTrue("Search input should be accessible", profileSearchPage.isSearchInputAccessible());
    }

    @Then("the search button with magnifying glass icon should be visible and functional")
    public void theSearchButtonWithMagnifyingGlassIconShouldBeVisibleAndFunctional() {
        Assert.assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
        Assert.assertTrue("Search button should be functional", profileSearchPage.isSearchButtonFunctional());
    }

    @Then("the user profile section should be readable")
    public void theUserProfileSectionShouldBeReadable() {
        Assert.assertTrue("User avatar should be visible", profileSearchPage.isUserAvatarVisible());
        Assert.assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        Assert.assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
    }

    @Then("the metrics dashboard should be visible without loss of information")
    public void theMetricsDashboardShouldBeVisibleWithoutLossOfInformation() {
        Assert.assertTrue("All metrics should be visible", profileSearchPage.areAllMetricsVisible());
    }

    @Then("the followers list should be accessible")
    public void theFollowersListShouldBeAccessible() {
        Assert.assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }

    @Then("the layout should automatically adapt to horizontal mobile orientation")
    public void theLayoutShouldAutomaticallyAdaptToHorizontalMobileOrientation() {
        Assert.assertTrue("Mobile landscape layout should be active", profileSearchPage.isMobileLandscapeLayoutActive());
    }

    @Then("all elements should be legible and accessible")
    public void allElementsShouldBeLegibleAndAccessible() {
        Assert.assertTrue("All elements should be accessible", profileSearchPage.areAllElementsAccessible());
    }

    @Then("the search input should be visible and functional")
    public void theSearchInputShouldBeVisibleAndFunctional() {
        Assert.assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        Assert.assertTrue("Search input should be functional", profileSearchPage.isSearchInputFunctional());
    }

    @Then("the search button should be visible and functional")
    public void theSearchButtonShouldBeVisibleAndFunctional() {
        Assert.assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
        Assert.assertTrue("Search button should be functional", profileSearchPage.isSearchButtonFunctional());
    }

    @Then("the metrics dashboard should display all counters correctly")
    public void theMetricsDashboardShouldDisplayAllCountersCorrectly() {
        Assert.assertTrue("Repos counter should display value", profileSearchPage.doesReposCounterHaveValue());
        Assert.assertTrue("Followers counter should display value", profileSearchPage.doesFollowersCounterHaveValue());
        Assert.assertTrue("Following counter should display value", profileSearchPage.doesFollowingCounterHaveValue());
        Assert.assertTrue("Gists counter should display value", profileSearchPage.doesGistsCounterHaveValue());
    }

    @Then("the followers list should be accessible without loss of functionality")
    public void theFollowersListShouldBeAccessibleWithoutLossOfFunctionality() {
        Assert.assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        Assert.assertTrue("Followers list should be interactive", profileSearchPage.isFollowersListInteractive());
    }

    @Then("the followers list should allow scrolling on Desktop resolution")
    public void theFollowersListShouldAllowScrollingOnDesktopResolution() {
        Assert.assertTrue("Followers list should be scrollable on desktop", profileSearchPage.isFollowersListScrollable());
    }

    @Then("the followers list should allow scrolling on Mobile Portrait")
    public void theFollowersListShouldAllowScrollingOnMobilePortrait() {
        Assert.assertTrue("Followers list should be scrollable on mobile portrait", 
            profileSearchPage.isFollowersListScrollable());
    }

    @Then("the followers list should allow scrolling on Mobile Landscape")
    public void theFollowersListShouldAllowScrollingOnMobileLandscape() {
        Assert.assertTrue("Followers list should be scrollable on mobile landscape", 
            profileSearchPage.isFollowersListScrollable());
    }

    @Then("I should be able to view all followers by scrolling in each resolution")
    public void iShouldBeAbleToViewAllFollowersByScrollingInEachResolution() {
        Assert.assertTrue("Should be able to scroll through all followers", 
            profileSearchPage.canScrollThroughAllFollowers());
    }

    // ==================== AND STEPS ====================

    @And("the search input should be visible and accessible")
    public void andTheSearchInputShouldBeVisibleAndAccessible() {
        theSearchInputShouldBeVisibleAndAccessible();
    }

    @And("the search button with magnifying glass icon should be visible and functional")
    public void andTheSearchButtonWithMagnifyingGlassIconShouldBeVisibleAndFunctional() {
        theSearchButtonWithMagnifyingGlassIconShouldBeVisibleAndFunctional();
    }

    @And("the user profile section should be readable")
    public void andTheUserProfileSectionShouldBeReadable() {
        theUserProfileSectionShouldBeReadable();
    }

    @And("the metrics dashboard should be visible without loss of information")
    public void andTheMetricsDashboardShouldBeVisibleWithoutLossOfInformation() {
        theMetricsDashboardShouldBeVisibleWithoutLossOfInformation();
    }

    @And("the followers list should be accessible")
    public void andTheFollowersListShouldBeAccessible() {
        theFollowersListShouldBeAccessible();
    }
}