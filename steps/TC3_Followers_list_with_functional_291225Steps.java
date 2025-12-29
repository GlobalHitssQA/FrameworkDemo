package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowersListScrollSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String selectedFollowerUsername;

    public FollowersListScrollSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("I have access to the GitHub profile search component")
    public void iHaveAccessToTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search component should be visible", profileSearchPage.isSearchInputVisible());
    }

    @And("the GitHub API is available and accessible")
    public void theGitHubAPIIsAvailableAndAccessible() {
        assertTrue("API indicator should show available status", profileSearchPage.isApiAvailable());
    }

    @When("I search for a GitHub user {string} who has multiple followers")
    public void iSearchForAGitHubUserWhoHasMultipleFollowers(String username) {
        profileSearchPage.enterSearchQuery(username);
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the system loads and displays the user profile with the followers list in the right section")
    public void theSystemLoadsAndDisplaysTheUserProfileWithTheFollowersListInTheRightSection() {
        assertTrue("User profile should be displayed", profileSearchPage.isUserProfileDisplayed());
        assertTrue("Followers section should be visible", profileSearchPage.isFollowersSectionVisible());
    }

    @And("the followers list is displayed vertically aligned with the main information component")
    public void theFollowersListIsDisplayedVerticallyAlignedWithTheMainInformationComponent() {
        assertTrue("Followers list should be vertically aligned", profileSearchPage.isFollowersListVerticallyAligned());
    }

    @And("each follower in the list displays their avatar image")
    public void eachFollowerInTheListDisplaysTheirAvatarImage() {
        assertTrue("All follower avatars should be visible", profileSearchPage.areAllFollowerAvatarsVisible());
    }

    @And("each follower in the list displays their username")
    public void eachFollowerInTheListDisplaysTheirUsername() {
        assertTrue("All follower usernames should be visible", profileSearchPage.areAllFollowerUsernamesVisible());
    }

    @And("each follower in the list includes a direct link to their GitHub profile")
    public void eachFollowerInTheListIncludesADirectLinkToTheirGitHubProfile() {
        assertTrue("All followers should have profile links", profileSearchPage.doAllFollowersHaveProfileLinks());
    }

    @When("I click on a specific follower link")
    public void iClickOnASpecificFollowerLink() {
        selectedFollowerUsername = profileSearchPage.getFirstFollowerUsername();
        profileSearchPage.clickOnFirstFollowerLink();
    }

    @Then("the system redirects correctly to the selected follower GitHub profile page")
    public void theSystemRedirectsCorrectlyToTheSelectedFollowerGitHubProfilePage() {
        assertTrue("Should redirect to follower profile", profileSearchPage.isOnFollowerProfilePage(selectedFollowerUsername));
        profileSearchPage.navigateBack();
    }

    @And("the followers list allows vertical scrolling when the number of followers exceeds the container size")
    public void theFollowersListAllowsVerticalScrollingWhenTheNumberOfFollowersExceedsTheContainerSize() {
        assertTrue("Followers container should be scrollable", profileSearchPage.isFollowersListScrollable());
        assertTrue("Scroll should work correctly", profileSearchPage.canScrollFollowersList());
    }
}