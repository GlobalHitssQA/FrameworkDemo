package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileFollowersScrollSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private int initialFollowersCount;
    private String firstFollowerName;
    private String lastFollowerName;

    public GitHubProfileFollowersScrollSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void theUserNavigatesToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInputVisible());
    }

    @When("the user searches for a GitHub user with a large number of followers")
    public void theUserSearchesForAGitHubUserWithLargeNumberOfFollowers() {
        profileSearchPage.searchUser("torvalds");
    }

    @Then("the profile should load successfully")
    public void theProfileShouldLoadSuccessfully() {
        assertTrue("Profile should be visible", profileSearchPage.isProfileVisible());
    }

    @And("the followers list should display multiple entries")
    public void theFollowersListShouldDisplayMultipleEntries() {
        initialFollowersCount = profileSearchPage.getVisibleFollowersCount();
        assertTrue("Followers list should have multiple entries", initialFollowersCount > 0);
    }

    @And("the followers list container should have a defined height limit")
    public void theFollowersListContainerShouldHaveDefinedHeightLimit() {
        assertTrue("Followers container should have overflow scroll", profileSearchPage.isFollowersContainerScrollable());
    }

    @When("the user scrolls down within the followers list")
    public void theUserScrollsDownWithinTheFollowersList() {
        firstFollowerName = profileSearchPage.getFirstFollowerName();
        profileSearchPage.scrollFollowersListDown(300);
        page.waitForTimeout(500);
    }

    @Then("additional follower entries should be revealed")
    public void additionalFollowerEntriesShouldBeRevealed() {
        String currentFirstVisible = profileSearchPage.getFirstVisibleFollowerName();
        assertNotEquals("First visible follower should change after scrolling", firstFollowerName, currentFirstVisible);
    }

    @When("the user scrolls to the bottom of the followers list")
    public void theUserScrollsToTheBottomOfTheFollowersList() {
        profileSearchPage.scrollFollowersListToBottom();
        page.waitForTimeout(500);
    }

    @Then("the scrolling should stop at the last follower entry without errors")
    public void theScrollingShouldStopAtLastFollowerEntryWithoutErrors() {
        lastFollowerName = profileSearchPage.getLastVisibleFollowerName();
        assertNotNull("Last follower should be visible", lastFollowerName);
        assertTrue("Should be at bottom of scroll", profileSearchPage.isFollowersListAtBottom());
    }

    @When("the user scrolls back to the top of the followers list")
    public void theUserScrollsBackToTheTopOfTheFollowersList() {
        profileSearchPage.scrollFollowersListToTop();
        page.waitForTimeout(500);
    }

    @Then("the list should return to the initial view showing the first followers")
    public void theListShouldReturnToInitialViewShowingFirstFollowers() {
        String currentFirstVisible = profileSearchPage.getFirstVisibleFollowerName();
        assertEquals("Should return to first follower", firstFollowerName, currentFirstVisible);
        assertTrue("Should be at top of scroll", profileSearchPage.isFollowersListAtTop());
    }
}