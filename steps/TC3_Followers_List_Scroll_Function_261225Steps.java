package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class FollowersListScrollSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String selectedFollowerUsername;

    @Given("the user accesses the GitHub Profile Search component")
    public void theUserAccessesTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateToSearchPage();
        assertTrue(profileSearchPage.isSearchInterfaceDisplayed(), 
            "Search interface should be displayed");
    }

    @When("the user searches for a GitHub user with many followers")
    public void theUserSearchesForAGitHubUserWithManyFollowers() {
        String userWithManyFollowers = "torvalds";
        profileSearchPage.searchForUser(userWithManyFollowers);
    }

    @Then("the system displays the user profile with followers list")
    public void theSystemDisplaysTheUserProfileWithFollowersList() {
        assertTrue(profileSearchPage.isUserProfileDisplayed(), 
            "User profile should be displayed");
        assertTrue(profileSearchPage.isFollowersListVisible(), 
            "Followers list should be visible");
    }

    @And("the followers list is displayed vertically aligned in the right section")
    public void theFollowersListIsDisplayedVerticallyAlignedInTheRightSection() {
        assertTrue(profileSearchPage.isFollowersListInRightSection(), 
            "Followers list should be in the right section");
        assertTrue(profileSearchPage.isFollowersListVerticallyAligned(), 
            "Followers list should be vertically aligned");
    }

    @And("each follower displays avatar, username and profile link")
    public void eachFollowerDisplaysAvatarUsernameAndProfileLink() {
        assertTrue(profileSearchPage.doAllFollowersHaveAvatar(), 
            "All followers should have avatar");
        assertTrue(profileSearchPage.doAllFollowersHaveUsername(), 
            "All followers should have username");
        assertTrue(profileSearchPage.doAllFollowersHaveProfileLink(), 
            "All followers should have profile link");
    }

    @And("the followers list has vertical scroll enabled when content exceeds container")
    public void theFollowersListHasVerticalScrollEnabledWhenContentExceedsContainer() {
        assertTrue(profileSearchPage.isFollowersListScrollable(), 
            "Followers list should have vertical scroll enabled");
    }

    @When("the user scrolls down in the followers list")
    public void theUserScrollsDownInTheFollowersList() {
        profileSearchPage.scrollDownFollowersList();
    }

    @Then("additional followers that were not initially visible are displayed")
    public void additionalFollowersThatWereNotInitiallyVisibleAreDisplayed() {
        assertTrue(profileSearchPage.areAdditionalFollowersVisible(), 
            "Additional followers should be visible after scrolling");
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        selectedFollowerUsername = profileSearchPage.getFirstVisibleFollowerUsername();
        profileSearchPage.clickOnFollowerProfileLink(0);
    }

    @Then("the system redirects to the selected follower GitHub profile page")
    public void theSystemRedirectsToTheSelectedFollowerGitHubProfilePage() {
        assertTrue(profileSearchPage.isRedirectedToFollowerProfile(selectedFollowerUsername), 
            "Should redirect to the follower's GitHub profile");
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}