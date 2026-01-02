package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowersListScrollSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String USERNAME_WITH_MANY_FOLLOWERS = "torvalds";

    public FollowersListScrollSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub Profile Search page")
    public void theUserIsOnTheGitHubProfileSearchPage() {
        profileSearchPage.navigate();
        assertTrue("Search interface should be displayed", profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters a username with many followers in the search field")
    public void theUserEntersAUsernameWithManyFollowersInTheSearchField() {
        profileSearchPage.enterUsername(USERNAME_WITH_MANY_FOLLOWERS);
        assertEquals("Username should be entered in the input field", 
            USERNAME_WITH_MANY_FOLLOWERS, profileSearchPage.getSearchInputValue());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the user profile is displayed with the followers list in the right section")
    public void theUserProfileIsDisplayedWithTheFollowersListInTheRightSection() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue("Followers list should be visible", profileSearchPage.isFollowersListVisible());
    }

    @And("each follower displays an avatar, username, and profile link")
    public void eachFollowerDisplaysAnAvatarUsernameAndProfileLink() {
        assertTrue("Follower items should have avatars", profileSearchPage.doFollowersHaveAvatars());
        assertTrue("Follower items should have usernames", profileSearchPage.doFollowersHaveUsernames());
        assertTrue("Follower items should have profile links", profileSearchPage.doFollowersHaveProfileLinks());
    }

    @And("the followers list allows vertical scrolling when followers exceed container height")
    public void theFollowersListAllowsVerticalScrollingWhenFollowersExceedContainerHeight() {
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
    }

    @When("the user scrolls down through the followers list")
    public void theUserScrollsDownThroughTheFollowersList() {
        profileSearchPage.scrollFollowersList();
    }

    @Then("the list scrolls smoothly displaying all followers beyond the initial viewport")
    public void theListScrollsSmoothlyDisplayingAllFollowersBeyondTheInitialViewport() {
        assertTrue("Should be able to see additional followers after scroll", 
            profileSearchPage.areAdditionalFollowersVisible());
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        profileSearchPage.clickFirstFollowerProfileLink();
    }

    @Then("the system opens the GitHub profile page for that follower")
    public void theSystemOpensTheGitHubProfilePageForThatFollower() {
        assertTrue("New tab or window should open with GitHub profile", 
            profileSearchPage.isFollowerProfilePageOpened(context));
    }
}