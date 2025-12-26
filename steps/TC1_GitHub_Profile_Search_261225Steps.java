package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {
    
    private WebDriver driver;
    private GitHubProfileSearchPage profileSearchPage;
    
    public GitHubProfileSearchSteps(WebDriver driver) {
        this.driver = driver;
        this.profileSearchPage = new GitHubProfileSearchPage(driver);
    }
    
    @Given("the GitHub API connection is active")
    public void theGitHubAPIConnectionIsActive() {
        // API connection is assumed to be active as precondition
        assertTrue("API connection should be active", profileSearchPage.isAPIConnectionActive());
    }
    
    @Given("the GitHub Profile Search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        assertTrue("Search component should be accessible", profileSearchPage.isSearchComponentVisible());
    }
    
    @Given("I am on the GitHub Profile Search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }
    
    @When("I enter the username {string} in the search field")
    public void iEnterTheUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, profileSearchPage.getSearchInputValue());
    }
    
    @When("I click the search button with magnifying glass icon")
    public void iClickTheSearchButtonWithMagnifyingGlassIcon() {
        profileSearchPage.clickSearchButton();
    }
    
    @Then("the system should query the GitHub API for the user")
    public void theSystemShouldQueryTheGitHubAPIForTheUser() {
        profileSearchPage.waitForAPIResponse();
        assertTrue("Profile data should be loaded", profileSearchPage.isProfileDataLoaded());
    }
    
    @Then("I should see the user profile section on the left side")
    public void iShouldSeeTheUserProfileSectionOnTheLeftSide() {
        assertTrue("Profile section should be visible", profileSearchPage.isProfileSectionVisible());
    }
    
    @Then("the profile should display the user avatar")
    public void theProfileShouldDisplayTheUserAvatar() {
        assertTrue("User avatar should be displayed", profileSearchPage.isAvatarDisplayed());
    }
    
    @Then("the profile should display the full name {string}")
    public void theProfileShouldDisplayTheFullName(String fullName) {
        assertEquals("Full name should match", fullName, profileSearchPage.getFullName());
    }
    
    @Then("the profile should display the username {string}")
    public void theProfileShouldDisplayTheUsername(String username) {
        assertEquals("Username should match", username, profileSearchPage.getUsername());
    }
    
    @Then("the profile should display the user biography")
    public void theProfileShouldDisplayTheUserBiography() {
        assertTrue("Biography section should be visible", profileSearchPage.isBiographyVisible());
    }
    
    @Then("the profile should display the location {string}")
    public void theProfileShouldDisplayTheLocation(String location) {
        assertEquals("Location should match", location, profileSearchPage.getLocation());
    }
    
    @Then("the profile should display the company {string}")
    public void theProfileShouldDisplayTheCompany(String company) {
        assertEquals("Company should match", company, profileSearchPage.getCompany());
    }
    
    @Then("the profile should display the personal website link")
    public void theProfileShouldDisplayThePersonalWebsiteLink() {
        assertTrue("Website link should be visible", profileSearchPage.isWebsiteLinkVisible());
    }
    
    @Then("the profile should display the Follow button")
    public void theProfileShouldDisplayTheFollowButton() {
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
    }
    
    @Then("I should see the metrics dashboard with Repos count")
    public void iShouldSeeTheMetricsDashboardWithReposCount() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        assertTrue("Repos count should be a valid number", profileSearchPage.getReposCount() >= 0);
    }
    
    @Then("I should see the metrics dashboard with Followers count")
    public void iShouldSeeTheMetricsDashboardWithFollowersCount() {
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        assertTrue("Followers count should be a valid number", profileSearchPage.getFollowersCount() >= 0);
    }
    
    @Then("I should see the metrics dashboard with Following count")
    public void iShouldSeeTheMetricsDashboardWithFollowingCount() {
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        assertTrue("Following count should be a valid number", profileSearchPage.getFollowingCount() >= 0);
    }
    
    @Then("I should see the metrics dashboard with Gists count")
    public void iShouldSeeTheMetricsDashboardWithGistsCount() {
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
        assertTrue("Gists count should be a valid number", profileSearchPage.getGistsCount() >= 0);
    }
    
    @Then("I should see the followers list on the right section")
    public void iShouldSeeTheFollowersListOnTheRightSection() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }
    
    @Then("each follower should display their avatar")
    public void eachFollowerShouldDisplayTheirAvatar() {
        assertTrue("All follower avatars should be displayed", profileSearchPage.areFollowerAvatarsDisplayed());
    }
    
    @Then("each follower should display their username")
    public void eachFollowerShouldDisplayTheirUsername() {
        assertTrue("All follower usernames should be displayed", profileSearchPage.areFollowerUsernamesDisplayed());
    }
    
    @Then("each follower should have a direct profile link")
    public void eachFollowerShouldHaveADirectProfileLink() {
        assertTrue("All follower profile links should be present", profileSearchPage.areFollowerProfileLinksPresent());
    }
}