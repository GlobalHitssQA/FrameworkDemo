package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class FollowerNavigationSteps {
    private Page page;
    private GitHubSearchPage searchPage;
    private String searchedUsername;
    private String clickedFollowerUsername;

    public FollowerNavigationSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the GitHub profile search interface is displayed")
    public void theGitHubProfileSearchInterfaceIsDisplayed() {
        searchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
    }

    @When("I search for a GitHub user with at least one follower")
    public void iSearchForAGitHubUserWithAtLeastOneFollower() {
        searchedUsername = "octocat";
        searchPage.searchUser(searchedUsername);
    }

    @Then("the profile loads successfully with followers list visible")
    public void theProfileLoadsSuccessfullyWithFollowersListVisible() {
        assertTrue("Profile container should be visible", searchPage.isProfileContainerVisible());
        assertTrue("Followers list should be visible", searchPage.isFollowersListVisible());
    }

    @And("at least one follower is displayed with avatar and username")
    public void atLeastOneFollowerIsDisplayedWithAvatarAndUsername() {
        assertTrue("At least one follower should be present", searchPage.getFollowersCount() > 0);
        assertTrue("First follower avatar should be visible", searchPage.isFirstFollowerAvatarVisible());
        assertTrue("First follower username should be visible", searchPage.isFirstFollowerUsernameVisible());
    }

    @When("I hover over the follower username to verify clickable state")
    public void iHoverOverTheFollowerUsernameToVerifyClickableState() {
        searchPage.hoverOverFirstFollower();
    }

    @Then("the cursor changes to pointer indicating the element is clickable")
    public void theCursorChangesToPointerIndicatingTheElementIsClickable() {
        String cursorStyle = searchPage.getFirstFollowerCursorStyle();
        assertEquals("Cursor should be pointer", "pointer", cursorStyle);
    }

    @When("I click on the follower profile link")
    public void iClickOnTheFollowerProfileLink() {
        clickedFollowerUsername = searchPage.getFirstFollowerUsername();
        searchPage.clickFirstFollowerLink();
    }

    @Then("the system redirects to the corresponding GitHub profile page")
    public void theSystemRedirectsToTheCorrespondingGitHubProfilePage() {
        page.waitForLoadState();
        String currentUrl = page.url();
        assertTrue("URL should contain github.com", currentUrl.contains("github.com"));
        assertTrue("URL should contain follower username", currentUrl.contains(clickedFollowerUsername));
    }

    @And("the opened page displays the correct follower GitHub profile information")
    public void theOpenedPageDisplaysTheCorrectFollowerGitHubProfileInformation() {
        String profileUsername = searchPage.getProfileUsername();
        assertEquals("Profile username should match clicked follower", clickedFollowerUsername, profileUsername);
    }
}