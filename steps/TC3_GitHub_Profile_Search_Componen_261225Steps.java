package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.junit.Assert;
import pages.GitHubProfileSearchPage;

public class ResponsiveDesignSteps {

    private WebDriver driver;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String BASE_URL = "https://github.com"; // Replace with actual component URL

    public ResponsiveDesignSteps() {
        // WebDriver should be injected via dependency injection (e.g., PicoContainer)
    }

    @Given("the GitHub API connection is active")
    public void theGitHubAPIConnectionIsActive() {
        // API connection is assumed to be active for this test
        // In a real scenario, you might ping the API or check status
    }

    @Given("the GitHub Profile Search component is accessible and functional")
    public void theGitHubProfileSearchComponentIsAccessibleAndFunctional() {
        profileSearchPage = new GitHubProfileSearchPage(driver);
        driver.get(BASE_URL);
        Assert.assertTrue("Search component should be accessible", 
            profileSearchPage.isSearchInputDisplayed());
    }

    @Given("I access the GitHub Profile Search component in Desktop resolution {string}")
    public void iAccessTheGitHubProfileSearchComponentInDesktopResolution(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage = new GitHubProfileSearchPage(driver);
        driver.get(BASE_URL);
    }

    @Given("I access the GitHub Profile Search component in Mobile Portrait resolution {string}")
    public void iAccessTheGitHubProfileSearchComponentInMobilePortraitResolution(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage = new GitHubProfileSearchPage(driver);
        driver.get(BASE_URL);
    }

    @Then("the component should display with desktop-optimized design")
    public void theComponentShouldDisplayWithDesktopOptimizedDesign() {
        Assert.assertTrue("Component should be displayed", 
            profileSearchPage.isComponentDisplayed());
    }

    @Then("all sections should be visible including search input, profile area, and followers list")
    public void allSectionsShouldBeVisibleIncludingSearchInputProfileAreaAndFollowersList() {
        Assert.assertTrue("Search input should be visible", 
            profileSearchPage.isSearchInputDisplayed());
        Assert.assertTrue("Search button should be visible", 
            profileSearchPage.isSearchButtonDisplayed());
    }

    @When("I search for a valid GitHub user {string}")
    public void iSearchForAValidGitHubUser(String username) {
        profileSearchPage.searchUser(username);
    }

    @When("I search for a GitHub user with many followers {string}")
    public void iSearchForAGitHubUserWithManyFollowers(String username) {
        profileSearchPage.searchUser(username);
    }

    @Then("the profile section should display on the left side")
    public void theProfileSectionShouldDisplayOnTheLeftSide() {
        Assert.assertTrue("Profile section should be displayed", 
            profileSearchPage.isProfileSectionDisplayed());
    }

    @Then("the metrics dashboard should display repositories, followers, following, and gists counters")
    public void theMetricsDashboardShouldDisplayRepositoriesFollowersFollowingAndGistsCounters() {
        Assert.assertTrue("Repos counter should be visible", 
            profileSearchPage.isReposCounterDisplayed());
        Assert.assertTrue("Followers counter should be visible", 
            profileSearchPage.isFollowersCounterDisplayed());
        Assert.assertTrue("Following counter should be visible", 
            profileSearchPage.isFollowingCounterDisplayed());
        Assert.assertTrue("Gists counter should be visible", 
            profileSearchPage.isGistsCounterDisplayed());
    }

    @Then("the followers list should display on the right section")
    public void theFollowersListShouldDisplayOnTheRightSection() {
        Assert.assertTrue("Followers list should be displayed", 
            profileSearchPage.isFollowersListDisplayed());
    }

    @Then("all sections should be properly distributed for desktop resolution")
    public void allSectionsShouldBeProperlyDistributedForDesktopResolution() {
        Assert.assertTrue("Layout should be properly distributed", 
            profileSearchPage.isDesktopLayoutCorrect());
    }

    @When("I change the browser resolution to Mobile Portrait {string}")
    public void iChangeTheBrowserResolutionToMobilePortrait(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage.waitForLayoutAdaptation();
    }

    @When("I change the browser resolution to Mobile Landscape {string}")
    public void iChangeTheBrowserResolutionToMobileLandscape(String resolution) {
        String[] dimensions = resolution.split("x");
        int width = Integer.parseInt(dimensions[0]);
        int height = Integer.parseInt(dimensions[1]);
        
        driver.manage().window().setSize(new Dimension(width, height));
        profileSearchPage.waitForLayoutAdaptation();
    }

    @Then("the layout should automatically adapt to vertical mobile orientation")
    public void theLayoutShouldAutomaticallyAdaptToVerticalMobileOrientation() {
        Assert.assertTrue("Layout should adapt to mobile portrait", 
            profileSearchPage.isMobileLayoutActive());
    }

