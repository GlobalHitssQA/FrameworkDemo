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

public class GitHubProfileMetricsSteps {

    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String BASE_URL = "https://github.com";

    @Given("I am on the GitHub profile search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
        page = browser.newPage();
        profileSearchPage = new GitHubProfileSearchPage(page);
        profileSearchPage.navigateTo(BASE_URL);
        assertTrue("Search interface should be loaded", profileSearchPage.isSearchInterfaceReady());
    }

    @When("I search for the GitHub user {string}")
    public void iSearchForTheGitHubUser(String username) {
        profileSearchPage.searchForUser(username);
    }

    @Then("the user profile should be loaded successfully")
    public void theUserProfileShouldBeLoadedSuccessfully() {
        assertTrue("User profile should be displayed", profileSearchPage.isUserProfileDisplayed());
    }

    @And("the Repos counter should be displayed with a valid number")
    public void theReposCounterShouldBeDisplayedWithAValidNumber() {
        assertTrue("Repos counter should be visible", profileSearchPage.isReposCounterVisible());
        int reposCount = profileSearchPage.getReposCount();
        assertTrue("Repos count should be a non-negative number", reposCount >= 0);
    }

    @And("the Followers counter should be displayed with a valid number")
    public void theFollowersCounterShouldBeDisplayedWithAValidNumber() {
        assertTrue("Followers counter should be visible", profileSearchPage.isFollowersCounterVisible());
        int followersCount = profileSearchPage.getFollowersCount();
        assertTrue("Followers count should be a non-negative number", followersCount >= 0);
    }

    @And("the Following counter should be displayed with a valid number")
    public void theFollowingCounterShouldBeDisplayedWithAValidNumber() {
        assertTrue("Following counter should be visible", profileSearchPage.isFollowingCounterVisible());
        int followingCount = profileSearchPage.getFollowingCount();
        assertTrue("Following count should be a non-negative number", followingCount >= 0);
    }

    @And("the Gists counter should be displayed with a valid number")
    public void theGistsCounterShouldBeDisplayedWithAValidNumber() {
        assertTrue("Gists counter should be visible", profileSearchPage.isGistsCounterVisible());
        int gistsCount = profileSearchPage.getGistsCount();
        assertTrue("Gists count should be a non-negative number", gistsCount >= 0);
    }

    @And("all metrics should be visible in the dashboard section")
    public void allMetricsShouldBeVisibleInTheDashboardSection() {
        assertTrue("Metrics dashboard should be visible", profileSearchPage.isMetricsDashboardVisible());
        assertTrue("All four metrics should be displayed", profileSearchPage.areAllMetricsDisplayed());
        
        // Cleanup
        if (browser != null) {
            browser.close();
        }
        if (playwright != null) {
            playwright.close();
        }
    }
}