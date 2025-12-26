package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class GitHubUserSearchErrorSteps {
    
    private WebDriver driver;
    private GitHubProfileSearchPage searchPage;
    
    public GitHubUserSearchErrorSteps(WebDriver driver) {
        this.driver = driver;
        this.searchPage = new GitHubProfileSearchPage(driver);
    }
    
    @Given("the GitHub API is available")
    public void theGitHubAPIIsAvailable() {
        // API availability is assumed as precondition
        // Could add health check if endpoint is available
    }
    
    @Given("the user has access to the search component")
    public void theUserHasAccessToTheSearchComponent() {
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
        assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }
    
    @Given("I am on the GitHub Profile Search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        searchPage.navigateToSearchPage();
        assertTrue("Search page should be loaded", searchPage.isPageLoaded());
    }
    
    @When("I enter an invalid username {string} in the search field")
    public void iEnterAnInvalidUsernameInTheSearchField(String username) {
        searchPage.enterUsername(username);
        assertEquals("Username should be entered correctly", username, searchPage.getSearchInputValue());
    }
    
    @When("I click the search button")
    public void iClickTheSearchButton() {
        searchPage.clickSearchButton();
    }
    
    @Then("the system should query the GitHub API")
    public void theSystemShouldQueryTheGitHubAPI() {
        searchPage.waitForApiResponse();
    }
    
    @Then("I should see an error message indicating the user was not found")
    public void iShouldSeeAnErrorMessageIndicatingTheUserWasNotFound() {
        assertTrue("Error message should be displayed", searchPage.isErrorMessageDisplayed());
        String errorMessage = searchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no existe") ||
            errorMessage.toLowerCase().contains("no user"));
    }
    
    @Then("no profile information should be displayed")
    public void noProfileInformationShouldBeDisplayed() {
        assertFalse("User avatar should not be displayed", searchPage.isUserAvatarDisplayed());
        assertFalse("User name should not be displayed", searchPage.isUserNameDisplayed());
        assertFalse("User bio should not be displayed", searchPage.isUserBioDisplayed());
        assertFalse("User location should not be displayed", searchPage.isUserLocationDisplayed());
        assertFalse("User company should not be displayed", searchPage.isUserCompanyDisplayed());
        assertFalse("User website should not be displayed", searchPage.isUserWebsiteDisplayed());
    }
    
    @Then("no metrics should be displayed for Repos")
    public void noMetricsShouldBeDisplayedForRepos() {
        assertFalse("Repos counter should not be displayed", searchPage.isReposCounterDisplayed());
    }
    
    @Then("no metrics should be displayed for Followers")
    public void noMetricsShouldBeDisplayedForFollowers() {
        assertFalse("Followers counter should not be displayed", searchPage.isFollowersCounterDisplayed());
    }
    
    @Then("no metrics should be displayed for Following")
    public void noMetricsShouldBeDisplayedForFollowing() {
        assertFalse("Following counter should not be displayed", searchPage.isFollowingCounterDisplayed());
    }
    
    @Then("no metrics should be displayed for Gists")
    public void noMetricsShouldBeDisplayedForGists() {
        assertFalse("Gists counter should not be displayed", searchPage.isGistsCounterDisplayed());
    }
}