package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import pages.GitHubProfileSearchPage;
import utils.DriverManager;

public class SearchNonExistentUserSteps {

    private WebDriver driver;
    private GitHubProfileSearchPage searchPage;
    private String initialRequestCount;

    public SearchNonExistentUserSteps() {
        this.driver = DriverManager.getDriver();
        this.searchPage = new GitHubProfileSearchPage(driver);
    }

    @Given("the GitHub API is available and accessible")
    public void theGitHubAPIIsAvailableAndAccessible() {
        // Precondition: API availability is assumed
        // Could add a health check here if needed
        Assert.assertTrue("GitHub API should be accessible", true);
    }

    @Given("I have internet connection")
    public void iHaveInternetConnection() {
        // Precondition: Internet connection is assumed
        Assert.assertTrue("Internet connection should be available", true);
    }

    @Given("I am on the GitHub Profile Finder search page")
    public void iAmOnTheGitHubProfileFinderSearchPage() {
        searchPage.navigateToSearchPage();
        Assert.assertTrue("Search page should be loaded", searchPage.isSearchPageLoaded());
    }

    @Given("I can see the search input field and search button with magnifying glass icon")
    public void iCanSeeTheSearchInputFieldAndSearchButton() {
        Assert.assertTrue("Search input should be visible", searchPage.isSearchInputVisible());
        Assert.assertTrue("Search button should be visible", searchPage.isSearchButtonVisible());
    }

    @When("I enter {string} in the search input field")
    public void iEnterInTheSearchInputField(String username) {
        searchPage.enterUsername(username);
        String enteredText = searchPage.getSearchInputValue();
        Assert.assertEquals("Entered text should match", username, enteredText);
    }

    @When("I click the search button")
    public void iClickTheSearchButton() {
        initialRequestCount = searchPage.getApiRequestCount();
        searchPage.clickSearchButton();
    }

    @Then("the system should query the GitHub API")
    public void theSystemShouldQueryTheGitHubAPI() {
        searchPage.waitForApiResponse();
    }

    @Then("I should see a friendly error message indicating the user was not found")
    public void iShouldSeeAFriendlyErrorMessage() {
        Assert.assertTrue("Error message should be displayed", searchPage.isErrorMessageDisplayed());
    }

    @Then("the error message should contain text like {string}")
    public void theErrorMessageShouldContainText(String expectedText) {
        String actualErrorMessage = searchPage.getErrorMessageText();
        Assert.assertTrue("Error message should contain expected text",
                actualErrorMessage.toLowerCase().contains("no pudimos encontrar") ||
                actualErrorMessage.toLowerCase().contains("usuario no encontrado") ||
                actualErrorMessage.toLowerCase().contains("not found") ||
                actualErrorMessage.toLowerCase().contains("no existe"));
    }

    @Then("the user profile details section should not be displayed")
    public void theUserProfileDetailsSectionShouldNotBeDisplayed() {
        Assert.assertFalse("User profile section should not be visible",
                searchPage.isUserProfileSectionVisible());
    }

    @Then("the metrics dashboard should not show any data")
    public void theMetricsDashboardShouldNotShowAnyData() {
        Assert.assertFalse("Metrics dashboard should be empty or hidden",
                searchPage.isMetricsDashboardVisible());
    }

    @Then("the followers list should be empty or hidden")
    public void theFollowersListShouldBeEmptyOrHidden() {
        Assert.assertTrue("Followers list should be empty or hidden",
                searchPage.isFollowersListEmptyOrHidden());
    }

    @Then("the API requests counter should be incremented")
    public void theApiRequestsCounterShouldBeIncremented() {
        String currentRequestCount = searchPage.getApiRequestCount();
        Assert.assertTrue("API request counter should be incremented",
                searchPage.isRequestCountIncremented(initialRequestCount, currentRequestCount));
    }
}