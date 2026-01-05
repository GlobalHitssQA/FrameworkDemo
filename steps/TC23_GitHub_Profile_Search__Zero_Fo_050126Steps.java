package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubProfileSearchSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME_ZERO_FOLLOWERS = "test-user-no-followers";

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub profile search component is loaded")
    public void theGitHubProfileSearchComponentIsLoaded() {
        page.navigate("https://github.com");
        assertTrue("Search interface should be visible", profileSearchPage.isSearchInputVisible());
    }

    @When("I enter a valid GitHub username with zero followers")
    public void iEnterAValidGitHubUsernameWithZeroFollowers() {
        profileSearchPage.enterUsername(TEST_USERNAME_ZERO_FOLLOWERS);
        assertEquals("Username should be entered correctly", 
                     TEST_USERNAME_ZERO_FOLLOWERS, 
                     profileSearchPage.getSearchInputValue());
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profileSearchPage.clickSearchButton();
        page.waitForLoadState();
    }

    @Then("the Followers metric should display zero")
    public void theFollowersMetricShouldDisplayZero() {
        String followersCount = profileSearchPage.getFollowersCount();
        assertEquals("Followers count should be 0", "0", followersCount);
    }

    @And("the followers list section should show empty state")
    public void theFollowersListSectionShouldShowEmptyState() {
        boolean isEmptyOrHidden = profileSearchPage.isFollowersListEmpty() || 
                                  !profileSearchPage.isFollowersListVisible();
        assertTrue("Followers list should be empty or show empty state", isEmptyOrHidden);
    }

    @And("the user profile information should display correctly")
    public void theUserProfileInformationShouldDisplayCorrectly() {
        assertTrue("Avatar should be visible", profileSearchPage.isAvatarVisible());
        assertTrue("Username should be visible", profileSearchPage.isUsernameVisible());
        assertTrue("Repositories count should be visible", profileSearchPage.isRepositoriesCountVisible());
        assertTrue("Following count should be visible", profileSearchPage.isFollowingCountVisible());
        assertTrue("Gists count should be visible", profileSearchPage.isGistsCountVisible());
    }
}