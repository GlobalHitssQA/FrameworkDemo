package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class VerifyRepositoryCountSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String expectedRepoCount;
    private String searchedUsername;

    @Given("the user navigates to the GitHub profile search application")
    public void theUserNavigatesToTheGitHubProfileSearchApplication() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateToSearchPage();
    }

    @And("the user enters a valid GitHub username {string} in the search field")
    public void theUserEntersAValidGitHubUsernameInTheSearchField(String username) {
        this.searchedUsername = username;
        profileSearchPage.enterUsername(username);
    }

    @When("the user clicks the search button to retrieve the profile")
    public void theUserClicksTheSearchButtonToRetrieveTheProfile() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the dashboard metrics section should be visible")
    public void theDashboardMetricsSectionShouldBeVisible() {
        assertTrue("Dashboard metrics section should be visible", 
            profileSearchPage.isDashboardMetricsVisible());
    }

    @And("the Repos count should be displayed in the metrics dashboard")
    public void theReposCountShouldBeDisplayedInTheMetricsDashboard() {
        assertTrue("Repos metric should be visible", 
            profileSearchPage.isReposMetricVisible());
    }

    @And("the displayed repository count should match the GitHub API response")
    public void theDisplayedRepositoryCountShouldMatchTheGitHubAPIResponse() {
        String displayedCount = profileSearchPage.getReposCount();
        assertNotNull("Repository count should not be null", displayedCount);
        assertFalse("Repository count should not be empty", displayedCount.isEmpty());
        this.expectedRepoCount = displayedCount;
    }

    @And("the repository count should match the count on the actual GitHub profile page")
    public void theRepositoryCountShouldMatchTheCountOnTheActualGitHubProfilePage() {
        String actualGitHubRepoCount = profileSearchPage.getActualGitHubProfileRepoCount(searchedUsername);
        assertEquals("Repository count should match GitHub profile", 
            expectedRepoCount, actualGitHubRepoCount);
        
        // Cleanup
        if (browser != null) {
            browser.close();
        }
        if (playwright != null) {
            playwright.close();
        }
    }
}