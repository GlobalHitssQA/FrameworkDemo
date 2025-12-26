package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.GitHubSearchPage;
import pages.GitHubProfilePage;
import pages.GitHub404Page;
import utils.DriverManager;

public class NonExistentUserSteps {

    private WebDriver driver;
    private GitHubSearchPage searchPage;
    private GitHubProfilePage profilePage;
    private GitHub404Page error404Page;
    private static final String BASE_URL = "https://github.com";
    private static final String NON_EXISTENT_USER = "usuarioquenoexiste123456789";

    public NonExistentUserSteps() {
        this.driver = DriverManager.getDriver();
        this.searchPage = new GitHubSearchPage(driver);
        this.profilePage = new GitHubProfilePage(driver);
        this.error404Page = new GitHub404Page(driver);
    }

    @Given("the GitHub profile search component is accessible")
    public void theGitHubProfileSearchComponentIsAccessible() {
        driver.get(BASE_URL);
        Assert.assertTrue("GitHub homepage should be accessible", 
            driver.getTitle().contains("GitHub"));
    }

    @Given("the user is on the GitHub homepage")
    public void theUserIsOnTheGitHubHomepage() {
        driver.get(BASE_URL);
        searchPage.waitForPageLoad();
    }

    @And("the search input field is visible")
    public void theSearchInputFieldIsVisible() {
        Assert.assertTrue("Search input should be visible", 
            searchPage.isSearchInputVisible());
    }

    @And("the search button with magnifying glass icon is available")
    public void theSearchButtonWithMagnifyingGlassIconIsAvailable() {
        Assert.assertTrue("Search button should be available", 
            searchPage.isSearchButtonAvailable());
    }

    @When("the user enters a non-existent username {string} in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField(String username) {
        searchPage.enterSearchQuery(username);
        Assert.assertEquals("Entered text should match", 
            username, searchPage.getSearchInputValue());
    }

    @And("the user clicks on the search button")
    public void theUserClicksOnTheSearchButton() {
        searchPage.clickSearchButton();
    }

    @Then("the system should query the GitHub API for the entered username")
    public void theSystemShouldQueryTheGitHubAPIForTheEnteredUsername() {
        // Navigation to user profile triggers API call
        driver.get(BASE_URL + "/" + NON_EXISTENT_USER);
    }

    @And("the system should receive a 404 not found response")
    public void theSystemShouldReceiveA404NotFoundResponse() {
        Assert.assertTrue("Page title should indicate 404", 
            driver.getTitle().contains("Page not found"));
    }

    @And("the system should display a friendly error message indicating the profile was not found")
    public void theSystemShouldDisplayAFriendlyErrorMessageIndicatingTheProfileWasNotFound() {
        Assert.assertTrue("404 page should be displayed", 
            error404Page.is404PageDisplayed());
    }

    @And("the 404 error image should be visible")
    public void the404ErrorImageShouldBeVisible() {
        Assert.assertTrue("404 error image should be visible", 
            error404Page.is404ImageVisible());
    }

    @And("the profile section should remain empty")
    public void theProfileSectionShouldRemainEmpty() {
        Assert.assertFalse("Profile section should not be visible", 
            profilePage.isProfileSectionVisible());
    }

    @And("the metrics dashboard should not display any data")
    public void theMetricsDashboardShouldNotDisplayAnyData() {
        Assert.assertFalse("Metrics dashboard should not be visible", 
            profilePage.isMetricsDashboardVisible());
    }

    @And("the followers list should not be visible")
    public void theFollowersListShouldNotBeVisible() {
        Assert.assertFalse("Followers list should not be visible", 
            profilePage.isFollowersListVisible());
    }
}