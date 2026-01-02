package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfilePage;
import pages.GitHubFollowersPage;
import static org.junit.Assert.assertTrue;

public class FollowersListSteps {

    private Page page;
    private GitHubProfilePage profilePage;
    private GitHubFollowersPage followersPage;

    public FollowersListSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
        this.followersPage = new GitHubFollowersPage(page);
    }

    @Given("the user navigates to a GitHub profile with multiple followers")
    public void theUserNavigatesToAGitHubProfileWithMultipleFollowers() {
        profilePage.navigateToProfile("torvalds");
        assertTrue("Profile page should be loaded", profilePage.isProfileLoaded());
    }

    @When("the user clicks on the followers link")
    public void theUserClicksOnTheFollowersLink() {
        profilePage.clickFollowersLink();
    }

    @Then("the followers list section is visible")
    public void theFollowersListSectionIsVisible() {
        assertTrue("Followers list section should be visible", followersPage.isFollowersListVisible());
    }

    @And("each follower entry displays an avatar image")
    public void eachFollowerEntryDisplaysAnAvatarImage() {
        assertTrue("All follower entries should display avatar images", followersPage.allFollowersHaveAvatars());
    }

    @And("each follower entry shows the username")
    public void eachFollowerEntryShowsTheUsername() {
        assertTrue("All follower entries should display usernames", followersPage.allFollowersHaveUsernames());
    }

    @And("each follower entry contains a direct link to their GitHub profile")
    public void eachFollowerEntryContainsADirectLinkToTheirGitHubProfile() {
        assertTrue("All follower entries should have profile links", followersPage.allFollowersHaveProfileLinks());
    }
}