package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.Assert.*;

public class SearchNonExistentUserSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub profile search component")
    public void theUserIsOnTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
        assertTrue("Search component should be visible", profileSearchPage.isSearchComponentVisible());
    }

    @When("the user enters a non-existent username {string} in the search field")
    public void theUserEntersANonExistentUsernameInTheSearchField(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @And("the system waits for the API response")
    public void theSystemWaitsForTheAPIResponse() {
        profileSearchPage.waitForApiResponse();
    }

    @Then("the system should display a friendly error message indicating user not found")
    public void theSystemShouldDisplayAFriendlyErrorMessageIndicatingUserNotFound() {
        assertTrue("Error message should be visible", profileSearchPage.isErrorMessageVisible());
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue("Error message should indicate user not found", 
            errorMessage.toLowerCase().contains("not found") || 
            errorMessage.toLowerCase().contains("no exist") ||
            errorMessage.toLowerCase().contains("no user"));
    }

    @And("the dashboard should not display any user data or metrics")
    public void theDashboardShouldNotDisplayAnyUserDataOrMetrics() {
        assertFalse("User avatar should not be visible", profileSearchPage.isUserAvatarVisible());
        assertFalse("User metrics should not be visible", profileSearchPage.areMetricsVisible());
        assertFalse("Followers list should not be visible", profileSearchPage.isFollowersListVisible());
    }

    @And("the search field should remain available for a new search")
    public void theSearchFieldShouldRemainAvailableForANewSearch() {
        assertTrue("Search input should be enabled", profileSearchPage.isSearchInputEnabled());
        assertTrue("Search button should be enabled", profileSearchPage.isSearchButtonEnabled());
    }
}