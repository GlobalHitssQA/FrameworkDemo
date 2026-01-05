package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.assertTrue;

public class GitHubProfileMetricsSteps {
    private Playwright playwright;
    private Browser browser;
    private BrowserContext context;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    @Given("I am on the GitHub profile search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        context = browser.newContext();
        page = context.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateToSearchPage();
    }

    @When("I enter a valid GitHub username {string} in the search input field")
    public void iEnterAValidGitHubUsernameInTheSearchInputField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("I click the search button")
    public void iClickTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the user profile should be displayed")
    public void theUserProfileShouldBeDisplayed() {
        assertTrue("User profile should be visible", profileSearchPage.isProfileDisplayed());
    }

    @And("the Repos metric should be visible")
    public void theReposMetricShouldBeVisible() {
        assertTrue("Repos metric should be visible", profileSearchPage.isReposMetricVisible());
    }

    @And("the Followers metric should be visible")
    public void theFollowersMetricShouldBeVisible() {
        assertTrue("Followers metric should be visible", profileSearchPage.isFollowersMetricVisible());
    }

    @And("the Following metric should be visible")
    public void theFollowingMetricShouldBeVisible() {
        assertTrue("Following metric should be visible", profileSearchPage.isFollowingMetricVisible());
    }

    @And("the Gists metric should be visible")
    public void theGistsMetricShouldBeVisible() {
        assertTrue("Gists metric should be visible", profileSearchPage.isGistsMetricVisible());
    }
}