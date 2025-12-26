package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.GitHubSearchPage;

public class GitHubUserSearchErrorSteps {
    
    private WebDriver driver;
    private GitHubSearchPage searchPage;
    private String searchedUsername;
    
    public GitHubUserSearchErrorSteps(WebDriver driver) {
        this.driver = driver;
        this.searchPage = new GitHubSearchPage(driver);
    }
    
    @Given("the GitHub API is available and accessible")
    public void theGitHubAPIIsAvailableAndAccessible() {
        // Precondition: API availability is assumed
        // Could add health check if needed
    }
    
    @And("the system has error handling configured for API responses")
    public void theSystemHasErrorHandlingConfiguredForAPIResponses() {
        // Precondition: Error handling configuration is assumed
    }
    
    @Given("I am on the GitHub profile search component")
    public void iAmOnTheGitHubProfileSearchComponent() {
        searchPage.navigateToSearchPage();
    }
    
    @And("I can see the search input and search button with magnifying glass icon")
    public void iCanSeeTheSearchInputAndSearchButtonWithMagnifyingGlassIcon() {
        Assert.assertTrue("Search input should be visible", searchPage.isSearchInputDisplayed());
        Assert.assertTrue("Search button should be visible", searchPage.isSearchButtonDisplayed());
    }
    
    @When("I enter a non-existent username {string}")
    public void iEnterANonExistentUsername(String username) {
        this.searchedUsername = username;
        searchPage.enterSearchTerm(username);
    }
    
    @Then("the entered text is displayed in the search input")
    public void theEnteredTextIsDisplayedInTheSearchInput() {
        String actualValue = searchPage.getSearchInputValue();
        Assert.assertEquals("Search input should contain entered text", searchedUsername, actualValue);
    }
    
    @When("I click the search button with magnifying glass icon")
    public void iClickTheSearchButtonWithMagnifyingGlassIcon() {
        searchPage.clickSearchButton();
    }
    
    @Then("the system attempts to query the GitHub API")
    public void theSystemAttemptsToQueryTheGitHubAPI() {
        searchPage.waitForSearchResults();
    }
    
    @And("the system displays an empty state or friendly error message indicating user not found")
    public void theSystemDisplaysAnEmptyStateOrFriendlyErrorMessage() {
        Assert.assertTrue("Error message or empty state should be displayed", 
            searchPage.isNoResultsMessageDisplayed());
        String errorMessage = searchPage.getNoResultsMessage();
        Assert.assertTrue("Message should indicate no users found", 
            errorMessage.toLowerCase().contains("did not match") || 
            errorMessage.toLowerCase().contains("no") || 
            errorMessage.toLowerCase().contains("not found"));
    }
    
    @And("no profile metrics are displayed")
    public void noProfileMetricsAreDisplayed() {
        Assert.assertFalse("Repos counter should not be displayed", searchPage.isReposCounterDisplayed());
        Assert.assertFalse("Followers counter should not be displayed", searchPage.isFollowersCounterDisplayed());
        Assert.assertFalse("Following counter should not be displayed", searchPage.isFollowingCounterDisplayed());
        Assert.assertFalse("Gists counter should not be displayed", searchPage.isGistsCounterDisplayed());
    }
    
    @And("no profile information is shown")
    public void noProfileInformationIsShown() {
        Assert.assertFalse("User avatar should not be displayed", searchPage.isUserAvatarDisplayed());
        Assert.assertFalse("User name should not be displayed", searchPage.isUserNameDisplayed());
        Assert.assertFalse("User bio should not be displayed", searchPage.isUserBioDisplayed());
    }
    
    @And("the dashboard remains empty without incorrect or default values")
    public void theDashboardRemainsEmptyWithoutIncorrectOrDefaultValues() {
        Assert.assertTrue("Dashboard should show empty/error state", searchPage.isDashboardEmpty());
    }
}