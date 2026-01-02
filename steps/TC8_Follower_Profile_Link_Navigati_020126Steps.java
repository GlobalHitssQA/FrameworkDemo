package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfilePage;
import pages.GitHubFollowersPage;
import static org.junit.Assert.*;

public class FollowerProfileLinkSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfilePage profilePage;
    private GitHubFollowersPage followersPage;
    private String originalUsername;
    private String firstFollowerUsername;
    private String secondFollowerUsername;

    public FollowerProfileLinkSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.profilePage = new GitHubProfilePage(page);
        this.followersPage = new GitHubFollowersPage(page);
    }

    @Given("I am on the GitHub profile page of a user with followers")
    public void iAmOnTheGitHubProfilePageOfAUserWithFollowers() {
        profilePage.navigateToProfile("torvalds");
        originalUsername = "torvalds";
        assertTrue("Profile page should be displayed", profilePage.isProfileDisplayed());
        assertTrue("User should have followers", profilePage.hasFollowers());
    }

    @When("I navigate to the followers tab")
    public void iNavigateToTheFollowersTab() {
        profilePage.clickFollowersLink();
    }

    @Then("I should see the followers list with avatars and usernames")
    public void iShouldSeeTheFollowersListWithAvatarsAndUsernames() {
        assertTrue("Followers list should be visible", followersPage.isFollowersListVisible());
        assertTrue("First follower should have avatar", followersPage.followerHasAvatar(0));
        assertTrue("First follower should have username", followersPage.followerHasUsername(0));
        assertTrue("First follower should have profile link", followersPage.followerHasProfileLink(0));
    }

    @When("I click on the first follower profile link")
    public void iClickOnTheFirstFollowerProfileLink() {
        firstFollowerUsername = followersPage.getFollowerUsername(0);
        followersPage.clickFollowerProfileLink(0);
    }

    @Then("I should be redirected to the first follower GitHub profile page")
    public void iShouldBeRedirectedToTheFirstFollowerGitHubProfilePage() {
        assertTrue("Should be on follower profile page", 
            page.url().contains("github.com/" + firstFollowerUsername));
    }

    @And("the profile page should display the correct username")
    public void theProfilePageShouldDisplayTheCorrectUsername() {
        assertTrue("Profile page should be displayed", profilePage.isProfileDisplayed());
        String displayedUsername = profilePage.getDisplayedUsername();
        assertNotNull("Username should be displayed", displayedUsername);
    }

    @When("I navigate back to the original user followers page")
    public void iNavigateBackToTheOriginalUserFollowersPage() {
        followersPage.navigateToFollowersPage(originalUsername);
    }

    @And("I click on the second follower profile link")
    public void iClickOnTheSecondFollowerProfileLink() {
        secondFollowerUsername = followersPage.getFollowerUsername(1);
        followersPage.clickFollowerProfileLink(1);
    }

    @Then("I should be redirected to the second follower GitHub profile page")
    public void iShouldBeRedirectedToTheSecondFollowerGitHubProfilePage() {
        assertTrue("Should be on second follower profile page", 
            page.url().contains("github.com/" + secondFollowerUsername));
    }

    @And("I should not have any edit capabilities on the profile")
    public void iShouldNotHaveAnyEditCapabilitiesOnTheProfile() {
        assertFalse("Edit profile button should not be visible", 
            profilePage.isEditProfileButtonVisible());
        assertFalse("Settings link should not be visible", 
            profilePage.isSettingsLinkVisible());
    }
}