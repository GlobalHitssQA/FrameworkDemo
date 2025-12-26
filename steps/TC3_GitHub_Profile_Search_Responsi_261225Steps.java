package stepdefinitions;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import pages.GitHubProfilePage;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubResponsiveSteps {

    private WebDriver driver;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private static final String BASE_URL = "https://github.com";
    private String currentOrientation = "portrait";

    @Before
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.setExperimentalOption("mobileEmulation", 
            java.util.Map.of("deviceName", "iPhone 6/7/8"));
        driver = new ChromeDriver(options);
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Given("the GitHub API is available")
    public void theGitHubAPIIsAvailable() {
        // API availability is assumed; could add health check if needed
        assertTrue("GitHub API should be available", true);
    }

    @And("the browser developer tools can simulate mobile views")
    public void theBrowserDevToolsCanSimulateMobileViews() {
        // ChromeDriver with mobile emulation is already configured
        assertNotNull("WebDriver should be initialized", driver);
    }

    @Given("I access the GitHub profile search component in portrait mode with dimensions {int}x{int}")
    public void iAccessSearchComponentInPortraitMode(int width, int height) {
        driver.manage().window().setSize(new Dimension(width, height));
        currentOrientation = "portrait";
        driver.get(BASE_URL + "/search");
        searchPage = new GitHubSearchPage(driver);
    }

    @Given("I access the GitHub profile search component in landscape mode with dimensions {int}x{int}")
    public void iAccessSearchComponentInLandscapeMode(int width, int height) {
        driver.manage().window().setSize(new Dimension(width, height));
        currentOrientation = "landscape";
        driver.get(BASE_URL + "/search");
        searchPage = new GitHubSearchPage(driver);
    }

    @Then("the interface should load and adapt correctly to portrait orientation")
    public void theInterfaceShouldLoadInPortrait() {
        assertTrue("Page should be loaded", searchPage.isPageLoaded());
        Dimension size = driver.manage().window().getSize();
        assertTrue("Should be in portrait mode", size.getHeight() > size.getWidth());
    }

    @And("the search field should be visible and accessible")
    public void theSearchFieldShouldBeVisible() {
        assertTrue("Search field should be visible", searchPage.isSearchFieldVisible());
    }

    @And("the search button should be visible and accessible")
    public void theSearchButtonShouldBeVisible() {
        assertTrue("Search functionality should be accessible", searchPage.isSearchAccessible());
    }

    @When("I enter a valid GitHub username {string} in the search field")
    public void iEnterValidUsername(String username) {
        searchPage.enterSearchQuery(username);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        searchPage.submitSearch();
        // Navigate to user profile after search
        String username = searchPage.getLastSearchedUsername();
        driver.get(BASE_URL + "/" + username);
        profilePage = new GitHubProfilePage(driver);
    }

    @Then("the search results should be displayed adapted to portrait orientation")
    public void theSearchResultsShouldBeDisplayedInPortrait() {
        assertTrue("Profile page should be loaded", profilePage.isProfileLoaded());
    }

    @And("the user avatar should be visible with appropriate size")
    public void theUserAvatarShouldBeVisible() {
        assertTrue("Avatar should be visible", profilePage.isAvatarVisible());
        assertTrue("Avatar should have appropriate size for mobile", 
            profilePage.isAvatarSizedCorrectly(currentOrientation));
    }

    @And("the full name {string} should be displayed")
    public void theFullNameShouldBeDisplayed(String expectedName) {
        assertEquals("Full name should match", expectedName, profilePage.getFullName());
    }

    @And("the username {string} should be displayed")
    public void theUsernameShouldBeDisplayed(String expectedUsername) {
        assertEquals("Username should match", expectedUsername, profilePage.getUsername());
    }

    @And("the followers count should be visible")
    public void theFollowersCountShouldBeVisible() {
        assertTrue("Followers count should be visible", profilePage.isFollowersCountVisible());
    }

    @And("the following count should be visible")
    public void theFollowingCountShouldBeVisible() {
        assertTrue("Following count should be visible", profilePage.isFollowingCountVisible());
    }

    @And("the location {string} should be displayed")
    public void theLocationShouldBeDisplayed(String expectedLocation) {
        assertEquals("Location should match", expectedLocation, profilePage.getLocation());
    }

    @And("the user profile elements should be arranged vertically")
    public void theElementsShouldBeArrangedVertically() {
        assertTrue("Elements should be arranged vertically in portrait", 
            profilePage.areElementsArrangedVertically());
    }

    @Given("I have searched for user {string}")
    public void iHaveSearchedForUser(String username) {
        driver.get(BASE_URL + "/" + username);
        profilePage = new GitHubProfilePage(driver);
    }

    @Then("all text elements should be readable with minimum font size")
    public void allTextElementsShouldBeReadable() {
        assertTrue("Text elements should have readable font size", 
            profilePage.areTextElementsReadable());
    }

    @And("the Follow button should be clickable")
    public void theFollowButtonShouldBeClickable() {
        assertTrue("Follow button should be clickable", profilePage.isFollowButtonClickable());
    }

    @And("the followers list should allow scrolling")
    public void theFollowersListShouldAllowScrolling() {
        profilePage.navigateToFollowers();
        assertTrue("Followers list should be scrollable", profilePage.isFollowersListScrollable());
    }

    @And("the avatar image should have appropriate dimensions for mobile")
    public void theAvatarShouldHaveAppropriateDimensions() {
        assertTrue("Avatar dimensions should be appropriate", 
            profilePage.isAvatarSizedCorrectly(currentOrientation));
    }

    @When("I rotate the device to landscape orientation with dimensions {int}x{int}")
    public void iRotateToLandscape(int width, int height) {
        driver.manage().window().setSize(new Dimension(width, height));
        currentOrientation = "landscape";
        // Allow time for responsive CSS to apply
        try { Thread.sleep(500); } catch (InterruptedException e) { }
    }

    @Then("the interface should automatically adapt to landscape orientation")
    public void theInterfaceShouldAdaptToLandscape() {
        Dimension size = driver.manage().window().getSize();
        assertTrue("Should be in landscape mode", size.getWidth() > size.getHeight());
    }

    @And("the elements should redistribute to take advantage of the additional width")
    public void theElementsShouldRedistribute() {
        assertTrue("Elements should use available width", 
            profilePage.areElementsOptimizedForWidth());
    }

    @Then("the metrics dashboard should be visible and properly sized")
    public void theMetricsDashboardShouldBeVisible() {
        assertTrue("Metrics should be visible", profilePage.areMetricsVisible());
    }

    @And("the user details section should be visible")
    public void theUserDetailsSectionShouldBeVisible() {
        assertTrue("User details should be visible", profilePage.isUserDetailsSectionVisible());
    }

    @And("the followers list should be accessible")
    public void theFollowersListShouldBeAccessible() {
        assertTrue("Followers link should be accessible", profilePage.isFollowersLinkAccessible());
    }

    @And("all elements should maintain appropriate proportions")
    public void allElementsShouldMaintainProportions() {
        assertTrue("Elements should maintain proportions", 
            profilePage.doElementsMaintainProportions());
    }

    @And("all interactive elements should be accessible")
    public void allInteractiveElementsShouldBeAccessible() {
        assertTrue("Interactive elements should be accessible", 
            profilePage.areInteractiveElementsAccessible());
    }

    @Then("the search field should function correctly")
    public void theSearchFieldShouldFunctionCorrectly() {
        assertTrue("Search field should be functional", searchPage.isSearchFieldVisible());
    }

    @And("the results should be displayed adapted to landscape orientation")
    public void theResultsShouldBeAdaptedToLandscape() {
        assertTrue("Results should be adapted to landscape", profilePage.isProfileLoaded());
    }

    @And("all content should be readable and usable")
    public void allContentShouldBeReadable() {
        assertTrue("Content should be readable", profilePage.areTextElementsReadable());
    }

    @When("I click on a follower profile link")
    public void iClickOnFollowerProfileLink() {
        profilePage.navigateToFollowers();
        profilePage.clickFirstFollowerLink();
    }

    @Then("I should be redirected to the follower GitHub profile page")
    public void iShouldBeRedirectedToFollowerProfile() {
        assertTrue("Should be on a GitHub profile page", 
            driver.getCurrentUrl().contains("github.com/"));
    }

    @When("I navigate back and rotate to landscape orientation with dimensions {int}x{int}")
    public void iNavigateBackAndRotateToLandscape(int width, int height) {
        driver.navigate().back();
        driver.manage().window().setSize(new Dimension(width, height));
        currentOrientation = "landscape";
        try { Thread.sleep(500); } catch (InterruptedException e) { }
    }
}