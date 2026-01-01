package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class FollowerProfileLinkSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfilePage gitHubProfilePage;
    private String selectedFollowerUsername;

    @Given("the user is on the GitHub profile search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        gitHubProfilePage = new GitHubProfilePage(page);
        gitHubProfilePage.navigateToHomePage();
        assertTrue("Search interface should be displayed", gitHubProfilePage.isSearchInputVisible());
    }

    @When("the user enters a valid GitHub username with followers in the search input")
    public void theUserEntersAValidGitHubUsernameWithFollowersInTheSearchInput() {
        gitHubProfilePage.enterUsername("torvalds");
    }

    @And("the user clicks the search button to load the profile")
    public void theUserClicksTheSearchButtonToLoadTheProfile() {
        gitHubProfilePage.clickSearchButton();
        gitHubProfilePage.waitForProfileToLoad();
    }

    @Then("the followers list should be visible in the right section")
    public void theFollowersListShouldBeVisibleInTheRightSection() {
        gitHubProfilePage.navigateToFollowersTab();
        assertTrue("Followers list should be visible", gitHubProfilePage.isFollowersListVisible());
    }

    @And("each follower entry should display a clickable profile link")
    public void eachFollowerEntryShouldDisplayAClickableProfileLink() {
        assertTrue("Follower entries should have clickable profile links", 
            gitHubProfilePage.areFollowerProfileLinksClickable());
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        selectedFollowerUsername = gitHubProfilePage.getFirstFollowerUsername();
        gitHubProfilePage.clickFirstFollowerProfileLink();
    }

    @Then("the browser should navigate to the correct GitHub profile URL for that follower")
    public void theBrowserShouldNavigateToTheCorrectGitHubProfileURLForThatFollower() {
        String currentUrl = gitHubProfilePage.getCurrentUrl();
        assertTrue("URL should contain the follower's username", 
            currentUrl.contains("github.com/" + selectedFollowerUsername));
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}