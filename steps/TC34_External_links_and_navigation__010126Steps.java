package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class GitHubProfileNavigationSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfilePage profilePage;
    private String originalProfileUrl;
    private String originalUsername;

    @Given("I am on a GitHub user profile page with followers")
    public void iAmOnAGitHubUserProfilePageWithFollowers() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigateToProfile("torvalds");
        originalProfileUrl = page.url();
        originalUsername = "torvalds";
    }

    @Then("the profile should display user details and a followers list")
    public void theProfileShouldDisplayUserDetailsAndFollowersList() {
        assertTrue("User avatar should be visible", profilePage.isUserAvatarVisible());
        assertTrue("Username should be visible", profilePage.isUsernameVisible());
        assertTrue("Followers link should be visible", profilePage.isFollowersLinkVisible());
    }

    @When("I click on a follower username or avatar in the followers list")
    public void iClickOnAFollowerUsernameOrAvatarInTheFollowersList() {
        profilePage.clickFollowersLink();
        profilePage.waitForFollowersPage();
        profilePage.clickFirstFollowerAvatar();
    }

    @Then("the system navigates to that follower GitHub profile page")
    public void theSystemNavigatesToThatFollowerGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("URL should be a GitHub profile", currentUrl.startsWith("https://github.com/"));
        assertFalse("URL should not be the original profile", currentUrl.equals(originalProfileUrl));
        assertTrue("Profile page should be displayed", profilePage.isUserAvatarVisible());
    }

    @When("I return to the original profile page")
    public void iReturnToTheOriginalProfilePage() {
        profilePage.navigateToProfile(originalUsername);
    }

    @And("I click on the Follow button")
    public void iClickOnTheFollowButton() {
        profilePage.clickFollowButton();
    }

    @Then("the Follow button redirects to the GitHub login page for authentication")
    public void theFollowButtonRedirectsToGitHubLoginPage() {
        String currentUrl = page.url();
        assertTrue("Should redirect to login page", currentUrl.contains("/login"));
    }

    @And("all navigation actions work correctly without enabling any editing capabilities")
    public void allNavigationActionsWorkCorrectlyWithoutEnablingAnyEditingCapabilities() {
        assertFalse("Edit profile button should not be visible for non-authenticated user", 
            profilePage.isEditProfileButtonVisible());
        assertFalse("Settings link should not be visible for non-authenticated user", 
            profilePage.isSettingsLinkVisible());
        
        // Cleanup
        browser.close();
        playwright.close();
    }
}