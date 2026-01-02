package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class AvatarResolutionSteps {
    private Page page;
    private GitHubSearchPage searchPage;

    public AvatarResolutionSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToSearchComponent() {
        searchPage.navigate();
        assertTrue("Search interface should be displayed", searchPage.isSearchInterfaceVisible());
    }

    @When("the user enters a valid GitHub username {string} in the search input field")
    public void enterUsername(String username) {
        searchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void clickSearchButton() {
        searchPage.clickSearchButton();
    }

    @Then("the user profile information should be displayed")
    public void verifyProfileDisplayed() {
        assertTrue("Profile information should be visible", searchPage.isProfileVisible());
    }

    @And("the avatar image should be visible in the user details section")
    public void verifyAvatarVisible() {
        assertTrue("Avatar should be visible", searchPage.isAvatarVisible());
    }

    @And("the avatar image should load completely without broken image indicators")
    public void verifyAvatarLoaded() {
        assertTrue("Avatar should be loaded without errors", searchPage.isAvatarLoaded());
    }

    @And("the avatar image should appear clear with appropriate resolution")
    public void verifyAvatarResolution() {
        int width = searchPage.getAvatarWidth();
        int height = searchPage.getAvatarHeight();
        assertTrue("Avatar width should be at least 100px", width >= 100);
        assertTrue("Avatar height should be at least 100px", height >= 100);
    }

    @And("the avatar image source URL should be valid")
    public void verifyAvatarSourceURL() {
        String avatarSrc = searchPage.getAvatarSrc();
        assertNotNull("Avatar source should not be null", avatarSrc);
        assertTrue("Avatar source should be a valid URL", avatarSrc.startsWith("http"));
    }

    @When("the user scrolls to the followers list section")
    public void scrollToFollowersList() {
        searchPage.scrollToFollowersList();
    }

    @Then("all follower avatars should be visible")
    public void verifyFollowerAvatarsVisible() {
        assertTrue("Follower list should be visible", searchPage.isFollowersListVisible());
        int count = searchPage.getFollowerAvatarCount();
        assertTrue("At least one follower avatar should be visible", count > 0);
    }

    @And("each follower avatar should load with correct resolution")
    public void verifyFollowerAvatarsResolution() {
        assertTrue("All follower avatars should be loaded correctly", searchPage.areAllFollowerAvatarsLoaded());
    }
}