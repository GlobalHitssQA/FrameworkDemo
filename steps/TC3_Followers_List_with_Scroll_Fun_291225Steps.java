package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileFinderPage;
import static org.junit.Assert.*;

public class FollowersListSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileFinderPage profileFinderPage;
    private String selectedFollowerUsername;

    @Given("the user has access to the GitHub Profile Finder component")
    public void theUserHasAccessToTheGitHubProfileFinderComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profileFinderPage = new GitHubProfileFinderPage(page);
        profileFinderPage.navigateToApp();
    }

    @Given("the GitHub API is available and accessible")
    public void theGitHubAPIIsAvailableAndAccessible() {
        assertTrue("GitHub API should be accessible", profileFinderPage.isApiIndicatorVisible());
    }

    @Given("I perform a successful search for a GitHub user with multiple followers")
    public void iPerformASuccessfulSearchForAGitHubUserWithMultipleFollowers() {
        profileFinderPage.searchForUser("torvalds");
    }

    @When("the profile is loaded successfully")
    public void theProfileIsLoadedSuccessfully() {
        assertTrue("User profile should be displayed", profileFinderPage.isUserProfileDisplayed());
    }

    @Then("I should see the followers list displayed in the right section")
    public void iShouldSeeTheFollowersListDisplayedInTheRightSection() {
        assertTrue("Followers list section should be visible", profileFinderPage.isFollowersListVisible());
    }

    @And("the followers list should be displayed vertically aligned with the main component")
    public void theFollowersListShouldBeDisplayedVerticallyAlignedWithTheMainComponent() {
        assertTrue("Followers list should be vertically aligned", profileFinderPage.isFollowersListVerticallyAligned());
    }

    @And("each follower should display their avatar image")
    public void eachFollowerShouldDisplayTheirAvatarImage() {
        assertTrue("All follower avatars should be visible", profileFinderPage.areAllFollowerAvatarsVisible());
    }

    @And("each follower should display their username")
    public void eachFollowerShouldDisplayTheirUsername() {
        assertTrue("All follower usernames should be visible", profileFinderPage.areAllFollowerUsernamesVisible());
    }

    @And("each follower should have a direct link to their GitHub profile")
    public void eachFollowerShouldHaveADirectLinkToTheirGitHubProfile() {
        assertTrue("All follower profile links should be present", profileFinderPage.areAllFollowerProfileLinksPresent());
    }

    @When("I click on a specific follower link")
    public void iClickOnASpecificFollowerLink() {
        selectedFollowerUsername = profileFinderPage.getFirstFollowerUsername();
        profileFinderPage.clickOnFirstFollowerLink();
    }

    @Then("I should be redirected to the selected follower GitHub profile page")
    public void iShouldBeRedirectedToTheSelectedFollowerGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("URL should contain the follower username", 
            currentUrl.contains("github.com/" + selectedFollowerUsername) || 
            currentUrl.contains(selectedFollowerUsername));
        profileFinderPage.navigateBack();
    }

    @When("the number of followers exceeds the container size")
    public void theNumberOfFollowersExceedsTheContainerSize() {
        assertTrue("Followers count should exceed container capacity", 
            profileFinderPage.getFollowersCount() > profileFinderPage.getVisibleFollowersInContainer());
    }

    @Then("the followers list should have a functional vertical scroll bar")
    public void theFollowersListShouldHaveAFunctionalVerticalScrollBar() {
        assertTrue("Vertical scroll bar should be functional", profileFinderPage.isFollowersListScrollable());
    }

    @And("I should be able to scroll through all followers without losing design alignment")
    public void iShouldBeAbleToScrollThroughAllFollowersWithoutLosingDesignAlignment() {
        profileFinderPage.scrollFollowersListToBottom();
        assertTrue("Design alignment should be maintained after scroll", 
            profileFinderPage.isFollowersListVerticallyAligned());
        profileFinderPage.scrollFollowersListToTop();
        assertTrue("Design alignment should be maintained after scrolling back", 
            profileFinderPage.isFollowersListVerticallyAligned());
    }
}