package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.GitHubSearchPage;
import pages.GitHubProfilePage;
import pages.GitHubErrorPage;
import static org.junit.Assert.*;

public class GitHubUserNotFoundSteps {
    
    private WebDriver driver;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private GitHubErrorPage errorPage;
    
    public GitHubUserNotFoundSteps(WebDriver driver) {
        this.driver = driver;
        this.searchPage = new GitHubSearchPage(driver);
        this.profilePage = new GitHubProfilePage(driver);
        this.errorPage = new GitHubErrorPage(driver);
    }
    
    @Given("the GitHub profile search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        searchPage.navigateToSearchPage();
        assertTrue("Search page should be accessible", searchPage.isSearchPageLoaded());
    }
    
    @Given("I have an active connection to the GitHub API")
    public void iHaveAnActiveConnectionToTheGitHubAPI() {
        assertTrue("GitHub should be reachable", searchPage.isGitHubReachable());
    }
    
    @Given("I am on the GitHub profile search page")
    public void iAmOnTheGitHubProfileSearchPage() {
        searchPage.navigateToSearchPage();
        assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
    }
    
    @When("I enter {string} in the search input field")
    public void iEnterUsernameInTheSearchInputField(String username) {
        searchPage.enterSearchText(username);
        assertEquals("Entered text should match", username, searchPage.getSearchInputValue());
    }
    
    @When("I click the search button with magnifying glass icon")
    public void iClickTheSearchButtonWithMagnifyingGlassIcon() {
        searchPage.clickSearchButton();
    }
    
    @Then("the system should query the GitHub API for the entered username")
    public void theSystemShouldQueryTheGitHubAPIForTheEnteredUsername() {
        assertTrue("Page should have loaded after search", errorPage.isPageLoaded());
    }
    
    @Then("I should see the 404 error page with {string} image")
    public void iShouldSeeThe404ErrorPageWithImage(String expectedAltText) {
        assertTrue("404 image should be displayed", errorPage.is404ImageDisplayed());
        assertTrue("404 image alt text should contain expected message", 
            errorPage.get404ImageAltText().contains(expectedAltText));
    }
    
    @Then("I should see a search box to find code, projects and people")
    public void iShouldSeeASearchBoxToFindCodeProjectsAndPeople() {
        assertTrue("Error page search box should be visible", errorPage.isSearchBoxVisible());
        assertTrue("Search label should mention code, projects and people", 
            errorPage.getSearchLabelText().contains("Find code, projects, and people"));
    }
    
    @Then("I should not see any user profile information")
    public void iShouldNotSeeAnyUserProfileInformation() {
        assertFalse("User avatar should not be displayed", profilePage.isAvatarDisplayed());
        assertFalse("User name should not be displayed", profilePage.isUserNameDisplayed());
        assertFalse("User bio should not be displayed", profilePage.isBioDisplayed());
    }
    
    @Then("I should not see any metrics dashboard")
    public void iShouldNotSeeAnyMetricsDashboard() {
        assertFalse("Followers count should not be displayed", profilePage.isFollowersCountDisplayed());
        assertFalse("Following count should not be displayed", profilePage.isFollowingCountDisplayed());
        assertFalse("Repositories should not be displayed", profilePage.isRepositoriesDisplayed());
    }
    
    @Then("I should not see any followers list")
    public void iShouldNotSeeAnyFollowersList() {
        assertFalse("Followers list should not be displayed", profilePage.isFollowersListDisplayed());
    }
}