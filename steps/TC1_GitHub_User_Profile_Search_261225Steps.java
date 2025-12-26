package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.GitHubSearchPage;
import pages.GitHubProfilePage;
import utils.DriverManager;

public class GitHubProfileSearchSteps {

    private WebDriver driver;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private String searchedUsername;

    public GitHubProfileSearchSteps() {
        this.driver = DriverManager.getDriver();
        this.searchPage = new GitHubSearchPage(driver);
        this.profilePage = new GitHubProfilePage(driver);
    }

    @Given("the user has an active connection to the GitHub API")
    public void theUserHasActiveConnectionToGitHubAPI() {
        // Precondition: Verified by successful page load
        Assert.assertTrue("GitHub should be accessible", searchPage.isPageLoaded());
    }

    @Given("the GitHub profile search component is accessible and functional")
    public void theGitHubProfileSearchComponentIsAccessible() {
        Assert.assertTrue("Search component should be functional", searchPage.isSearchComponentAvailable());
    }

    @Given("I am on the GitHub profile search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        searchPage.navigateToSearchPage();
    }

    @And("the search input field and search button are displayed")
    public void theSearchInputFieldAndSearchButtonAreDisplayed() {
        Assert.assertTrue("Search input should be displayed", searchPage.isSearchInputDisplayed());
    }

    @When("I enter a valid GitHub username {string} in the search field")
    public void iEnterValidGitHubUsernameInSearchField(String username) {
        this.searchedUsername = username;
        searchPage.enterSearchQuery(username);
    }

    @Then("the entered text {string} is displayed correctly in the search field")
    public void theEnteredTextIsDisplayedCorrectlyInSearchField(String expectedText) {
        String actualText = searchPage.getSearchInputValue();
        Assert.assertEquals("Search field should contain entered text", expectedText, actualText);
    }

    @When("I click on the search button with magnifying glass icon")
    public void iClickOnTheSearchButtonWithMagnifyingGlassIcon() {
        searchPage.clickSearchButton();
    }

    @Then("the system performs a query to the GitHub API for the entered username")
    public void theSystemPerformsQueryToGitHubAPI() {
        searchPage.waitForSearchResults();
    }

    @And("the system successfully retrieves the user profile information")
    public void theSystemSuccessfullyRetrievesUserProfileInformation() {
        searchPage.clickOnUserResult(searchedUsername);
        Assert.assertTrue("Profile page should load", profilePage.isProfilePageLoaded());
    }

    @And("the user profile section displays the avatar image")
    public void theUserProfileSectionDisplaysAvatarImage() {
        Assert.assertTrue("Avatar should be displayed", profilePage.isAvatarDisplayed());
    }

    @And("the user profile section displays the full name {string}")
    public void theUserProfileSectionDisplaysFullName(String expectedFullName) {
        String actualFullName = profilePage.getFullName();
        Assert.assertEquals("Full name should match", expectedFullName, actualFullName);
    }

    @And("the user profile section displays the username {string}")
    public void theUserProfileSectionDisplaysUsername(String expectedUsername) {
        String actualUsername = profilePage.getUsername();
        Assert.assertEquals("Username should match", expectedUsername, actualUsername);
    }

    @And("the user profile section displays the location {string}")
    public void theUserProfileSectionDisplaysLocation(String expectedLocation) {
        String actualLocation = profilePage.getLocation();
        Assert.assertEquals("Location should match", expectedLocation, actualLocation);
    }

    @And("the user profile section displays the organization {string}")
    public void theUserProfileSectionDisplaysOrganization(String expectedOrg) {
        String actualOrg = profilePage.getOrganization();
        Assert.assertEquals("Organization should match", expectedOrg, actualOrg);
    }

    @And("the user profile section displays the website link {string}")
    public void theUserProfileSectionDisplaysWebsiteLink(String expectedUrl) {
        String actualUrl = profilePage.getWebsiteLink();
        Assert.assertTrue("Website link should contain expected URL", actualUrl.contains(expectedUrl));
    }

    @And("the user profile section displays the Follow button")
    public void theUserProfileSectionDisplaysFollowButton() {
        Assert.assertTrue("Follow button should be displayed", profilePage.isFollowButtonDisplayed());
    }

    @And("the dashboard displays the Repositories count {string}")
    public void theDashboardDisplaysRepositoriesCount(String expectedCount) {
        String actualCount = profilePage.getRepositoriesCount();
        Assert.assertEquals("Repositories count should match", expectedCount, actualCount);
    }

    @And("the dashboard displays the Followers count {string}")
    public void theDashboardDisplaysFollowersCount(String expectedCount) {
        String actualCount = profilePage.getFollowersCount();
        Assert.assertTrue("Followers count should contain expected value", actualCount.contains(expectedCount.replace("k", "")));
    }

    @And("the dashboard displays the Following count {string}")
    public void theDashboardDisplaysFollowingCount(String expectedCount) {
        String actualCount = profilePage.getFollowingCount();
        Assert.assertEquals("Following count should match", expectedCount, actualCount);
    }

    @And("the followers list section displays follower cards with avatars")
    public void theFollowersListSectionDisplaysFollowerCardsWithAvatars() {
        profilePage.clickFollowersLink();
        Assert.assertTrue("Follower avatars should be displayed", profilePage.areFollowerAvatarsDisplayed());
    }

    @And("each follower card displays the username with a direct link to their profile")
    public void eachFollowerCardDisplaysUsernameWithDirectLink() {
        Assert.assertTrue("Follower links should be displayed", profilePage.areFollowerLinksDisplayed());
    }
}