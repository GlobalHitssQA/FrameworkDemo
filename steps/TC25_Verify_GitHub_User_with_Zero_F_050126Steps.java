package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubSearchPage;
import static org.junit.Assert.*;

public class GitHubZeroFollowingSteps {
    private Page page;
    private GitHubSearchPage searchPage;
    private static final String TEST_USERNAME = "torvalds"; // Example user with potentially 0 following

    public GitHubZeroFollowingSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
    }

    @Given("the GitHub profile search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        searchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
    }

    @When("I enter a GitHub username that follows {int} other users")
    public void iEnterAGitHubUsernameThatFollowsOtherUsers(int followingCount) {
        searchPage.enterUsername(TEST_USERNAME);
    }

    @When("I enter a GitHub username that follows 0 other users")
    public void iEnterAGitHubUsernameThatFollowsZeroOtherUsers() {
        searchPage.enterUsername(TEST_USERNAME);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        searchPage.clickSearchButton();
        searchPage.waitForProfileToLoad();
    }

    @Then("the Following metric should display {int}")
    public void theFollowingMetricShouldDisplay(int expectedCount) {
        String followingCount = searchPage.getFollowingCount();
        assertEquals("Following count should be 0", String.valueOf(expectedCount), followingCount);
    }

    @And("all other user profile information should display correctly")
    public void allOtherUserProfileInformationShouldDisplayCorrectly() {
        assertTrue("Avatar should be visible", searchPage.isAvatarVisible());
        assertTrue("Username should be visible", searchPage.isUsernameVisible());
        assertTrue("Repositories count should be visible", searchPage.isRepositoriesCountVisible());
        assertTrue("Followers count should be visible", searchPage.isFollowersCountVisible());
        assertTrue("Gists count should be visible", searchPage.isGistsCountVisible());
        
        assertNotNull("Username should not be null", searchPage.getUsername());
        assertNotNull("Repositories count should not be null", searchPage.getRepositoriesCount());
        assertNotNull("Followers count should not be null", searchPage.getFollowersCount());
        assertNotNull("Gists count should not be null", searchPage.getGistsCount());
    }
}