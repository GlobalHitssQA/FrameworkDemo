package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.GitHubProfileSearchPage;

public class GitHubProfileSearchSteps {

    private WebDriver driver;
    private GitHubProfileSearchPage profileSearchPage;
    private static final String TEST_USERNAME = "octocat";

    public GitHubProfileSearchSteps(WebDriver driver) {
        this.driver = driver;
        this.profileSearchPage = new GitHubProfileSearchPage(driver);
    }

    @Given("the GitHub API is available")
    public void theGitHubAPIIsAvailable() {
        // API availability is assumed as precondition
        // Could add health check if needed
    }

    @Given("I have access to the profile search component")
    public void iHaveAccessToTheProfileSearchComponent() {
        // Access verification handled by page load
    }

    @Given("I am on the GitHub Profile Search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        profileSearchPage.navigateToSearchPage();
    }

    @When("I verify the search component is displayed")
    public void iVerifyTheSearchComponentIsDisplayed() {
        Assert.assertTrue("Search component should be visible", 
            profileSearchPage.isSearchComponentDisplayed());
    }

    @Then("I should see a text input field for username search")
    public void iShouldSeeATextInputFieldForUsernameSearch() {
        Assert.assertTrue("Search input field should be visible", 
            profileSearchPage.isSearchInputVisible());
    }

    @And("I should see a search button with a magnifying glass icon")
    public void iShouldSeeASearchButtonWithAMagnifyingGlassIcon() {
        Assert.assertTrue("Search button should be visible", 
            profileSearchPage.isSearchButtonVisible());
    }

    @When("I enter a valid GitHub username {string} in the search field")
    public void iEnterAValidGitHubUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @Then("the entered text {string} should be displayed in the input field")
    public void theEnteredTextShouldBeDisplayedInTheInputField(String expectedText) {
        String actualText = profileSearchPage.getSearchInputValue();
        Assert.assertEquals("Input field should contain entered text", 
            expectedText, actualText);
    }

    @When("I click the search button")
    public void iClickTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should query the GitHub API")
    public void theSystemShouldQueryTheGitHubAPI() {
        profileSearchPage.waitForAPIResponse();
    }

    @And("the API response should be successful")
    public void theAPIResponseShouldBeSuccessful() {
        Assert.assertFalse("Error message should not be displayed", 
            profileSearchPage.isErrorMessageDisplayed());
    }

    @When("the profile data is loaded")
    public void theProfileDataIsLoaded() {
        Assert.assertTrue("Profile section should be visible", 
            profileSearchPage.isProfileSectionVisible());
    }

    @Then("I should see the metrics dashboard with the following counters:")
    public void iShouldSeeTheMetricsDashboardWithTheFollowingCounters(io.cucumber.datatable.DataTable dataTable) {
        Assert.assertTrue("Repos counter should be visible", 
            profileSearchPage.isReposCounterVisible());
        Assert.assertTrue("Followers counter should be visible", 
            profileSearchPage.isFollowersCounterVisible());
        Assert.assertTrue("Following counter should be visible", 
            profileSearchPage.isFollowingCounterVisible());
        Assert.assertTrue("Gists counter should be visible", 
            profileSearchPage.isGistsCounterVisible());
    }

    @And("I should see the user information section on the left with:")
    public void iShouldSeeTheUserInformationSectionOnTheLeftWith(io.cucumber.datatable.DataTable dataTable) {
        Assert.assertTrue("Avatar should be visible", 
            profileSearchPage.isAvatarVisible());
        Assert.assertTrue("Full name should be visible", 
            profileSearchPage.isFullNameVisible());
        Assert.assertTrue("Username should be visible", 
            profileSearchPage.isUsernameVisible());
        Assert.assertTrue("Follow button should be visible", 
            profileSearchPage.isFollowButtonVisible());
        // Bio, location, company, and website may be optional depending on user profile
    }

    @And("I should see the followers list section on the right")
    public void iShouldSeeTheFollowersListSectionOnTheRight() {
        Assert.assertTrue("Followers list should be visible", 
            profileSearchPage.isFollowersListVisible());
    }

    @And("each follower should display:")
    public void eachFollowerShouldDisplay(io.cucumber.datatable.DataTable dataTable) {
        Assert.assertTrue("At least one follower should be displayed", 
            profileSearchPage.getFollowersCount() > 0);
        Assert.assertTrue("Follower avatars should be visible", 
            profileSearchPage.areFollowerAvatarsVisible());
        Assert.assertTrue("Follower usernames should be visible", 
            profileSearchPage.areFollowerUsernamesVisible());
        Assert.assertTrue("Follower profile links should be visible", 
            profileSearchPage.areFollowerProfileLinksVisible());
    }
}