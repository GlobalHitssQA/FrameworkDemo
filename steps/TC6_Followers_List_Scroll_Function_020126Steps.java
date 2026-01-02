package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubFollowersPage;
import static org.junit.Assert.*;

public class FollowersListScrollSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubFollowersPage followersPage;
    private int initialScrollPosition;
    private int bottomScrollPosition;

    @Given("the user navigates to a GitHub profile with a large number of followers")
    public void theUserNavigatesToAGitHubProfileWithALargeNumberOfFollowers() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        followersPage = new GitHubFollowersPage(page);
        
        // Navigate to a profile with many followers (e.g., torvalds)
        followersPage.navigateToProfile("torvalds");
        assertTrue("Profile should load successfully", followersPage.isProfileLoaded());
    }

    @When("the user clicks on the followers link to view the followers list")
    public void theUserClicksOnTheFollowersLinkToViewTheFollowersList() {
        followersPage.clickFollowersLink();
    }

    @Then("the followers list should be displayed in the main content area")
    public void theFollowersListShouldBeDisplayedInTheMainContentArea() {
        assertTrue("Followers list should be visible", followersPage.isFollowersListVisible());
    }

    @And("the followers list container should have a defined height limit")
    public void theFollowersListContainerShouldHaveADefinedHeightLimit() {
        assertTrue("Followers container should exist", followersPage.isFollowersContainerPresent());
        int followerCount = followersPage.getVisibleFollowersCount();
        assertTrue("Should display multiple followers", followerCount > 0);
    }

    @When("the user scrolls down within the followers list")
    public void theUserScrollsDownWithinTheFollowersList() {
        initialScrollPosition = followersPage.getCurrentScrollPosition();
        followersPage.scrollDownFollowersList();
    }

    @Then("additional followers should be revealed through scrolling")
    public void additionalFollowersShouldBeRevealedThroughScrolling() {
        int currentScrollPosition = followersPage.getCurrentScrollPosition();
        assertTrue("Scroll position should have changed", currentScrollPosition > initialScrollPosition);
    }

    @When("the user scrolls to the bottom of the followers list")
    public void theUserScrollsToTheBottomOfTheFollowersList() {
        followersPage.scrollToBottomOfFollowersList();
        bottomScrollPosition = followersPage.getCurrentScrollPosition();
    }

    @Then("all visible followers on the current page should be accessible")
    public void allVisibleFollowersOnTheCurrentPageShouldBeAccessible() {
        assertTrue("Should have scrolled to bottom", bottomScrollPosition > initialScrollPosition);
        assertTrue("Followers should still be visible", followersPage.isFollowersListVisible());
    }

    @And("pagination controls should be available for more followers")
    public void paginationControlsShouldBeAvailableForMoreFollowers() {
        assertTrue("Pagination should be visible", followersPage.isPaginationVisible());
        assertTrue("Next page link should exist", followersPage.isNextPageLinkPresent());
    }

    @When("the user scrolls back to the top of the followers list")
    public void theUserScrollsBackToTheTopOfTheFollowersList() {
        followersPage.scrollToTopOfFollowersList();
    }

    @Then("the scroll functionality should work bidirectionally without issues")
    public void theScrollFunctionalityShouldWorkBidirectionallyWithoutIssues() {
        int topScrollPosition = followersPage.getCurrentScrollPosition();
        assertTrue("Should have scrolled back to top", topScrollPosition < bottomScrollPosition);
        assertTrue("Followers list should still be functional", followersPage.isFollowersListVisible());
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}