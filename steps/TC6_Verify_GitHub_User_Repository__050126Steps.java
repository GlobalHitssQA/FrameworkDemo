package steps;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.LoadState;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubSearchPage;
import pages.GitHubProfilePage;
import static org.junit.jupiter.api.Assertions.*;

public class RepositoryCountSteps {
    private Page page;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private String repositoryCount;

    public RepositoryCountSteps(Page page) {
        this.page = page;
        this.searchPage = new GitHubSearchPage(page);
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("I navigate to the GitHub search page")
    public void navigateToGitHubSearchPage() {
        searchPage.navigateToSearchPage();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    @When("I search for a valid GitHub user {string}")
    public void searchForValidGitHubUser(String username) {
        searchPage.searchUser(username);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    @And("I navigate to the user profile page")
    public void navigateToUserProfilePage() {
        searchPage.clickFirstUserResult();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    @Then("the repository counter should be visible in the profile navigation")
    public void verifyRepositoryCounterIsVisible() {
        assertTrue(profilePage.isRepositoryCountVisible(), 
            "Repository counter should be visible in the profile navigation");
    }

    @And("the repository count should be accurate and match the actual public repositories")
    public void verifyRepositoryCountIsAccurate() {
        repositoryCount = profilePage.getRepositoryCount();
        assertNotNull(repositoryCount, "Repository count should not be null");
        assertFalse(repositoryCount.isEmpty(), "Repository count should not be empty");
        assertTrue(repositoryCount.matches("\\d+"), 
            "Repository count should be a numeric value: " + repositoryCount);
    }

    @And("the repository metric should be clearly labeled as {string}")
    public void verifyRepositoryMetricLabel(String expectedLabel) {
        String actualLabel = profilePage.getRepositoryLabel();
        assertTrue(actualLabel.contains(expectedLabel), 
            "Repository label should contain '" + expectedLabel + "' but found: " + actualLabel);
    }
}