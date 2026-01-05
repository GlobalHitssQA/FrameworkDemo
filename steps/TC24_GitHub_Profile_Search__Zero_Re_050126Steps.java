package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class GitHubProfileSearchSteps {
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USER_ZERO_REPOS = "github-zero-repos-test";

    public GitHubProfileSearchSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the GitHub profile search component is displayed")
    public void theGitHubProfileSearchComponentIsDisplayed() {
        profileSearchPage.navigateToSearchComponent();
        assertTrue(profileSearchPage.isSearchInputVisible(), "Search input should be visible");
    }

    @When("I enter a GitHub username with zero public repositories")
    public void iEnterAGitHubUsernameWithZeroPublicRepositories() {
        profileSearchPage.enterUsername(TEST_USER_ZERO_REPOS);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileToLoad();
    }

    @Then("the Repos metric should display zero")
    public void theReposMetricShouldDisplayZero() {
        String reposCount = profileSearchPage.getRepositoriesCount();
        assertEquals("0", reposCount, "Repositories count should be 0");
    }

    @And("all other profile data should load correctly")
    public void allOtherProfileDataShouldLoadCorrectly() {
        assertTrue(profileSearchPage.isAvatarVisible(), "Avatar should be visible");
        assertTrue(profileSearchPage.isUsernameVisible(), "Username should be visible");
        assertNotNull(profileSearchPage.getFollowersCount(), "Followers count should be displayed");
        assertNotNull(profileSearchPage.getFollowingCount(), "Following count should be displayed");
        assertNotNull(profileSearchPage.getGistsCount(), "Gists count should be displayed");
    }
}