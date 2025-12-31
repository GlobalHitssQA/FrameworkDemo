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
import static org.junit.Assert.*;

public class FollowersListSteps {

    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String BASE_URL = "https://github-profile-search.app"; // URL de la aplicación
    private static final String TEST_USERNAME = "torvalds";

    @Given("the user accesses the GitHub profile search application")
    public void theUserAccessesTheGitHubProfileSearchApplication() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigate(BASE_URL);
        assertTrue("Search interface should be loaded", profileSearchPage.isSearchInputVisible());
    }

    @When("the user enters a username with many followers in the search field")
    public void theUserEntersAUsernameWithManyFollowersInTheSearchField() {
        profileSearchPage.enterUsername(TEST_USERNAME);
        assertTrue("Username should be entered correctly", profileSearchPage.getSearchInputValue().equals(TEST_USERNAME));
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the followers list should be displayed in the right section")
    public void theFollowersListShouldBeDisplayedInTheRightSection() {
        assertTrue("Followers list container should be visible", profileSearchPage.isFollowersListVisible());
    }

    @And("each follower should display an avatar username and profile link")
    public void eachFollowerShouldDisplayAnAvatarUsernameAndProfileLink() {
        assertTrue("First follower avatar should be visible", profileSearchPage.isFirstFollowerAvatarVisible());
        assertTrue("First follower username should be visible", profileSearchPage.isFirstFollowerUsernameVisible());
        assertTrue("First follower profile link should be visible", profileSearchPage.isFirstFollowerLinkVisible());
    }

    @And("the followers list should enable vertical scrolling when content exceeds container")
    public void theFollowersListShouldEnableVerticalScrollingWhenContentExceedsContainer() {
        assertTrue("Followers list should be scrollable", profileSearchPage.isFollowersListScrollable());
    }

    @When("the user scrolls down in the followers list")
    public void theUserScrollsDownInTheFollowersList() {
        profileSearchPage.scrollFollowersList();
    }

    @Then("additional followers should become visible")
    public void additionalFollowersShouldBecomeVisible() {
        assertTrue("Additional followers should be visible after scroll", profileSearchPage.areAdditionalFollowersVisible());
    }

    @When("the user clicks on a follower profile link")
    public void theUserClicksOnAFollowerProfileLink() {
        profileSearchPage.clickFirstFollowerLink();
    }

    @Then("the user should be redirected to the GitHub profile page")
    public void theUserShouldBeRedirectedToTheGitHubProfilePage() {
        String currentUrl = page.url();
        assertTrue("User should be redirected to GitHub profile", currentUrl.contains("github.com"));
        
        // Cleanup
        context.close();
        browser.close();
        playwright.close();
    }
}