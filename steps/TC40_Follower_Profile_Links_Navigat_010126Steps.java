package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

public class FollowerProfileLinksSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfileSearchPage profileSearchPage;
    private String clickedFollowerUsername;
    private Page newTab;
    private List<String> testedFollowerUsernames;

    public FollowerProfileLinksSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
        this.testedFollowerUsernames = new java.util.ArrayList<>();
    }

    @Given("the user is on the GitHub Profile Search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigate();
        assertTrue(profileSearchPage.isSearchComponentVisible(), 
            "Search component should be visible");
    }

    @When("the user enters a valid GitHub username with followers in the search input")
    public void theUserEntersAValidGitHubUsernameWithFollowersInTheSearchInput() {
        String usernameWithFollowers = "torvalds";
        profileSearchPage.enterUsername(usernameWithFollowers);
        assertTrue(profileSearchPage.getSearchInputValue().contains(usernameWithFollowers),
            "Username should be entered correctly in the input field");
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the profile data loads successfully with the followers list displayed")
    public void theProfileDataLoadsSuccessfullyWithTheFollowersListDisplayed() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue(profileSearchPage.isProfileDataVisible(), 
            "Profile data should be visible");
        assertTrue(profileSearchPage.isFollowersListVisible(), 
            "Followers list should be displayed in the right section");
    }

    @And("the followers list shows avatars usernames and clickable profile links")
    public void theFollowersListShowsAvatarsUsernamesAndClickableProfileLinks() {
        assertTrue(profileSearchPage.areFollowerAvatarsVisible(), 
            "Follower avatars should be visible");
        assertTrue(profileSearchPage.areFollowerUsernamesVisible(), 
            "Follower usernames should be visible");
        assertTrue(profileSearchPage.areFollowerLinksClickable(), 
            "Follower profile links should be clickable");
    }

    @When("the user clicks on the first follower profile link")
    public void theUserClicksOnTheFirstFollowerProfileLink() {
        clickedFollowerUsername = profileSearchPage.getFollowerUsernameAtIndex(0);
        testedFollowerUsernames.add(clickedFollowerUsername);
        
        Page[] newPageHolder = new Page[1];
        context.onPage(p -> newPageHolder[0] = p);
        
        profileSearchPage.clickFollowerLinkAtIndex(0);
        
        if (newPageHolder[0] != null) {
            newTab = newPageHolder[0];
            newTab.waitForLoadState();
        }
    }

    @Then("the system opens the GitHub profile page for that follower")
    public void theSystemOpensTheGitHubProfilePageForThatFollower() {
        assertNotNull(newTab, "A new tab should be opened for the follower profile");
        String currentUrl = newTab.url();
        assertTrue(currentUrl.contains("github.com"), 
            "Should redirect to GitHub domain");
    }

    @And("the opened profile page matches the clicked follower username")
    public void theOpenedProfilePageMatchesTheClickedFollowerUsername() {
        String currentUrl = newTab.url();
        assertTrue(currentUrl.toLowerCase().contains(clickedFollowerUsername.toLowerCase()), 
            "The GitHub profile page should match the follower username: " + clickedFollowerUsername);
    }

    @When("the user returns to the search component")
    public void theUserReturnsToTheSearchComponent() {
        if (newTab != null) {
            newTab.close();
        }
        page.bringToFront();
        assertTrue(profileSearchPage.isFollowersListVisible(), 
            "Followers list should still be visible after returning");
    }

    @And("the user clicks on a different follower link")
    public void theUserClicksOnADifferentFollowerLink() {
        clickedFollowerUsername = profileSearchPage.getFollowerUsernameAtIndex(1);
        testedFollowerUsernames.add(clickedFollowerUsername);
        
        Page[] newPageHolder = new Page[1];
        context.onPage(p -> newPageHolder[0] = p);
        
        profileSearchPage.clickFollowerLinkAtIndex(1);
        
        if (newPageHolder[0] != null) {
            newTab = newPageHolder[0];
            newTab.waitForLoadState();
        }
    }

    @Then("the system redirects to the new follower GitHub profile correctly")
    public void theSystemRedirectsToTheNewFollowerGitHubProfileCorrectly() {
        assertNotNull(newTab, "A new tab should be opened for the second follower");
        String currentUrl = newTab.url();
        assertTrue(currentUrl.contains("github.com"), 
            "Should redirect to GitHub domain");
        assertTrue(currentUrl.toLowerCase().contains(clickedFollowerUsername.toLowerCase()), 
            "The GitHub profile page should match the second follower username: " + clickedFollowerUsername);
        
        if (newTab != null) {
            newTab.close();
        }
        page.bringToFront();
    }

    @When("the user tests multiple follower links")
    public void theUserTestsMultipleFollowerLinks() {
        int numberOfFollowersToTest = Math.min(3, profileSearchPage.getFollowersCount());
        
        for (int i = 2; i < numberOfFollowersToTest + 2 && i < profileSearchPage.getFollowersCount(); i++) {
            String followerUsername = profileSearchPage.getFollowerUsernameAtIndex(i);
            testedFollowerUsernames.add(followerUsername);
            
            Page[] newPageHolder = new Page[1];
            context.onPage(p -> newPageHolder[0] = p);
            
            profileSearchPage.clickFollowerLinkAtIndex(i);
            
            if (newPageHolder[0] != null) {
                newTab = newPageHolder[0];
                newTab.waitForLoadState();
                
                String currentUrl = newTab.url();
                assertTrue(currentUrl.contains("github.com"), 
                    "Should redirect to GitHub for follower: " + followerUsername);
                assertTrue(currentUrl.toLowerCase().contains(followerUsername.toLowerCase()), 
                    "URL should contain follower username: " + followerUsername);
                
                newTab.close();
                page.bringToFront();
            }
        }
    }

    @Then("all follower links redirect properly to their respective GitHub profiles")
    public void allFollowerLinksRedirectProperlyToTheirRespectiveGitHubProfiles() {
        assertTrue(testedFollowerUsernames.size() >= 3, 
            "At least 3 follower links should have been tested successfully");
    }
}