package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import pages.GitHubFollowersPage;
import static org.junit.Assert.*;

public class GitHubFollowersSteps {
    private Page page;
    private GitHubFollowersPage followersPage;
    private String selectedFollowerUsername;
    private int initialScrollPosition;
    
    public GitHubFollowersSteps(Page page) {
        this.page = page;
        this.followersPage = new GitHubFollowersPage(page);
    }
    
    @Given("the user navigates to GitHub homepage")
    public void navigateToGitHubHomepage() {
        followersPage.navigateToGitHub();
    }
    
    @When("the user searches for an existing GitHub user with a large number of followers")
    public void searchForUserWithManyFollowers() {
        followersPage.searchUserByDirectURL("torvalds");
        followersPage.clickFollowersLink();
    }
    
    @Then("the user profile is successfully retrieved and displayed")
    public void verifyUserProfileDisplayed() {
        assertTrue("User profile should be displayed", followersPage.isUserProfileVisible());
        assertTrue("Followers count should be visible", followersPage.isFollowersCountVisible());
    }
    
    @And("the followers list section is visible and properly positioned")
    public void verifyFollowersListVisible() {
        assertTrue("Followers list container should be visible", followersPage.isFollowersListVisible());
    }
    
    @And("each follower item displays avatar username and profile link")
    public void verifyFollowerItemStructure() {
        assertTrue("First follower should have avatar", followersPage.hasFollowerAvatar(0));
        assertTrue("First follower should have username", followersPage.hasFollowerUsername(0));
        assertTrue("First follower should have profile link", followersPage.hasFollowerProfileLink(0));
    }
    
    @And("the list is presented in vertical alignment")
    public void verifyVerticalAlignment() {
        assertTrue("Followers should be in vertical alignment", followersPage.isFollowersListVerticallyAligned());
    }
    
    @And("the number of followers exceeds the visible container height")
    public void verifyFollowersExceedVisibleHeight() {
        int followersCount = followersPage.getVisibleFollowersCount();
        assertTrue("Followers count should exceed visible area (at least 10)", followersCount >= 10);
    }
    
    @When("the user scrolls down within the followers list container")
    public void scrollDownFollowersList() {
        initialScrollPosition = followersPage.getScrollPosition();
        followersPage.scrollFollowersList(500);
    }
    
    @Then("the scroll functionality works smoothly without affecting other page sections")
    public void verifyScrollFunctionality() {
        int currentScrollPosition = followersPage.getScrollPosition();
        assertTrue("Page should have scrolled down", currentScrollPosition > initialScrollPosition);
        assertTrue("Header should still be visible", followersPage.isHeaderVisible());
    }
    
    @When("the user clicks on a follower profile link")
    public void clickFollowerProfileLink() {
        selectedFollowerUsername = followersPage.getFollowerUsername(5);
        followersPage.clickFollowerProfile(5);
    }
    
    @Then("the system redirects to the corresponding GitHub profile page for that follower")
    public void verifyRedirectToFollowerProfile() {
        String currentURL = followersPage.getCurrentURL();
        assertTrue("URL should contain the follower username", 
            currentURL.contains(selectedFollowerUsername));
    }
}