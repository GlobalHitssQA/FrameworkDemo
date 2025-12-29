package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {
    
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    
    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }
    
    @Given("the GitHub profile search component is displayed")
    public void theGitHubProfileSearchComponentIsDisplayed() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
    }
    
    @When("I enter a valid GitHub username {string} in the search field")
    public void iEnterAValidGitHubUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
        String enteredValue = profileSearchPage.getSearchInputValue();
        assertEquals("Username should be entered correctly", username, enteredValue);
    }
    
    @And("I click the search button to execute the query")
    public void iClickTheSearchButtonToExecuteTheQuery() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }
    
    @Then("the metrics dashboard displays the correct totals for repos, followers, following, and gists")
    public void theMetricsDashboardDisplaysTheCorrectTotals() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
        
        String reposCount = profileSearchPage.getReposCount();
        String followersCount = profileSearchPage.getFollowersCount();
        String followingCount = profileSearchPage.getFollowingCount();
        String gistsCount = profileSearchPage.getGistsCount();
        
        assertNotNull("Repos count should not be null", reposCount);
        assertNotNull("Followers count should not be null", followersCount);
        assertNotNull("Following count should not be null", followingCount);
        assertNotNull("Gists count should not be null", gistsCount);
        
        assertTrue("Repos count should be a valid number", reposCount.matches("\\d+"));
        assertTrue("Followers count should be a valid number", followersCount.matches("\\d+"));
        assertTrue("Following count should be a valid number", followingCount.matches("\\d+"));
        assertTrue("Gists count should be a valid number", gistsCount.matches("\\d+"));
    }
    
    @And("the user profile section displays avatar, full name, username, biography, location, company, web link, and follow button")
    public void theUserProfileSectionDisplaysCompleteInformation() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Full name should be visible", profileSearchPage.isFullNameVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Biography should be visible", profileSearchPage.isBiographyVisible());
        assertTrue("Location should be visible", profileSearchPage.isLocationVisible());
        assertTrue("Company should be visible", profileSearchPage.isCompanyVisible());
        assertTrue("Web link should be visible", profileSearchPage.isWebLinkVisible());
        assertTrue("Follow button should be visible", profileSearchPage.isFollowButtonVisible());
        
        String fullName = profileSearchPage.getFullName();
        String username = profileSearchPage.getUsername();
        
        assertNotNull("Full name should not be empty", fullName);
        assertFalse("Full name should not be empty", fullName.isEmpty());
        assertNotNull("Username should not be empty", username);
        assertTrue("Username should start with @", username.startsWith("@"));
    }
    
    @And("the followers list section displays avatars, usernames, and profile links for each follower")
    public void theFollowersListSectionDisplaysFollowerInformation() {
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
        
        int followersCount = profileSearchPage.getFollowersListCount();
        assertTrue("Followers list should contain at least one follower", followersCount > 0);
        
        assertTrue("First follower avatar should be visible", profileSearchPage.isFirstFollowerAvatarVisible());
        assertTrue("First follower username should be visible", profileSearchPage.isFirstFollowerUsernameVisible());
        assertTrue("First follower profile link should be visible", profileSearchPage.isFirstFollowerProfileLinkVisible());
    }
    
    @And("the API request counter indicator displays the current usage limit")
    public void theApiRequestCounterIndicatorDisplaysCurrentUsage() {
        assertTrue("API requests indicator should be visible", profileSearchPage.isApiRequestsIndicatorVisible());
        
        String requestsText = profileSearchPage.getApiRequestsText();
        assertNotNull("API requests text should not be null", requestsText);
        assertTrue("API requests should show usage format (e.g., 51/60)", requestsText.matches("\\d+/\\d+"));
    }
}