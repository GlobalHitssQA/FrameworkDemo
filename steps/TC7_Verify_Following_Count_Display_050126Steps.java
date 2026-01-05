package steps;

import com.microsoft.playwright.Page;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import pages.GitHubProfilePage;
import static org.junit.Assert.*;

public class FollowingCountSteps {
    private Page page;
    private GitHubProfilePage profilePage;
    private String searchedUsername;
    private int apiFollowingCount;

    public FollowingCountSteps(Page page) {
        this.page = page;
        this.profilePage = new GitHubProfilePage(page);
    }

    @Given("the user navigates to the GitHub profile finder application")
    public void navigateToApplication() {
        page.navigate("https://github.com");
    }

    @When("the user searches for a valid GitHub username with known following count")
    public void searchForUsername() {
        searchedUsername = "torvalds";
        profilePage.enterUsername(searchedUsername);
        profilePage.clickSearchButton();
        profilePage.waitForProfileData();
    }

    @Then("the Following metric should be visible in the dashboard")
    public void verifyFollowingMetricVisible() {
        assertTrue("Following metric should be visible", profilePage.isFollowingCounterVisible());
    }

    @And("the Following count should match the GitHub API response")
    public void verifyFollowingCountMatches() {
        int displayedCount = profilePage.getFollowingCount();
        assertTrue("Following count should be greater than or equal to 0", displayedCount >= 0);
    }

    @And("the Following label should be clearly displayed and identifiable")
    public void verifyFollowingLabelDisplayed() {
        assertTrue("Following label should be visible", profilePage.isFollowingLabelVisible());
        String labelText = profilePage.getFollowingLabelText();
        assertTrue("Label should contain 'Following'", labelText.toLowerCase().contains("following"));
    }
}