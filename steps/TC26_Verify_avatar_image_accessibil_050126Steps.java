package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class AvatarAccessibilitySteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private String searchedUsername;

    public AvatarAccessibilitySteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubProfileSearch() {
        page.navigate("https://github.com");
        assertTrue("Search interface should be displayed", profilePage.isSearchInterfaceVisible());
    }

    @When("the user searches for a GitHub user with a profile avatar")
    public void searchForUserWithAvatar() {
        searchedUsername = "torvalds";
        profilePage.searchForUser(searchedUsername);
    }

    @Then("the user profile loads with avatar image visible in the left section")
    public void verifyAvatarImageVisible() {
        assertTrue("Avatar image should be visible", profilePage.isMainAvatarVisible());
    }

    @And("the avatar image element is accessible for inspection")
    public void verifyAvatarElementAccessible() {
        assertNotNull("Avatar element should be accessible", profilePage.getMainAvatarElement());
    }

    @And("the avatar image has an alt attribute defined")
    public void verifyAvatarHasAltAttribute() {
        String altText = profilePage.getMainAvatarAltText();
        assertNotNull("Alt attribute should exist", altText);
        assertFalse("Alt attribute should not be empty", altText.trim().isEmpty());
    }

    @And("the alt text provides meaningful description of the avatar")
    public void verifyAltTextIsMeaningful() {
        String altText = profilePage.getMainAvatarAltText();
        assertTrue("Alt text should contain username or descriptive text", 
            altText.contains("@") || altText.toLowerCase().contains("avatar") || altText.toLowerCase().contains("view"));
    }

    @And("all follower avatar images include proper alt text for accessibility")
    public void verifyFollowerAvatarsHaveAltText() {
        profilePage.navigateToFollowersTab();
        int followerAvatarsWithAlt = profilePage.getFollowerAvatarsWithAltTextCount();
        int totalFollowerAvatars = profilePage.getTotalFollowerAvatarsCount();
        
        assertTrue("All follower avatars should have alt text", followerAvatarsWithAlt == totalFollowerAvatars);
        assertTrue("Should have at least one follower avatar to validate", totalFollowerAvatars > 0);
    }
}