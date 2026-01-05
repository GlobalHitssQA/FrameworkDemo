package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileFollowersSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME = "octocat";

    public GitHubProfileFollowersSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user navigates to the GitHub profile search component")
    public void navigateToGitHubProfileSearch() {
        profileSearchPage.navigateToSearchPage();
        assertTrue(profileSearchPage.isSearchInterfaceDisplayed(), "Search interface should be displayed");
    }

    @When("the user enters a valid GitHub username with followers in the search input field")
    public void enterValidGitHubUsername() {
        profileSearchPage.enterUsername(TEST_USERNAME);
        assertEquals(TEST_USERNAME, profileSearchPage.getSearchInputValue(), "Username should be displayed in input field");
    }

    @And("the user clicks the search button to retrieve the profile")
    public void clickSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the followers list section should be displayed on the right side")
    public void verifyFollowersListDisplayed() {
        assertTrue(profileSearchPage.isFollowersListVisible(), "Followers list should be visible");
        assertTrue(profileSearchPage.getFollowersCount() > 0, "At least one follower entry should be present");
    }

    @And("each follower entry should display an avatar image")
    public void verifyEachFollowerHasAvatar() {
        int followersCount = profileSearchPage.getFollowersCount();
        for (int i = 0; i < followersCount; i++) {
            assertTrue(profileSearchPage.isFollowerAvatarVisible(i), "Follower avatar " + i + " should be visible");
            assertFalse(profileSearchPage.isFollowerAvatarBroken(i), "Follower avatar " + i + " should not be broken");
        }
    }

    @And("avatar images should be displayed with proper dimensions and aspect ratio without distortion")
    public void verifyAvatarQualityAndProportions() {
        int followersCount = profileSearchPage.getFollowersCount();
        for (int i = 0; i < followersCount; i++) {
            int[] dimensions = profileSearchPage.getFollowerAvatarDimensions(i);
            int width = dimensions[0];
            int height = dimensions[1];
            
            assertTrue(width > 0 && height > 0, "Avatar " + i + " should have valid dimensions");
            
            double aspectRatio = (double) width / height;
            assertTrue(aspectRatio >= 0.9 && aspectRatio <= 1.1, 
                "Avatar " + i + " should have proper aspect ratio (close to 1:1), got: " + aspectRatio);
        }
    }
}