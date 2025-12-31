package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.*;

public class SearchNonExistentUserSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user is on the GitHub profile search application")
    public void theUserIsOnTheGitHubProfileSearchApplication() {
        profileSearchPage.navigateToApp();
        assertTrue(profileSearchPage.isSearchInterfaceDisplayed(), "Search interface should be displayed");
    }

    @When("the user enters an invalid username {string} in the search field")
    public void theUserEntersAnInvalidUsernameInTheSearchField(String username) {
        profileSearchPage.enterSearchQuery(username);
        assertTrue(profileSearchPage.getSearchFieldValue().contains(username), "Username should be entered correctly");
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should display a user-friendly error message")
    public void theSystemShouldDisplayAUserFriendlyErrorMessage() {
        profileSearchPage.waitForApiResponse();
        assertTrue(profileSearchPage.isErrorMessageDisplayed(), "Error message should be displayed");
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue(
            errorMessage.toLowerCase().contains("not found") ||
            errorMessage.toLowerCase().contains("no results") ||
            errorMessage.toLowerCase().contains("no se encontr") ||
            errorMessage.toLowerCase().contains("usuario no encontrado"),
            "Error message should be user-friendly"
        );
    }

    @And("the profile dashboard should remain empty or in initial state")
    public void theProfileDashboardShouldRemainEmptyOrInInitialState() {
        assertFalse(profileSearchPage.isProfileDataDisplayed(), "Profile data should not be displayed");
        assertFalse(profileSearchPage.areMetricsDisplayed(), "Metrics should not be displayed");
    }

    @And("the search field should allow a new search without page reload")
    public void theSearchFieldShouldAllowANewSearchWithoutPageReload() {
        assertTrue(profileSearchPage.isSearchFieldEnabled(), "Search field should be enabled");
        assertTrue(profileSearchPage.isSearchButtonEnabled(), "Search button should be enabled");
        profileSearchPage.clearSearchField();
        profileSearchPage.enterSearchQuery("octocat");
        assertEquals("octocat", profileSearchPage.getSearchFieldValue(), "New username should be entered successfully");
    }
}