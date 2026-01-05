package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Playwright;
import pages.GitHubProfilePage;
import org.junit.Assert;

public class GistsCountSteps {
    private Playwright playwright;
    private Browser browser;
    private Page page;
    private GitHubProfilePage profilePage;
    private String testUsername = "octocat";
    private int expectedGistsCount;

    @Given("I navigate to the GitHub Profile Finder application")
    public void navigateToApplication() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        page = browser.newPage();
        page.navigate("https://github.com");
        profilePage = new GitHubProfilePage(page);
    }

    @When("I search for a valid GitHub user with known public gists")
    public void searchForUserWithGists() {
        profilePage.searchUser(testUsername);
        expectedGistsCount = profilePage.fetchGistsCountFromAPI(testUsername);
    }

    @Then("the user profile information should be displayed successfully")
    public void verifyProfileDisplayed() {
        Assert.assertTrue("Profile should be visible", profilePage.isProfileVisible());
        Assert.assertTrue("Username should be displayed", profilePage.isUsernameDisplayed());
    }

    @And("the Gists metric should be visible in the metrics dashboard")
    public void verifyGistsMetricVisible() {
        Assert.assertTrue("Gists counter should be visible", profilePage.isGistsCounterVisible());
    }

    @And("the Gists count should match the actual GitHub API data")
    public void verifyGistsCountAccuracy() {
        int displayedGistsCount = profilePage.getGistsCount();
        Assert.assertEquals("Gists count should match API data", expectedGistsCount, displayedGistsCount);
    }

    @And("the Gists metric should be clearly labeled and properly formatted")
    public void verifyGistsLabelAndFormat() {
        Assert.assertTrue("Gists label should be visible", profilePage.isGistsLabelVisible());
        String gistsLabel = profilePage.getGistsLabel();
        Assert.assertTrue("Gists label should contain 'Gists'", gistsLabel.toLowerCase().contains("gists"));
        Assert.assertTrue("Gists count should be numeric", profilePage.isGistsCountNumeric());
    }
}