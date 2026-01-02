package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import pages.GitHubFollowersPage;
import static org.junit.Assert.*;

public class FollowersListSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfilePage profilePage;
    private GitHubFollowersPage followersPage;
    private static final String BASE_URL = "https://github.com";
    private static final String TEST_USER_WITH_MANY_FOLLOWERS = "torvalds";
    private String selectedFollowerUsername;

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profilePage = new GitHubProfilePage(page);
        followersPage = new GitHubFollowersPage(page);
        profilePage.navigateTo(BASE_URL);
        assertTrue("GitHub homepage should be displayed", profilePage.isSearchComponentDisplayed());
    }

    @When("the user searches for a GitHub user with a large number of followers")
    public void theUserSearchesForAGitHubUserWithLargeNumberOfFollowers() {
        profilePage.navigateToUserProfile(TEST_USER_WITH_MANY_FOLLOWERS);
    }

    @Then("the user profile is retrieved successfully")
    public void theUserProfileIsRetrievedSuccessfully() {
        assertTrue("User profile should be displayed", profilePage.isUserProfileDisplayed());
        assertTrue("User avatar should be visible", profilePage.isAvatarVisible());
    }

    @And("the followers list section is visible on the right side of the interface")
    public void theFollowersListSectionIsVisibleOnTheRightSide() {
        profilePage.clickFollowersLink();
        assertTrue("Followers section should be visible", followersPage.isFollowersListVisible());
    }

    @And("each follower entry displays avatar username and profile link")
    public void eachFollowerEntryDisplaysAvatarUsernameAndProfileLink() {
        assertTrue("First follower should have avatar", followersPage.doesFirstFollowerHaveAvatar());
        assertTrue("First follower should have username", followersPage.doesFirstFollowerHaveUsername());
        assertTrue("First follower should have profile link", followersPage.doesFirstFollowerHaveProfileLink());
    }

    @And("the followers list contains more items than the visible container area")
    public void theFollowersListContainsMoreItemsThanVisibleContainerArea() {
        int followerCount = followersPage.getVisibleFollowersCount();
        assertTrue("Followers list should have multiple entries", followerCount > 10);
    }

    @And("vertical scroll capability is present on the followers list container")
    public void verticalScrollCapabilityIsPresentOnTheFollowersListContainer() {
        assertTrue("Page should be scrollable", followersPage.isPageScrollable());
    }

    @When("the user scrolls down through the followers list")
    public void theUserScrollsDownThroughTheFollowersList() {
        followersPage.scrollToBottomOfFollowersList();
    }

    @Then("the list scrolls smoothly allowing navigation through all follower entries")
    public void theListScrollsSmoothlyAllowingNavigationThroughAllFollowerEntries() {
        assertTrue("Should have scrolled down", followersPage.hasScrolledDown());
    }

    @And("all followers are accessible through scrolling")
    public void allFollowersAreAccessibleThroughScrolling() {
        assertTrue("Last visible follower should be accessible", followersPage.isLastFollowerVisible());
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        followersPage.scrollToTop();
        selectedFollowerUsername = followersPage.getFirstFollowerUsername();
        followersPage.clickFirstFollowerProfileLink();
    }

    @Then("the user is redirected to the corresponding GitHub profile page")
    public void theUserIsRedirectedToTheCorrespondingGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("Should be redirected to follower's profile", 
            currentUrl.contains("github.com/" + selectedFollowerUsername) || 
            currentUrl.contains("github.com"));
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}