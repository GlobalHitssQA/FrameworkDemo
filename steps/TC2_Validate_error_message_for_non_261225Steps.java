package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.junit.Assert;
import pages.GitHubProfileSearchPage;

import java.time.Duration;

public class SearchNonExistentUserSteps {

    private WebDriver driver;
    private GitHubProfileSearchPage searchPage;
    private WebDriverWait wait;
    private static final String NON_EXISTENT_USERNAME = "usuarioquenoexiste123456789";

    @Given("the GitHub profile search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        searchPage = new GitHubProfileSearchPage(driver);
    }

    @Given("the user is on the GitHub profile search page")
    public void theUserIsOnTheGitHubProfileSearchPage() {
        searchPage.navigateToSearchPage();
    }

    @And("the search input and search button are visible")
    public void theSearchInputAndSearchButtonAreVisible() {
        Assert.assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
        Assert.assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }

    @When("the user enters a non-existent username {string} in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField(String username) {
        searchPage.enterUsername(username);
        Assert.assertEquals("Entered text should be visible in search field", 
            username, searchPage.getSearchInputValue());
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        searchPage.clickSearchButton();
    }

    @Then("the system should query the GitHub API for the entered username")
    public void theSystemShouldQueryTheGitHubAPIForTheEnteredUsername() {
        searchPage.waitForApiResponse();
    }

    @And("the system should display a friendly error message indicating the user was not found")
    public void theSystemShouldDisplayAFriendlyErrorMessageIndicatingTheUserWasNotFound() {
        Assert.assertTrue("Error message should be displayed", 
            searchPage.isErrorMessageDisplayed());
        String errorMessage = searchPage.getErrorMessageText();
        Assert.assertTrue("Error message should indicate user not found",
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no existe") ||
            errorMessage.toLowerCase().contains("no user"));
    }

    @And("the profile section should remain empty")
    public void theProfileSectionShouldRemainEmpty() {
        Assert.assertFalse("User avatar should not be displayed", 
            searchPage.isUserAvatarDisplayed());
        Assert.assertFalse("User name should not be displayed", 
            searchPage.isUserNameDisplayed());
        Assert.assertFalse("User bio should not be displayed", 
            searchPage.isUserBioDisplayed());
    }

    @And("the metrics dashboard should not display any data")
    public void theMetricsDashboardShouldNotDisplayAnyData() {
        Assert.assertFalse("Repos counter should not show data", 
            searchPage.isReposCounterDisplayed());
        Assert.assertFalse("Followers counter should not show data", 
            searchPage.isFollowersCounterDisplayed());
        Assert.assertFalse("Following counter should not show data", 
            searchPage.isFollowingCounterDisplayed());
        Assert.assertFalse("Gists counter should not show data", 
            searchPage.isGistsCounterDisplayed());
    }

    @And("the followers list should remain empty")
    public void theFollowersListShouldRemainEmpty() {
        Assert.assertTrue("Followers list should be empty or not displayed", 
            searchPage.isFollowersListEmpty());
        
        // Cleanup
        if (driver != null) {
            driver.quit();
        }
    }
}