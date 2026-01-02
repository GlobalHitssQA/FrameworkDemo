package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.BrowserType;
import pages.GitHubProfilePage;
import org.junit.jupiter.api.Assertions;

public class FollowerLinkRedirectionSteps {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfilePage profilePage;
    private String searchedUsername;
    private String followerUsername;
    private String followerProfileUrl;

    @Given("I navigate to the GitHub profile search component")
    public void navigateToGitHubProfileSearchComponent() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        profilePage = new GitHubProfilePage(page);
        profilePage.navigateToGitHub();
    }

    @When("I search for a GitHub username with followers")
    public void searchForGitHubUsernameWithFollowers() {
        searchedUsername = "torvalds";
        profilePage.searchUsername(searchedUsername);
    }

    @And("the profile and followers data are displayed")
    public void profileAndFollowersDataAreDisplayed() {
        Assertions.assertTrue(profilePage.isProfileVisible(), "Profile should be visible");
        Assertions.assertTrue(profilePage.hasFollowers(), "Profile should have followers");
    }

    @Then("I should see the followers list with avatars and usernames")
    public void shouldSeeFollowersListWithAvatarsAndUsernames() {
        profilePage.clickFollowersLink();
        Assertions.assertTrue(profilePage.isFollowersListVisible(), "Followers list should be visible");
        Assertions.assertTrue(profilePage.hasFollowerAvatars(), "Follower avatars should be visible");
    }

    @When("I click on a follower profile link")
    public void clickOnFollowerProfileLink() {
        followerUsername = profilePage.getFirstFollowerUsername();
        followerProfileUrl = profilePage.getFirstFollowerProfileUrl();
        profilePage.clickFirstFollowerLink();
    }

    @Then("I should be redirected to the follower's GitHub profile page")
    public void shouldBeRedirectedToFollowerGitHubProfilePage() {
        String currentUrl = page.url();
        Assertions.assertTrue(currentUrl.contains(followerProfileUrl), 
            "Current URL should contain follower profile path: " + followerProfileUrl);
    }

    @And("the GitHub profile page should load successfully")
    public void gitHubProfilePageShouldLoadSuccessfully() {
        Assertions.assertTrue(profilePage.isProfilePageLoaded(), 
            "Follower profile page should be loaded");
        Assertions.assertTrue(page.title().contains("GitHub"), 
            "Page title should contain GitHub");
    }

    @When("I return to the search component")
    public void returnToSearchComponent() {
        page.goBack();
        page.waitForLoadState();
    }

    @Then("all follower links should redirect correctly to their respective profiles")
    public void allFollowerLinksShouldRedirectCorrectly() {
        int followersToTest = Math.min(3, profilePage.getFollowersCount());
        
        for (int i = 0; i < followersToTest; i++) {
            String username = profilePage.getFollowerUsernameByIndex(i);
            String expectedUrl = profilePage.getFollowerProfileUrlByIndex(i);
            
            profilePage.clickFollowerLinkByIndex(i);
            page.waitForLoadState();
            
            String actualUrl = page.url();
            Assertions.assertTrue(actualUrl.contains(expectedUrl),
                "URL should contain expected profile path for user: " + username);
            
            page.goBack();
            page.waitForLoadState();
        }
        
        browser.close();
        playwright.close();
    }
}