    @Then("the layout should automatically adapt to horizontal mobile orientation")
    public void theLayoutShouldAutomaticallyAdaptToHorizontalMobileOrientation() {
        Assert.assertTrue("Layout should adapt to mobile landscape", 
            profileSearchPage.isMobileLayoutActive());
    }

    @Then("the sections should be reorganized in a stacked layout")
    public void theSectionsShouldBeReorganizedInAStackedLayout() {
        Assert.assertTrue("Sections should be stacked", 
            profileSearchPage.isStackedLayoutActive());
    }

    @Then("the search input should be visible and accessible")
    public void theSearchInputShouldBeVisibleAndAccessible() {
        Assert.assertTrue("Search input should be visible", 
            profileSearchPage.isSearchInputDisplayed());
        Assert.assertTrue("Search input should be enabled", 
            profileSearchPage.isSearchInputEnabled());
    }

    @Then("the search input should be visible and functional")
    public void theSearchInputShouldBeVisibleAndFunctional() {
        Assert.assertTrue("Search input should be visible", 
            profileSearchPage.isSearchInputDisplayed());
        Assert.assertTrue("Search input should be enabled", 
            profileSearchPage.isSearchInputEnabled());
    }

    @Then("the search button with magnifying glass icon should be visible and accessible")
    public void theSearchButtonWithMagnifyingGlassIconShouldBeVisibleAndAccessible() {
        Assert.assertTrue("Search button should be visible", 
            profileSearchPage.isSearchButtonDisplayed());
        Assert.assertTrue("Search button should be enabled", 
            profileSearchPage.isSearchButtonEnabled());
    }

    @Then("the search button should be visible and functional")
    public void theSearchButtonShouldBeVisibleAndFunctional() {
        Assert.assertTrue("Search button should be visible", 
            profileSearchPage.isSearchButtonDisplayed());
        Assert.assertTrue("Search button should be enabled", 
            profileSearchPage.isSearchButtonEnabled());
    }

    @Then("the user profile section should be visible and readable")
    public void theUserProfileSectionShouldBeVisibleAndReadable() {
        Assert.assertTrue("Profile section should be visible", 
            profileSearchPage.isProfileSectionDisplayed());
        Assert.assertTrue("Avatar should be visible", 
            profileSearchPage.isAvatarDisplayed());
        Assert.assertTrue("Username should be visible", 
            profileSearchPage.isUsernameDisplayed());
    }

    @Then("the user profile information should be visible")
    public void theUserProfileInformationShouldBeVisible() {
        Assert.assertTrue("Profile section should be visible", 
            profileSearchPage.isProfileSectionDisplayed());
    }

    @Then("the metrics counters should be visible and readable")
    public void theMetricsCountersShouldBeVisibleAndReadable() {
        Assert.assertTrue("Repos counter should be visible", 
            profileSearchPage.isReposCounterDisplayed());
        Assert.assertTrue("Followers counter should be visible", 
            profileSearchPage.isFollowersCounterDisplayed());
    }

    @Then("the metrics dashboard should be visible")
    public void theMetricsDashboardShouldBeVisible() {
        Assert.assertTrue("Metrics dashboard should be visible", 
            profileSearchPage.isMetricsDashboardDisplayed());
    }

    @Then("the followers list should be visible and accessible")
    public void theFollowersListShouldBeVisibleAndAccessible() {
        Assert.assertTrue("Followers list should be visible", 
            profileSearchPage.isFollowersListDisplayed());
    }

    @Then("all components should maintain their functionality")
    public void allComponentsShouldMaintainTheirFunctionality() {
        Assert.assertTrue("Search input should be functional", 
            profileSearchPage.isSearchInputEnabled());
        Assert.assertTrue("Search button should be functional", 
            profileSearchPage.isSearchButtonEnabled());
    }

    @Then("all elements should be legible and accessible")
    public void allElementsShouldBeLegibleAndAccessible() {
        Assert.assertTrue("All main elements should be displayed", 
            profileSearchPage.areAllMainElementsDisplayed());
    }

    @Then("the followers list should allow scrolling when followers exceed container size")
    public void theFollowersListShouldAllowScrollingWhenFollowersExceedContainerSize() {
        Assert.assertTrue("Followers list should be scrollable", 
            profileSearchPage.isFollowersListScrollable());
    }

    @Then("the followers list should allow scrolling in Portrait orientation")
    public void theFollowersListShouldAllowScrollingInPortraitOrientation() {
        Assert.assertTrue("Followers list should be scrollable in portrait", 
            profileSearchPage.isFollowersListScrollable());
    }

    @Then("the followers list should allow scrolling in Landscape orientation")
    public void theFollowersListShouldAllowScrollingInLandscapeOrientation() {
        Assert.assertTrue("Followers list should be scrollable in landscape", 
            profileSearchPage.isFollowersListScrollable());
    }
}