package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

public class FollowGitHubUserSteps {

    private Page page;
    private BrowserContext context;
    private GitHubProfileSearchPage profileSearchPage;
    private String originalTabUrl;
    private int initialTabCount;

    public FollowGitHubUserSteps(Page page, BrowserContext context) {
        this.page = page;
        this.context = context;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub profile search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue(profileSearchPage.isSearchInterfaceDisplayed(), 
            "Search interface should be displayed and ready for input");
    }

    @When("the user enters a valid GitHub username in the search input field")
    public void theUserEntersAValidGitHubUsernameInTheSearchInputField() {
        profileSearchPage.enterUsername("octocat");
        assertTrue(profileSearchPage.isUsernameEntered("octocat"), 
            "Username should be entered correctly in the search field");
    }

    @And("the user clicks the search button to load the profile")
    public void theUserClicksTheSearchButtonToLoadTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the user profile is retrieved and displayed successfully")
    public void theUserProfileIsRetrievedAndDisplayedSuccessfully() {
        assertTrue(profileSearchPage.isProfileDisplayed(), 
            "User profile should be retrieved and displayed successfully");
        assertTrue(profileSearchPage.isAvatarVisible(), 
            "User avatar should be visible");
    }

    @When("the user locates the Follow button in the user profile details section")
    public void theUserLocatesTheFollowButtonInTheUserProfileDetailsSection() {
        assertTrue(profileSearchPage.isFollowButtonVisible(), 
            "Follow button should be visible and properly styled in the user details section");
    }

    @And("the user clicks the Follow button")
    public void theUserClicksTheFollowButton() {
        originalTabUrl = page.url();
        initialTabCount = context.pages().size();
        profileSearchPage.clickFollowButton();
    }

    @Then("the system redirects to the GitHub platform to follow the user")
    public void theSystemRedirectsToTheGitHubPlatformToFollowTheUser() {
        // Wait for potential new tab or navigation
        page.waitForTimeout(2000);
        
        List<Page> allPages = context.pages();
        boolean redirectedToGitHub = false;
        
        for (Page p : allPages) {
            String url = p.url();
            if (url.contains("github.com") && (url.contains("/login") || url.contains("follow"))) {
                redirectedToGitHub = true;
                break;
            }
        }
        
        assertTrue(redirectedToGitHub, 
            "System should redirect to GitHub platform to follow the user");
    }

    @And("the GitHub follow page opens in a new browser tab")
    public void theGitHubFollowPageOpensInANewBrowserTab() {
        List<Page> allPages = context.pages();
        int currentTabCount = allPages.size();
        
        // Verify a new tab was opened OR the link target is _blank
        boolean newTabOpened = currentTabCount > initialTabCount;
        boolean hasTargetBlank = profileSearchPage.followButtonOpensInNewTab();
        
        assertTrue(newTabOpened || hasTargetBlank, 
            "GitHub follow page should open in a new browser tab without closing the current application");
        
        // Verify original application tab is still accessible
        boolean originalTabStillOpen = false;
        for (Page p : allPages) {
            if (p.url().equals(originalTabUrl) || p.url().contains("profile-search")) {
                originalTabStillOpen = true;
                break;
            }
        }
        
        assertTrue(originalTabStillOpen || allPages.size() > 1, 
            "Original application should remain open");
    }
}