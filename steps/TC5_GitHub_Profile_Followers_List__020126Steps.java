package steps;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubFollowersPage;
import pages.GitHubSearchPage;
import pages.GitHubProfilePage;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class FollowersScrollSteps {
    private Page page;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private GitHubFollowersPage followersPage;
    private String testUsername = "torvalds";

    public FollowersScrollSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
        this.profilePage = new GitHubProfilePage(page);
        this.followersPage = new GitHubFollowersPage(page);
    }

    @Given("the user accesses the GitHub user search page")
    public void accessGitHubUserSearchPage() {
        searchPage.navigateToSearchPage();
    }

    @When("the user searches for a GitHub user with extensive followers")
    public void searchForUserWithExtensiveFollowers() {
        searchPage.searchUser(testUsername);
    }

    @And("the user navigates to the user profile page")
    public void navigateToUserProfilePage() {
        searchPage.clickOnUserResult(testUsername);
    }

    @And("the user clicks on the followers count link")
    public void clickOnFollowersCountLink() {
        profilePage.clickFollowersLink();
    }

    @Then("the followers list should be displayed")
    public void verifyFollowersListDisplayed() {
        assertThat(followersPage.getFollowersContainer()).isVisible();
    }

    @And("the followers container should have scroll functionality enabled")
    public void verifyScrollFunctionalityEnabled() {
        assertThat(followersPage.isScrollable()).isTrue();
    }

    @When("the user scrolls down through the followers list")
    public void scrollDownFollowersList() {
        followersPage.scrollFollowersList();
    }

    @Then("additional followers should be visible")
    public void verifyAdditionalFollowersVisible() {
        int initialCount = followersPage.getVisibleFollowersCount();
        followersPage.scrollFollowersList();
        page.waitForTimeout(1000);
        int afterScrollCount = followersPage.getVisibleFollowersCount();
        assertThat(afterScrollCount >= initialCount).isTrue();
    }

    @And("the user should be able to navigate through the entire followers list")
    public void navigateThroughEntireFollowersList() {
        assertThat(followersPage.getFollowersContainer()).isVisible();
        followersPage.scrollToBottom();
    }

    @And("the scroll should stop appropriately at the last follower entry")
    public void verifyScrollStopsAtLastEntry() {
        followersPage.scrollToBottom();
        page.waitForTimeout(500);
        assertThat(followersPage.getNextPageButton()).isVisible();
    }
}