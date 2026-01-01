package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class FollowingMetricSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;
    private String testUsername = "torvalds";
    private int expectedFollowingCount;

    public FollowingMetricSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user accesses the GitHub Profile Search component")
    public void theUserAccessesTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search interface should be displayed and ready", 
            profileSearchPage.isSearchInterfaceDisplayed());
    }

    @When("the user enters a valid GitHub username with known following count")
    public void theUserEntersAValidGitHubUsername() {
        profileSearchPage.enterUsername(testUsername);
        assertTrue("Username should be entered in search field", 
            profileSearchPage.isUsernameEntered(testUsername));
    }

    @And("the user clicks the search button to retrieve profile data")
    public void theUserClicksTheSearchButton() {
        expectedFollowingCount = profileSearchPage.getExpectedFollowingCountFromAPI(testUsername);
        profileSearchPage.clickSearchButton();
        profileSearchPage.waitForProfileDataToLoad();
    }

    @Then("the dashboard section is displayed with user metrics")
    public void theDashboardSectionIsDisplayedWithUserMetrics() {
        assertTrue("Dashboard should be visible", 
            profileSearchPage.isDashboardVisible());
        assertTrue("Following metric should be displayed", 
            profileSearchPage.isFollowingMetricDisplayed());
    }

    @And("the Following count matches the actual GitHub API data")
    public void theFollowingCountMatchesTheActualGitHubAPIData() {
        int displayedFollowingCount = profileSearchPage.getFollowingCount();
        assertEquals("Following count should match GitHub API data", 
            expectedFollowingCount, displayedFollowingCount);
    }
}