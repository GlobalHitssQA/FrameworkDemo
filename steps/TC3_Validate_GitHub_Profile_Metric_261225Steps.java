package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.GitHubProfileFinderPage;
import org.junit.Assert;
import io.restassured.RestAssured;
import io.restassured.response.Response;

public class ValidateProfileMetricsSteps {
    
    private WebDriver driver;
    private GitHubProfileFinderPage profileFinderPage;
    private String testUsername = "torvalds";
    private int expectedRepos;
    private int expectedFollowers;
    private int expectedFollowing;
    private int expectedGists;
    
    public ValidateProfileMetricsSteps(WebDriver driver) {
        this.driver = driver;
        this.profileFinderPage = new GitHubProfileFinderPage(driver);
    }
    
    @Given("the GitHub API connection is active")
    public void theGitHubAPIConnectionIsActive() {
        Response response = RestAssured.get("https://api.github.com");
        Assert.assertEquals("GitHub API should be accessible", 200, response.getStatusCode());
    }
    
    @Given("the GitHub Profile Finder component is accessible")
    public void theGitHubProfileFinderComponentIsAccessible() {
        profileFinderPage.navigateToProfileFinder();
        Assert.assertTrue("Profile Finder page should be loaded", profileFinderPage.isPageLoaded());
    }
    
    @Given("I am on the GitHub Profile Finder page")
    public void iAmOnTheGitHubProfileFinderPage() {
        profileFinderPage.navigateToProfileFinder();
    }
    
    @And("the search input and search button are visible")
    public void theSearchInputAndSearchButtonAreVisible() {
        Assert.assertTrue("Search input should be visible", profileFinderPage.isSearchInputVisible());
        Assert.assertTrue("Search button should be visible", profileFinderPage.isSearchButtonVisible());
    }
    
    @When("I enter a valid GitHub username {string} in the search field")
    public void iEnterAValidGitHubUsernameInTheSearchField(String username) {
        this.testUsername = username;
        profileFinderPage.enterUsername(username);
        Assert.assertEquals("Username should be displayed in search field", 
            username, profileFinderPage.getSearchInputValue());
    }
    
    @And("I click the search button")
    public void iClickTheSearchButton() {
        profileFinderPage.clickSearchButton();
    }
    
    @Then("the system should retrieve the profile data from GitHub API")
    public void theSystemShouldRetrieveTheProfileDataFromGitHubAPI() {
        // Fetch expected values from GitHub API for comparison
        Response response = RestAssured.get("https://api.github.com/users/" + testUsername);
        Assert.assertEquals("API call should be successful", 200, response.getStatusCode());
        
        expectedRepos = response.jsonPath().getInt("public_repos");
        expectedFollowers = response.jsonPath().getInt("followers");
        expectedFollowing = response.jsonPath().getInt("following");
        expectedGists = response.jsonPath().getInt("public_gists");
        
        // Wait for profile to load in UI
        profileFinderPage.waitForProfileToLoad();
    }
    
    @And("the dashboard should display the Repos metric with the correct value")
    public void theDashboardShouldDisplayTheReposMetricWithTheCorrectValue() {
        Assert.assertTrue("Repos metric should be visible", profileFinderPage.isReposMetricVisible());
        int displayedRepos = profileFinderPage.getReposCount();
        Assert.assertEquals("Repos count should match API value", expectedRepos, displayedRepos);
    }
    
    @And("the dashboard should display the Followers metric with the correct value")
    public void theDashboardShouldDisplayTheFollowersMetricWithTheCorrectValue() {
        Assert.assertTrue("Followers metric should be visible", profileFinderPage.isFollowersMetricVisible());
        int displayedFollowers = profileFinderPage.getFollowersCount();
        Assert.assertEquals("Followers count should match API value", expectedFollowers, displayedFollowers);
    }
    
    @And("the dashboard should display the Following metric with the correct value")
    public void theDashboardShouldDisplayTheFollowingMetricWithTheCorrectValue() {
        Assert.assertTrue("Following metric should be visible", profileFinderPage.isFollowingMetricVisible());
        int displayedFollowing = profileFinderPage.getFollowingCount();
        Assert.assertEquals("Following count should match API value", expectedFollowing, displayedFollowing);
    }
    
    @And("the dashboard should display the Gists metric with the correct value")
    public void theDashboardShouldDisplayTheGistsMetricWithTheCorrectValue() {
        Assert.assertTrue("Gists metric should be visible", profileFinderPage.isGistsMetricVisible());
        int displayedGists = profileFinderPage.getGistsCount();
        Assert.assertEquals("Gists count should match API value", expectedGists, displayedGists);
    }
    
    @And("all four metrics should match the data from GitHub API")
    public void allFourMetricsShouldMatchTheDataFromGitHubAPI() {
        // Final verification - all metrics validated in previous steps
        // This step confirms the complete validation
        System.out.println("All metrics validated successfully:");
        System.out.println("Repos: " + expectedRepos);
        System.out.println("Followers: " + expectedFollowers);
        System.out.println("Following: " + expectedFollowing);
        System.out.println("Gists: " + expectedGists);
    }
}