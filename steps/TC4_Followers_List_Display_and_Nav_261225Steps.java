package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowersListSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfileSearchPage profileSearchPage;
    private String selectedFollowerUsername;

    public FollowersListSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub Profile Search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
    }

    @And("the search input field and search button are enabled")
    public void theSearchInputFieldAndSearchButtonAreEnabled() {
        assertTrue("Search input should be visible", profileSearchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", profileSearchPage.isSearchButtonVisible());
        assertTrue("Search input should be enabled", profileSearchPage.isSearchInputEnabled());
        assertTrue("Search button should be enabled", profileSearchPage.isSearchButtonEnabled());
    }

    @When("the user enters a valid GitHub username with followers in the search field")
    public void theUserEntersAValidGitHubUsernameWithFollowersInTheSearchField() {
        profileSearchPage.enterUsername("torvalds");
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system retrieves the profile data including the followers list")
    public void theSystemRetrievesTheProfileDataIncludingTheFollowersList() {
        profileSearchPage.waitForProfileToLoad();
        assertTrue("Profile container should be visible", profileSearchPage.isProfileContainerVisible());
    }

    @And("the followers list is displayed in the right section aligned with the main profile component")
    public void theFollowersListIsDisplayedInTheRightSectionAlignedWithTheMainProfileComponent() {
        assertTrue("Followers section should be visible", profileSearchPage.isFollowersSectionVisible());
        assertTrue("Followers list should be displayed", profileSearchPage.isFollowersListVisible());
    }

    @And("each follower shows an avatar, username, and profile link")
    public void eachFollowerShowsAnAvatarUsernameAndProfileLink() {
        assertTrue("At least one follower should be displayed", profileSearchPage.getFollowersCount() > 0);
        assertTrue("First follower should have avatar", profileSearchPage.doesFirstFollowerHaveAvatar());
        assertTrue("First follower should have username", profileSearchPage.doesFirstFollowerHaveUsername());
        assertTrue("First follower should have profile link", profileSearchPage.doesFirstFollowerHaveProfileLink());
    }

    @When("the number of followers exceeds the container size")
    public void theNumberOfFollowersExceedsTheContainerSize() {
        int followersCount = profileSearchPage.getFollowersCount();
        assertTrue("User should have more than 10 followers for scroll test", followersCount > 10);
    }

    @Then("the followers list supports vertical scrolling")
    public void theFollowersListSupportsVerticalScrolling() {
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
        profileSearchPage.scrollFollowersList();
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        selectedFollowerUsername = profileSearchPage.getFirstFollowerUsername();
        profileSearchPage.clickFirstFollowerProfileLink();
    }

    @Then("the user is redirected to the selected follower GitHub profile page")
    public void theUserIsRedirectedToTheSelectedFollowerGitHubProfilePage() {
        profileSearchPage.waitForNavigation();
        String currentUrl = page.url();
        assertTrue("URL should contain github.com", currentUrl.contains("github.com"));
        assertTrue("URL should contain the follower username", 
            currentUrl.toLowerCase().contains(selectedFollowerUsername.toLowerCase()));
    }

    @And("the follower profile page loads correctly displaying their public profile")
    public void theFollowerProfilePageLoadsCorrectlyDisplayingTheirPublicProfile() {
        profileSearchPage.waitForPageLoad();
        assertTrue("Profile page should be loaded", profileSearchPage.isGitHubProfilePageLoaded());
    }
}