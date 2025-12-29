package steps;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import com.microsoft.playwright.Page;
import pages.GitHubProfileSearchPage;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class SearchNonExistentUserSteps {

    private Page page;
    private GitHubProfileSearchPage profileSearchPage;

    public SearchNonExistentUserSteps(Page page) {
        this.page = page;
        this.profileSearchPage = new GitHubProfileSearchPage(page);
    }

    @Given("the user opens the GitHub profile search component")
    public void theUserOpensTheGitHubProfileSearchComponent() {
        profileSearchPage.navigateToSearchPage();
    }

    @And("the search input and search button are displayed")
    public void theSearchInputAndSearchButtonAreDisplayed() {
        assertTrue(profileSearchPage.isSearchInputVisible(), 
            "Search input should be visible");
        assertTrue(profileSearchPage.isSearchButtonVisible(), 
            "Search button with magnifying glass icon should be visible");
    }

    @When("the user enters a non-existent username {string} in the search input")
    public void theUserEntersANonExistentUsernameInTheSearchInput(String username) {
        profileSearchPage.enterUsername(username);
    }

    @And("the user clicks the search button")
    public void theUserClicksTheSearchButton() {
        profileSearchPage.clickSearchButton();
    }

    @Then("the system should display an error message indicating the user was not found")
    public void theSystemShouldDisplayAnErrorMessageIndicatingTheUserWasNotFound() {
        assertTrue(profileSearchPage.isErrorMessageVisible(), 
            "Error message should be displayed for non-existent user");
    }

    @And("the error message should be user-friendly and clear")
    public void theErrorMessageShouldBeUserFriendlyAndClear() {
        String errorMessage = profileSearchPage.getErrorMessageText();
        assertTrue(
            errorMessage.toLowerCase().contains("not found") ||
            errorMessage.toLowerCase().contains("no existe") ||
            errorMessage.toLowerCase().contains("no results") ||
            errorMessage.toLowerCase().contains("no user"),
            "Error message should be clear and user-friendly. Actual message: " + errorMessage
        );
        assertTrue(profileSearchPage.isProfileInfoHidden(), 
            "Profile information and metrics should not be displayed");
    }
}